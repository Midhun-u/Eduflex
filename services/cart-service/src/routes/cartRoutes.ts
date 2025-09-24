import { Hono } from "hono"
import { authMiddleware } from "../middlewares/auth"
import { addCartController, deleteCartItemController, getAllCartPriceController, getCartItemController, getCartItemsController } from "../controllers/cartController"

//cart router
export const cartRouter = new Hono()

cartRouter.use(authMiddleware) // using auth middleware for checking authentication

//route for adding course to cart
cartRouter.post("/add-cart" , addCartController)

//rotue for getting one cart item
cartRouter.get("/get-cartItem/:courseId" , getCartItemController)

//route for getting all cart items
cartRouter.get("/get-cartItems" , getCartItemsController)

//route for deleting cart item
cartRouter.delete("/delete-cartItem/:cartItemId" , deleteCartItemController)

//route for getting all cart price
cartRouter.get("/get-cartPrice" , getAllCartPriceController)