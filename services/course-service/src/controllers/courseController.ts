import { Context } from "hono";
import { CourseType } from "../types/CourseType";
import { Course, Rate } from "../models/index";
import cloudinary from "../config/cloudinary";
import { literal, Op } from "sequelize";
import { client } from "../config/redis";
import { convertNumber } from "../utils/convertNumber";

//controller for uploading course
export const uploadCourseController = async (context: Context) => {

    const {
        title,
        description,
        language,
        category,
        thumbnail,
        previewLink,
        chapterNumber,
        chapters,
        keypoints,
        price,
        educatorFullname ,
        educatorProfilePic
    } = await context.req.json() as CourseType || {}
    const userDetails = context.get("userDetails")

    try {


        if (
            !title ||
            !description ||
            !language ||
            !category ||
            !thumbnail ||
            !previewLink ||
            !educatorFullname ||
            !educatorProfilePic ||
            parseInt(chapterNumber) <= 0 || chapters.length <= 0 || keypoints.length <= 0 ||
            parseInt(price) <= 0
        ) {
            context.status(400)
            return context.json({ success: false, error: "All fields are required" })
        }

        if (!Array.isArray(chapters) || !Array.isArray(keypoints)) {
            context.status(400)
            return context.json({ success: false, error: "Chapters and keypoints must be array" })
        }

        if (!userDetails) {
            context.status(400)
            return context.json({ success: false, error: "User details are missing" })
        }

        const keys = await client.keys("courses:*")
        if (keys.length) {
            await client.del(keys)
        }

        //uploading image
        const image = await cloudinary.uploader.upload(thumbnail)

        const newCourse = await Course.create({
            title: title,
            description: description,
            language: language,
            category: category,
            thumbnail: {
                url: image.secure_url,
                publicId: image.public_id
            },
            previewLink: previewLink,
            keypoints: keypoints,
            chapters: chapters,
            chapterNumber: parseInt(chapterNumber),
            price: parseInt(price),
            educator: {
                id : userDetails.id,
                fullname : educatorFullname,
                profilePic : educatorProfilePic
            }
        }, { raw: true })

        if (newCourse) {
            context.status(201)
            return context.json({ success: true, message: "Course uploaded" })
        } else {
            context.status(400)
            return context.json({ success: false, error: "Failed to upload course" })
        }

    } catch (error) {
        throw new Error(`uploadCourseController error ${error}`)
    }

}

//controller for getting educator courses
export const getEducatorCoursesController = async (context: Context) => {

    const educatorId = await context.req.param("educatorId")
    const { page = 1, limit = 10 } = context.req.query()
    const pageNumber = convertNumber(page)
    const limitNumber = convertNumber(limit)

    try {

        if (!educatorId) {
            context.status(400)
            return context.json({ success: false, error: "Educator id is missing" })
        }

        const { rows: educatorCourses, count: totalCount } = await Course.findAndCountAll({
            where: {
                educator: {
                    id: educatorId
                }
            },
            attributes: {
                exclude : ['chapters' , 'chapterNumber' , 'category' , 'updatedAt' , 'keypoints' , 'language']
            },
            order : [
                ['createdAt' , 'DESC']
            ],
            offset: (pageNumber - 1) * limitNumber,
            limit: limitNumber,
            raw: true,
        })

        return context.json({ success: true, educatorCourses: educatorCourses, totalCount: totalCount })


    } catch (error) {
        throw new Error(`getCoursesController error : ${error}`)
    }
}

//controller for getting course details
export const getCourseDetailsController = async (context: Context) => {

    const courseId = context.req.param("courseId")
    const { fields } = context.req.query()

    try {

        if (!courseId) {
            context.status(400)
            return context.json({ success: false, error: "Course id is missing" })
        }

        const fieldsArray = fields?.split(",")
        let attributesConditon = {}

        if (fieldsArray?.length && Array.isArray(fieldsArray)) {
            attributesConditon = {
                attributes: fieldsArray,
            }
        }

        const courseDetails = await Course.findByPk(courseId, {
            ...attributesConditon,
            raw: true
        })

        if (!courseDetails) {
            context.status(404)
            return context.json({ success: false, error: "Course not found" })
        }

        return context.json({ success: true, courseDetails: courseDetails })

    } catch (error) {
        throw new Error(`getCourseDetailsController error : ${error}`)
    }

}

//controller for updating course
export const updateCourseController = async (context: Context) => {

    try {

        const courseId = context.req.param('courseId')
        const {
            title,
            description,
            thumbnail,
            price,
            previewLink
        } = await context.req.json() as {
            title: string,
            description: string,
            thumbnail: {
                url: string,
                publicId: string
            },
            price: string,
            previewLink : string
        }

        if (!courseId) {
            context.status(400)
            return context.json({ success: false, error: "Course id is missing" })
        }

        if (
            !title ||
            !description ||
            !thumbnail.url || !thumbnail.publicId ||
            !price ||
            !previewLink
        ) {
            context.status(400)
            return context.json({ success: true, error: 'All fields are required' })
        }

        let imageData: { url: string | null, publicId: string | null } = {
            url: null,
            publicId: null
        }

        const keys = await client.keys("courses:*")
        if (keys.length > 0) {
            await client.del(keys)
        }

        if (!thumbnail.url.includes('cloudinary')) {
            const result = await cloudinary.uploader.upload(thumbnail.url.trim(), {
                public_id: thumbnail.publicId.trim(),
                overwrite: true,
                invalidate: true,
                resource_type : "image"
            })

            imageData = {
                url: result.secure_url,
                publicId: result.public_id
            }

        }

        if (!imageData.url || !imageData.publicId) {

            await Course.update({
                title: title,
                description: description,
                price: price,
                previewLink : previewLink
            }, {
                where: {
                    id: courseId
                }
            })

            return context.json({ success: true, message: "Course updated" })

        } else {

            await Course.update({
                title: title,
                description: description,
                price: price,
                thumbnail: {
                    url: imageData.url,
                    publicId: thumbnail.publicId
                },
                previewLink : previewLink
            }, {
                where: {
                    id: courseId
                }
            })

            return context.json({ success: true, message: "Course updated" })
        }


    } catch (error) {
        throw new Error(`updateCourseController error : ${error}`)
    }

}

//controller for getting all courses
export const getAllCoursesController = async (context: Context) => {

    const { page = 1, limit = 10 } = context.req.query()
    const pageNumber = convertNumber(page)
    const limitNumber = convertNumber(limit)

    const cashedkey = `courses:page:${page}:limit:${limit}`
    const totalCountKey = `courses:totalCount`

    try {

        const [cashedData, count] = await Promise.all([
            client.get(cashedkey),
            client.get(totalCountKey)
        ])

        if (cashedData && count) {
            return context.json({ success: true, courses: JSON.parse(cashedData), totalCount: convertNumber(count) })
        }

        const { rows: courses, count: totalCount } = await Course.findAndCountAll({
            offset: (pageNumber - 1) * limitNumber,
            limit: limitNumber,
            attributes: [
                'id',
                'title',
                'thumbnail',
                'category',
                'educator',
                'price',
                'createdAt',
                [
                    literal(`(
                        SELECT CAST(AVG(r."rate") AS FLOAT)
                        FROM "ratings" AS r
                        WHERE r."courseId" = "Course"."id"
                    )`),
                    "averageRatings"
                ],
                [
                    literal(`(
                        SELECT CAST(COUNT(r."id") AS INTEGER)
                        FROM "ratings" AS r
                        WHERE r."courseId" = "Course"."id"
                    )`),
                    "totalRatings"
                ]
            ],
            include: [{
                model: Rate,
                as: "ratings",
                required: false,
                attributes: []
            }],
            order: [['createdAt', 'DESC']],
            raw: true
        })

        if (!cashedData && !count) {

            await Promise.all([
                client.set(cashedkey, JSON.stringify(courses)),
                client.set(totalCountKey, totalCount),
                client.expire(cashedkey, 60),
                client.expire(totalCountKey, 120)
            ])

        }

        return context.json({ success: true, courses: courses, totalCount: totalCount })

    } catch (error) {
        throw new Error(`getAllCoursesController error : ${error}`)
    }

}

//controller for searching courses
export const searchCourseController = async (context: Context) => {

    const searchQuery = context.req.param('searchQuery')
    const { page = 1, limit = 10 } = context.req.query()
    const pageNumber = convertNumber(page)
    const limitNumber = convertNumber(limit)

    try {

        if (searchQuery?.trim()) {

            const { rows: courses, count: totalCount } = await Course.findAndCountAll({
                where: {
                    title: {
                        [Op.iLike]: `%${searchQuery}%`
                    }
                },
                offset: (pageNumber - 1) * limitNumber,
                limit: limitNumber,
                raw: true,
                attributes: ['id', 'title', 'description', 'price', 'thumbnail', 'category', 'educator'],
                order: [['createdAt', 'DESC']]
            })

            return context.json({ success: true, courses: courses, totalCount: totalCount })

        }

    } catch (error) {
        throw new Error(`searchCourseController error : ${error}`)
    }
}

//controller for getting recommanded courses
export const getRecommandedCoursesController = async (context: Context) => {

    const courseId = context.req.param("courseId")
    const { category } = context.req.query()

    if (!courseId) {
        context.status(400)
        return context.json({ success: false, error: "Course id is missing" })
    }

    try {

        const recommandedCourses = await Course.findAll({
            where: {
                id: {
                    [Op.ne]: courseId
                },
                category: {
                    [Op.eq]: category
                },
            },
            attributes: ['id', 'title', 'educator', 'price', 'thumbnail', 'category'],
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 10
        })

        return context.json({ success: true, recommandedCourses: recommandedCourses })

    } catch (error) {
        throw new Error(`getRecommandedCoursesController error : ${error}`)
    }

}

//controller for getting courses based on category
export const getCategoryCoursesController = async (context: Context) => {

    try {

        const category = context.req.param("category")
        const { page = 1, limit = 10 } = context.req.query()
        const pageNumber = convertNumber(page)
        const limitNumber = convertNumber(limit)

        if (!category) {
            context.status(400)
            return context.json({ success: false, error: "Course category is missing" })
        }

        const { rows: courses, count: totalCount } = await Course.findAndCountAll({
            where: {
                category: category
            },
            attributes: ['id', 'title', 'thumbnail', 'price', 'educator'],
            offset: (pageNumber - 1) * limitNumber,
            limit: limitNumber
        })

        return context.json({ success: true, courses: courses, totalCount: totalCount })

    } catch (error) {
        throw new Error(`getCategoryCourseController error : ${error}`)
    }

}

//controller for getting total courses count
export const getTotalCourseCountController = async (context : Context) => {
  
  try{
    
    const educatorId = context.req.param("educatorId")
    
    if(!educatorId){
      context.status(400)
      return context.json({success : false , error : "Educator id is missing"})
    }
    
    const totalCoursesCount = await Course.count({
      where : {
        educator : {
          id : educatorId
        }
      }
    })
    
    return context.json({success : true , totalCoursesCount : totalCoursesCount || 0})
    
  }catch(error){
    throw new Error(`getTotalCourseController error ${error}`)
  }
  
}