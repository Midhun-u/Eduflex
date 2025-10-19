export interface CartItemType{
    _id : string,
    cartItem : {
        id : string,
        title : string,
        price : number,
        thumbnail : {
            url : string
        },
        educator : {
            fullname : string
        },
    },
    averageRatings : number,
    totalRatings : number,
    totalEnrollments : number,
    cartItemPrice : string | number,
    courseId : string,
    userId : string,
    createdAt : string,
    
}