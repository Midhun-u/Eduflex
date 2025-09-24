import {Schema , model} from 'mongoose'

const wishlistSchema = new Schema({
    courseId : {
        type : String,
        required : true,
        index : true
    },
    userId : {
        type : String,
        required : true,
        index : true
    },
    category : {
        type : String,
        required : true
    }
} , {timestamps : true})

export const Wishlist = model('wishlist' , wishlistSchema)