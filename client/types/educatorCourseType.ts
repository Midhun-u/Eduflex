export interface EducatorCourseType{
    id : string,
    thumbnail : {
        publicId : string,
        url : string
    },
    title : string,
    description : string,
    price : number,
    createdAt : string,
    averageRatings : number,
    totalRatings : number,
    totalEnrollments : number,
    previewLink : string
}