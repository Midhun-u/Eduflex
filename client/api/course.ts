import { UploadCourseType } from "@/types/courseType"
import { courseInstance } from "./axiosInstance"

//api for uploading course
export const uploadCourseApi = async ({title , description , language , category , thumbnail , previewLink , chapterNumber , keypoints , chapters , price , educatorFullname , educatorProfilePic} : UploadCourseType) => {

    const result = (await courseInstance.post('/upload-course' , {title , description , language , category , thumbnail , previewLink , chapterNumber , keypoints , chapters , price , educatorProfilePic , educatorFullname})).data
    return result

}

//api for getting educator courses
export const getEducatorCoursesApi = async (educatorId : string , page : number = 1 , limit : number = 10) => {

    if(!educatorId){
        return
    }
    
    const result = (await courseInstance.get(`/get-educator-courses/${educatorId}/?page=${page}&limit=${limit}`))
    return result.data

}

//api for getting course details
export const getCourseDetailsApi = async (id : string, fields ? : Array<string>) => {

    if(id){

        const result = (await courseInstance.get(`/get-course/${id}/${fields?.length ? `?fields=${fields.join(",")}` : ''}`)).data
        return result

    }

}

//api for updaing course detail
export const updateCourseDetailsApi = async (id : string , title : string , description : string , thumbnail : {url : string , publicId : string} , price : number , previewLink : string) => {

    if(id){

        const result = await courseInstance.put(`/update-course/${id}` , {title : title , description : description , thumbnail : thumbnail , price : price , previewLink : previewLink})
        return result.data

    }

}

//api for getting courses
export const getCoursesApi = async (page : number = 1 , limit : number = 10 , searchQuery ? : string) => {

    const result = 
    searchQuery 
    ? 
    await courseInstance.get(`/get-courses/${searchQuery}/?page=${page}&limit=${limit}`)
    :
    await courseInstance.get(`/get-courses/?page=${page}&limit=${limit}`)

    return result.data

}

//api for getting recommanded courses
export const getRecommandedCoursesApi = async (courseId : string , category : string) => {

    const result = (await courseInstance.get(`/get-recommandedCourses/${courseId}?category=${category}`)).data
    return result

}

//api for getting course based on category
export const getCategoryCoursesApi = async (category : string , page : number = 1 , limit : number = 10) => {

    const result = (await courseInstance.get(`/get-categoryCourses/${category}?page=${page}&limit=${limit}`)).data
    return result

}

//api for getting total courses count
export const getTotalCoursesCountApi = async (educatorId : string) => {
    
    if(!educatorId) return

    const result = (await courseInstance.get(`/get-totalCourseCount/${educatorId}`)).data
    return result

}