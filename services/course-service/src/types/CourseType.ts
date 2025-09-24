export interface CourseType {
    title : string,
    description : string,
    language : string,
    category : string,
    thumbnail : string,
    previewLink : string,
    chapterNumber : string,
    keypoints : string[],
    chapters : Array<{title : string , lectures : Array<{title : string , url : string , duration : string}>}>,
    price : string,
    educatorProfilePic : string,
    educatorFullname : string
}