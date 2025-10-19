export interface WishlistItemType{
    _id : string,
    courseId : string,
    courseDetails : {
        title : string,
        thumbnail : {
            url : string,
            publicId : string
        },
        educator : {
            id : string,
            fullname : string
        },
        price : number,
        totalRatings : number,
        averageRatings : number,
    },
    category : string
    userId : string,
    createdAt : string
}