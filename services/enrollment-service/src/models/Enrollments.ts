import {Schema , model} from 'mongoose'

const enrollmentSchema = new Schema({

    courseId : {
        type : String,
        required : true,
        index : true
    },
    courseEducatorId : {
      type : String,
      required : true,
      index : true,
    },
    userId : {
        type : String,
        required : true,
        index : true
    },
    completedLectures : {
        type : Array,
        default : []
    },
    completed : {
        type : Boolean,
        default : false
    },
    price : {
        type : Number,
        required : true
    }


} , {timestamps : true})

export const Enrollment = model("enrollments" , enrollmentSchema)