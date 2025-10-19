import { Hono } from "hono"
import { addEnrollmentController, completeLectureController , getEnrolledCourseItemController, getEnrolledStudentsController, getEnrollmentDetailsController, getLatestEnrollments, getTopEnrollmentsController, getTotalEarningsController, getTotalEnrollmentController, getTotalLearnersController } from "../controllers/enrollmentController"
import { authMiddleware } from "../middlewares/auth"

//enrollment router
export const enrollmentRouter = new Hono()

enrollmentRouter.use(authMiddleware) //applying auth middleware

//route for enrolling course
enrollmentRouter.post("/enroll-course" , addEnrollmentController)

//route for geting an enrolled course
enrollmentRouter.get("/get-enrolledCourse/:courseId" , getEnrolledCourseItemController)

//route for getting enrollment courses and details
enrollmentRouter.get("/get-enrollmentDetails" , getEnrollmentDetailsController)

//route for completing lecture
enrollmentRouter.put("/complete-lecture" , completeLectureController)

//route for getting top enrollments
enrollmentRouter.get("/get-topEnrollments" , getTopEnrollmentsController)

//route for getting total enrollment of a course
enrollmentRouter.get("/get-totalEnrollments/:courseId" , getTotalEnrollmentController)

//route for getting total learners
enrollmentRouter.get("/get-totalLearners/:educatorId" , getTotalLearnersController)

//route for getting total earnings
enrollmentRouter.get("/get-totalEarnings" , getTotalEarningsController)

//route for getting enrolled students
enrollmentRouter.get("/get-enrolledStudents" , getEnrolledStudentsController)

//route for getting latest enrollments
enrollmentRouter.get("/get-latestEnrollments" , getLatestEnrollments)