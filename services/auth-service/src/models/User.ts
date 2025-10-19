import {Schema , model} from 'mongoose'

//user schema
const userSchema = new Schema({

    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        index : true
    },
    password : {
        type : String,
    },
    bio : {
        type : String,
        default : ""
    },
    profilePic  : {
        url : {
            type : String,
            default : ''
        },
        publicId : {
            type : String,
            default : ""
        }
    },
    authType : {
        type : String,
        enum : ['Email' , 'Google'],
        required : true
    }

} , {timestamps : true})

//user model
export const User = model('User' , userSchema)