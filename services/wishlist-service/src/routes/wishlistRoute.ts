import { Hono } from "hono"
import { addWishlistController, deleteWishlistItemController, getWishlistController, getWishlistItemController } from "../controllers/wishlistController"
import { authMiddleware } from "../middlewares/auth"

//wishlist router
export const wishlistRouter = new Hono({strict : false})

wishlistRouter.use(authMiddleware) // applying middleware

//route for adding course to wishlist
wishlistRouter.post("/add-wishlist" , addWishlistController)

//route for getting one wishlist item
wishlistRouter.get("/get-wishlistItem/:courseId" , getWishlistItemController)

//route for getting wishlist
wishlistRouter.get("/get-wishlist" , getWishlistController)

//route for remove wishlist item
wishlistRouter.delete("/delete-wishlistItem/:wishlistItemId" , deleteWishlistItemController)