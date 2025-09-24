export interface RatingsType{
    id : string,
    courseId : string,
    userId : string,
    comment : string,
    rate : number,
    userDetails : {
        fullname : string,
        profilePic : {
            url : string,
            publicId : string
        }
    }
}