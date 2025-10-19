export interface EnrolledCourseType{
    _id : string,
    courseId : string,
    userId : string,
    completedLectures : Array<any>,
    completed : boolean,
    courseDetails : {
        title : string,
        thumbnail : {
            url : string,
            publicId : string
        },
        educator : {
            _id : string,
            fullname : string
        },
        chapters : ChapterType[]
    },
}