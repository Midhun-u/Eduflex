import { wishlistInstance } from "./axiosInstance"

//api for adding course to wishlist
export const addWishlistApi = async (courseId : string , category : string) => {
    
    if(!courseId){
        return
    }
    const result = (await wishlistInstance.post("/add-wishlist" , {courseId : courseId , category : category})).data
    return result

}

//api for getting one wishlist
export const getWishlistItem = async (courseId : string) => {

    if(!courseId){
        return
    }
    const result = (await wishlistInstance.get(`/get-wishlistItem/${courseId}`)).data
    return result

}

//api for getting wishlist
export const getWishlistApi = async (page : number = 1 , limit : number = 10 , category ? : string ) => {

    const result = (await wishlistInstance.get(`/get-wishlist/?page=${page}&limit=${limit}${category ? `&category=${category}` : ''}`)).data
    return result

}

//apif for removing wishlist item
export const removeWishlistItem = async (wishlistItemId : string) => {

    if(!wishlistItemId){
        return
    }
    const result = (await wishlistInstance.delete(`/delete-wishlistItem/${wishlistItemId}`)).data
    return result

}