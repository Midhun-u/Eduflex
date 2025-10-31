export interface TopCouresType{
    _id : string,
    totalEnrollments : number,
    courseDetails : {
        title : string,
        thumbnail : {
            url : string,
            publicId : string
        },
        price : number,
        educator : {
            id : string,
            fullname : string
        },
        totalRatings : number,
        averageRatings : number
    }
}