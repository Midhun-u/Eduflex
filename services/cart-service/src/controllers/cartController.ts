import { Context } from "hono";
import { Cart } from "../models/Cart";

//controller for add course to cart
export const addCartController = async (context : Context) => {

    try {
        
        const {courseId , cartItemPrice} : {courseId : string , cartItemPrice : string | number} = await context.req.json() || {}
        const userDetails = context.get("userDetails")

        if(!courseId){
            context.status(400)
            return context.json({success : false , error : "Course id is missing"})
        }

        if(!userDetails){
            context.json(400)
            return context.json({success : false , error : "User details are missing"})
        }

        //checking if course already added to cart
        const checkCartItem = await Cart.findOne({courseId : courseId , userId : userDetails.id})

        if(checkCartItem){
            context.status(400)
            return context.json({success : false , error : "Course already added to cart"})
        }
        
        //checking user cart count 
        const cartCount = await Cart.countDocuments({userId : userDetails.id})
        if(cartCount === 100){
          context.status(400)
          return context.json({success : false , error : "Cart limit reached"})
        }
        
        const cartItemPriceNumber = typeof cartItemPrice === "string" ? parseInt(cartItemPrice) : cartItemPrice
        const cartItem = await Cart.findOne({courseId : courseId , userId : userDetails?.id})

        if(cartItem){
            context.status(400)
            return context.json({success : false , error : "Course already added to cart"})
        }

        const newCart = await Cart.create({
            courseId : courseId,
            userId : userDetails.id,
            cartItemPrice : cartItemPriceNumber
        })

        if(newCart){
            return context.json({success : true , message : "Course added to cart" , cartItem : newCart})
        }

    } catch (error) {
        throw new Error(`addCartController error : ${error}`)
    }

}

//controller for getting one cart item
export const getCartItemController = async (context : Context) => {

    try {

        const courseId = context.req.param("courseId")
        const userDetails = context.get("userDetails")

        if(!courseId){
            context.status(400)
            return context.json({success : false , error : "Course id is missing"})
        }

        const cartItem = await Cart.findOne({courseId : courseId , userId : userDetails.id})

        if(cartItem){
            return context.json({success : true , cartItem : cartItem})
        }

        return context.json({success : true , message : "Course is not found in cart"})
        
    } catch (error) {
       throw new Error(`getCartItemController error : ${error}`) 
    }

}

//controller for getting cart items
export const getCartItemsController = async (context : Context) => {

    try {

        const userDetails = context.get("userDetails")
        const {page = 1 , limit = 10} = context.req.query()
        const pageNumber = typeof page === "string" ? parseInt(page) : page
        const limitNumber = typeof limit === "string" ? parseInt(limit) : limit

        if(!userDetails){
            context.status(400)
            return context.json({success : false , error : "User details are missing"})
        }
        
        let documentsCount = pageNumber === 1 ? {totalCount : 0} : {}

        const cartItems = await Cart.find({userId : userDetails.id}).skip((pageNumber - 1) * limitNumber).limit(limitNumber).sort({createdAt : -1})

        if(pageNumber === 1){
            documentsCount.totalCount = await Cart.countDocuments({userId : userDetails.id})
        }

        return context.json({success : true , cartItems : cartItems , ...documentsCount})

    } catch (error) {
        throw new Error(`getCartItemsController error : ${error}`)
    }

}

//controller for deleting cart item
export const deleteCartItemController = async (context : Context) => {

    const cartItemId = context.req.param("cartItemId")
    const userDetails = context.get("userDetails")

    try {

        if(!cartItemId){
            context.status(400)
            return context.json({success : false , error : "Cart id is missing"})
        }

        await Cart.deleteOne({_id : cartItemId , userId : userDetails.id})

        return context.json({success : true , message : "Cart item deleted"})
        
    } catch (error) {
        throw new Error(`deleteCartItemController error : ${error}`)
    }

}

//controller for geting all cart price
export const getAllCartPriceController = async (context : Context) => {

    try {

        const userDetails = context.get("userDetails")

        if(!userDetails){
            context.status(400)
            return context.json({success : false , error : "User details are missing"})
        }

        const totalCartPrice = await Cart.aggregate([
            {
                $match : {"userId" : userDetails.id},
            },
            {
                $group : {_id : null , totalCartPrice : {$sum : "$cartItemPrice"}}
            }
        ])
       
        if(totalCartPrice.length){
            return context.json({success : true , totalCartPrice : totalCartPrice[0].totalCartPrice})
        }

        return context.json({success : true , totalCartPrice : 0})
        
    } catch (error) {
        throw new Error(`getAllCartPriceController error : ${error}`)
    }

}