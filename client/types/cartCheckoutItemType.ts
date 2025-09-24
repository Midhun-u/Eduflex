export interface CartCheckoutItemType{
    _id : string,
    userId : string,
    courseId : string,
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
        }
    },
    cartItemPrice : number
}