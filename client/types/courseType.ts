import { ChapterType } from "./chapterType"

export interface CourseType{
    id : string,
    title : string,
    description : string,
    thumbnail : {
        url : string,
        publicId : string
    },
    previewLink : string,
    educator : {
        id : string,
        fullname : string,
    }
    language : string,
    category : string,
    keypoints : string[],
    chapters : ChapterType[],
    price : number,
    chapterNumber : string | number,
    enrollments : number,
    createdAt : string
}

export interface UploadCourseType{
    title : string,
    description : string,
    language : string,
    category : string,
    thumbnail : string,
    previewLink : string,
    chapterNumber : string,
    keypoints : string[],
    chapters : Array<{title : string , lectures : Array<{title : string , url : string , duration : number}>}>,
    price : string,
    educatorProfilePic : {
        url : string,
        publicId : string
    },
    educatorFullname : string
}

export interface CourseListType{
    id : string,
    title : string,
    description : string,
    educator : {
        _id : string,
        fullname : string
    },
    thumbnail : {
        url : string,
        publicId : string
    },
    totalRatings : number,
    averageRatings :  number,
    price : string,
}