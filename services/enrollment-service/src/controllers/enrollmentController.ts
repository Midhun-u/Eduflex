import { Context } from "hono";
import { Enrollment } from "../models/Enrollments";
import { convertNumber } from "../utils/convertNumber";

//controller for enrolling course
export const addEnrollmentController = async (context: Context) => {
  try {
    const userDetails = await context.get("userDetails");
    const {
      courseId,
      price,
      courseEducatorId,
    }: { courseId: string; price: number; courseEducatorId: string } =
      (await context.req.json()) || {};

    if (!userDetails) {
      context.status(400);
      return context.json({ success: false, error: "User details are missing" });
    }

    if (!courseId || !price || !courseEducatorId) {
      context.status(400);
      return context.json({ success: false, error: "All fields are required" });
    }

    //checking if user already enrolled course
    const checkEnrollment = await Enrollment.findOne({
      courseId: courseId,
      userId: userDetails.id,
    });

    if (checkEnrollment) {
      context.status(400);
      return context.json({
        success: false,
        error: "User already enrolled course",
      });
    }

    const newEnrollment = await Enrollment.create({
      userId: userDetails.id,
      courseId: courseId,
      price: price,
      courseEducatorId: courseEducatorId,
    });

    if (newEnrollment) {
      context.status(201);
      return context.json({
        success: true,
        enrollment: newEnrollment,
        message: "Course enrolled",
      });
    }
  } catch (error) {
    throw new Error(`addEntrollmentController error : ${error}`);
  }
};

//controller for getting an enrolled course
export const getEnrolledCourseItemController = async (context: Context) => {
  try {
    const courseId = context.req.param("courseId");
    const userDetails = context.get("userDetails");

    if (!courseId) {
      context.status(400);
      return context.json({
        success: false,
        error: "Course id must be provided",
      });
    }

    const enrolledCourse = await Enrollment.findOne({
      courseId: courseId,
      userId: userDetails.id,
    });

    if (enrolledCourse) {
      return context.json({ success: true, enrolledCourse: enrolledCourse });
    }

    return context.json({ success: true, message: "Course is not enrolled" });
  } catch (error) {
    throw new Error(`getEnrolledCourseItemController error : ${error}`);
  }
};

//controller for getting enrollment courses and details
export const getEnrollmentDetailsController = async (context: Context) => {
  try {
    const userDetails = context.get("userDetails");
    const { page = 1, limit = 10 } = context.req.query();
    const pageNumber = convertNumber(page);
    const limitNumber = convertNumber(limit);

    if (!userDetails) {
      context.status(400);
      return context.json({ success: false, error: "User details are missing" });
    }

    let enrollmentDetails =
      pageNumber === 1
        ? { enrolledCoursesNumber: 0, completedCoursesNumber: 0, totalPrice: 0 }
        : {};

    if (pageNumber === 1) {
      enrollmentDetails.enrolledCoursesNumber = await Enrollment.countDocuments(
        { userId: userDetails.id },
      );
      enrollmentDetails.completedCoursesNumber =
        await Enrollment.countDocuments({
          userId: userDetails.id,
          completed: true,
        });
      const totalPrice = await Enrollment.aggregate([
        {
          $group: {
            _id: null,
            totalPrice: { $sum: "$price" },
          },
        },
      ]);
      enrollmentDetails.totalPrice = totalPrice[0].totalPrice;
    }

    const enrolledCourses = await Enrollment.find({ userId: userDetails.id })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    return context.json({
      success: true,
      enrolledCourses: enrolledCourses,
      ...enrollmentDetails,
    });
  } catch (error) {
    throw new Error(`getEnrollmentDetailsController error : ${error}`);
  }
};

//controller for completing lecture
export const completeLectureController = async (context: Context) => {
  try {
    const { lectureId, enrollmentId, completed } = await context.req.json();
    const userDetails = context.get("userDetails");

    if (!lectureId || !enrollmentId) {
      context.status(400);
      return context.json({ success: false, error: "All fields are required" });
    }

    //checking if lecture already completed
    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      userId: userDetails.id,
    });
    const isAdded = enrollment?.completedLectures.includes(lectureId);

    if (isAdded) {
      context.status(400);
      return context.json({
        success: false,
        error: "Lecture already completed",
      });
    }

    await Enrollment.updateOne(
      { _id: enrollmentId, userId: userDetails.id },
      {
        $push: { completedLectures: lectureId },
        completed: Boolean(completed)
      },
    );

    return context.json({ success: true, message: "Lecture completed" });
  } catch (error) {
    throw new Error(`completeLectureController error : ${error}`);
  }
};

//controller for getting top enrollments
export const getTopEnrollmentsController = async (context: Context) => {
  try {
    const topEnrollments = await Enrollment.aggregate([
      {
        $project: {
          courseId: 1,
        },
      },
      {
        $group: {
          _id: "$courseId",
          totalEnrollments: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          totalEnrollments: -1,
        },
      },
      {
        $limit: 20,
      },
    ]);

    return context.json({
      success: true,
      topEnrollments: topEnrollments,
      totalCount: 50,
    });
  } catch (error) {
    throw new Error(`getTopEnrollmentsController error : ${error}`);
  }
};

//controller for getting total enrollments of a course
export const getTotalEnrollmentController = async (context: Context) => {
  try {
    const courseId = context.req.param("courseId");

    if (!courseId) {
      context.status(400);
      return context.json({
        success: false,
        error: "Course id must be provided",
      });
    }

    const totalEnrollments = await Enrollment.countDocuments({
      courseId: courseId,
    });

    return context.json({ success: true, totalEnrollments: totalEnrollments });
  } catch (error) {
    throw new Error(`getTotalEnrollmentController error : ${error}`);
  }
};

//controller for getting total learners
export const getTotalLearnersController = async (context: Context) => {

  try {

    const educatorId = context.req.param("educatorId")

    if (!educatorId) {
      context.status(400)
      return context.json({ succes: false, error: "Educator id is missing" })
    }

    const totalLearners = await Enrollment.countDocuments({
      courseEducatorId: educatorId
    })

    return context.json({ success: true, totalLearners: totalLearners || 0 })

  } catch (error) {
    throw new Error(`getTotalLearnersController error : ${error}`)
  }

}

//controller for getting total earnings 
export const getTotalEarningsController = async (context: Context) => {

  try {

    const userDetails = context.get("userDetails")

    if (!userDetails) {
      context.status(400)
      return context.json({ success: false, error: "User details are missing" })
    }

    const totalEarnings = await Enrollment.aggregate([
      {
        $match: {
          courseEducatorId: userDetails.id
        }
      },
      {
        $group: {
          _id: null,
          totalEarnings: {
            $sum: "$price"
          }
        }
      }
    ])

    return context.json({ success: true, totalEarnings: totalEarnings[0]?.totalEarnings || 0})

  } catch (error) {
    throw new Error(`getTotalEarningsController error : ${error}`)
  }

}

//controller for getting enrolled students
export const getEnrolledStudentsController = async (context: Context) => {

  try {

    const userDetails = context.get("userDetails")
    const { page = 1, limit = 10 } = context.req.query()
    const pageNumber = convertNumber(page)
    const limitNumber = convertNumber(limit)

    if (!userDetails) {
      context.status(400)
      return context.json({ success: false, error: 'User details are missing' })
    }

    let countDetails = pageNumber === 1 ? {totalCount : 0} : {}

    if(pageNumber === 1){
      countDetails.totalCount = await Enrollment.countDocuments({
        courseEducatorId : userDetails.id
      })
    }

    const enrolledStudents = await Enrollment.find({
      courseEducatorId: userDetails.id
    }, { completed: 0, completedLectures: 0, price: 0, updatedAt: 0 })
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber)

    return context.json({ success: true, enrolledStudents: enrolledStudents , ...countDetails})

  } catch (error) {
    throw new Error(`getEnrolledStudentsController error : ${error}`)
  }

}

//controller getting latest enrollments
export const getLatestEnrollments = async (context: Context) => {

  try {

    const userDetails = context.get("userDetails")
    const limit = 10

    if (!userDetails) {
      context.status(400)
      return context.json({success : false , error : "User details are missing"})
    }

    const latestEnrollments = await Enrollment.find({
      courseEducatorId : userDetails.id
    } , {completed : 0 , completedLectures : 0 , price : 0}).limit(limit).sort({createdAt : - 1})

    return context.json({success : true , latestEnrollments : latestEnrollments})

  } catch (error) {
    throw new Error(`getLatestController error : ${error}`)
  }

}