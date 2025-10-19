import { Hono } from "hono"
import { addRateController, getRateCommentsController, getTotalRatingsController, getUserRateController, removeRateController } from "../controllers/rateController"
import { authMiddleware } from "../middlewares/auth"

//router instance
export const rateRouter = new Hono()

rateRouter.use(authMiddleware) //applying auth middleware

//route for adding rate
rateRouter.post("/add-rate" , addRateController)

//route for getting user rate
rateRouter.get("/get-userRate/:courseId" , getUserRateController)

//route for getting total ratings
rateRouter.get("/get-totalRatings/:courseId" , getTotalRatingsController)

//route for getting rate comment
rateRouter.get("/get-rateComments/:courseId" , getRateCommentsController)

//route for removing rate
rateRouter.delete("/remove-rate/:rateId" , removeRateController)