import { Course } from "./Course";
import { Rate } from "./Rate";

Course.hasMany(Rate , {
    foreignKey : "courseId",
    as : "ratings"
})
Rate.belongsTo(Course , {
    foreignKey : "courseId",
    as : "courses"
})

export {Course , Rate}