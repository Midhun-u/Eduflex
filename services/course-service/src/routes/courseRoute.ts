import { Hono } from "hono"
import { getAllCoursesController, getCategoryCoursesController, getCourseDetailsController, getEducatorCoursesController, getRecommandedCoursesController , getTotalCourseCountController, searchCourseController, updateCourseController, uploadCourseController } from "../controllers/courseController"
import { authMiddleware } from "../middlewares/auth"

//router instance
export const courseRouter = new Hono()

//using middleware for check authentication
courseRouter.use(authMiddleware)

//route for uploading courses
courseRouter.post("/upload-course" , uploadCourseController)

//route for getting educator course
courseRouter.get("/get-educator-courses/:educatorId" , getEducatorCoursesController)

//route for getting course details
courseRouter.get("/get-course/:courseId" , getCourseDetailsController)

//route for updating course
courseRouter.put("/update-course/:courseId" ,  updateCourseController)

//route for getting all courses
courseRouter.get("/get-courses" , getAllCoursesController)

//route for searching courses
courseRouter.get("/get-courses/:searchQuery" , searchCourseController)

//route for getting recommanded courses
courseRouter.get("/get-recommandedCourses/:courseId" , getRecommandedCoursesController)

//route for getting courses based on category
courseRouter.get("/get-categoryCourses/:category" , getCategoryCoursesController)

//route for getting total course courseController
courseRouter.get("/get-totalCourseCount/:educatorId" , getTotalCourseCountController)