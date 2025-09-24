import { Context } from "hono";
import { Wishlist } from "../models/Wishlist";

//controller for adding course to wishlist
export const addWishlistController = async (context: Context) => {

    try {

        const { courseId , category}: { courseId: string , category : string} = await context.req.json()
        const userDetails = await context.get("userDetails")

        if (!courseId) {
            context.status(400)
            return context.json({success : false , error : "Course id is missing"})
        }

        
        if(!userDetails){
            context.status(400)
            return context.json({success : false , error : "User details are missing"})
        }
        
        if(!category){
            context.status(400)
            return context.json({success : false , error : "Course category must be provided"})
        }

        //checking wishlist course already added
        const checkWishList = await Wishlist.findOne({courseId : courseId , userId : userDetails.id})

        if(checkWishList){
            context.status(400)
            return context.json({success : false , error : "Course already added to wishlist"})
        }
        
        //checking wishlist count
        const wishlistCount = await Wishlist.countDocuments({userId : userDetails.id})
        if(wishlistCount === 100){
          context.status(400)
          return context.json({success : false , error : "Wishlist limit reached"})
        }

        const newWishlist = await Wishlist.create({
            courseId : courseId,
            userId : userDetails.id,
            category : category
        })

        if(newWishlist){
            context.status(201)
            return context.json({success : true , message : "Course added to wishlist" , wishlistItem : newWishlist})
        }

    } catch (error) {
        throw new Error(`addWishlistController error : ${error}`)
    }

}

//controller for getting one wishlist item
export const getWishlistItemController = async (context : Context) => {

    const courseId = context.req.param("courseId")
    const userDetails = context.get("userDetails")

    try {
        
        if(!courseId){
            context.status(400)
            context.json({success : false , error : "Course id is missing"})
        }

        if(!userDetails){
            context.status(400)
            context.json({success : false , error : "User details are missing"})
        }

        const wishlistItem = await Wishlist.findOne({courseId : courseId , userId : userDetails?.id})

        if(wishlistItem){
            return context.json({success : true , wishlistItem : wishlistItem})
        }

        return context.json({success : true , message : "Course is not found in wishlist"})

    } catch (error) {
        throw new Error(`getWishlistItemController error : ${error}`)
    }

}

//controller for getting wishlist
export const getWishlistController = async (context : Context) => {

    try {
        
        const userDetails = context.get("userDetails")
        const {page = 1 , limit = 10 , category} = context.req.query()
        const pageNumber = typeof page === 'string' ? parseInt(page) : page
        const limitNumber = typeof limit === 'string' ? parseInt(limit) : limit

        if(!userDetails){
            context.status(400)
            return context.json({success : false , error : "User details are missing"})
        }

        let documentsCount = pageNumber === 1 ? {totalCount : 0} : {}
        let categoryCondition = category ? {category : category} : {}

        const wishlist = await Wishlist.find({userId : userDetails.id , ...categoryCondition}).skip((pageNumber - 1) * limitNumber).limit(limitNumber)

        if(pageNumber === 1){
            documentsCount.totalCount = await Wishlist.countDocuments({userId : userDetails.id , ...categoryCondition})
        }

        return context.json({success : true , wishlist : wishlist , ...documentsCount})

    } catch (error) {
        throw new Error(`getWishlistController error : ${error}`)
    }

}

//controller for deleting wishlist item
export const deleteWishlistItemController = async (context : Context) => {

    try {
      
        const wishlistItemId = context.req.param("wishlistItemId")
        const userDetails = context.get("userDetails")

        if(!wishlistItemId){
            context.status(400)
            return context.json({success : false , error : "Wishlist item id is missing"})
        }

        if(!userDetails){
            context.status(400)
            return context.json({success : false , error : "User details are missing"})
        }

        await Wishlist.deleteOne({
            _id : wishlistItemId,
            userId : userDetails.id
        })

        return context.json({success : true , message : "Course removed from wishlist"})
        
    } catch (error) {
        throw new Error(`deleteWishlistItemController error : ${error}`)
    }

}