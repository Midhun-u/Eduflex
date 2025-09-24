import {Schema , model} from "mongoose"

const cartSchema = new Schema({
    courseId : {
        type : String,
        required : true,
        index : true,
    },
    userId : {
        type : String,
        required : true,
        index : true,
    },
    cartItemPrice : {
        type : Number,
        default : 0
    }
} , {timestamps : true})

export const Cart = model("Cart" , cartSchema)