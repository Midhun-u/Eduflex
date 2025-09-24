export interface EnrolledStudentsType {
    _id : string,
    userId : string,
    courseId : string,
    courseEducatorId : string,
    createdAt : string,
    user : {
        fullname : string,
        profilePic : {
            url : string,
            publicId : string
        },
    },
    courseDetails : {
        title : string,
    }
}