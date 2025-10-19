export interface EducatorDetailsType{
    _id : string,
    fullname : string,
    profilePic : {
        url : string,
       publicId : string
    },
    bio : string,
    totalCoursesNumber : number,
    totalLearnersNumber : number,
}