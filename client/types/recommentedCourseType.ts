export interface RecommandedCourseType {
    id: string,
    title: string,
    thumbnail: {
        url: string,
        publicId: string
    },
    educator: {
        id: string,
        fullname: string,
    }
    category: string,
    price: number,
    totalRatings : number,
    averageRatings : number
}