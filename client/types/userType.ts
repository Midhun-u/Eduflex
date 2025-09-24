export interface UserType{
    _id : string,
    bio : string,
    email : string,
    fullname : string,
    profilePic : {
        url : string,
        publicId : string
    },
    createdAt : string,
    authType : "Email" | "Google"
}