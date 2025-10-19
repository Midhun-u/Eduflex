import { cartInstance } from "./axiosInstance"

//api for adding course to cart
export const addCartApi = async (courseId : string , cartItemPrice : string | number) => {

    if(!courseId || !cartItemPrice){
        return
    }

    const result = (await cartInstance.post("/add-cart/" , {cartItemPrice : cartItemPrice , courseId : courseId})).data
    return result

}

//api getting cart item
export const getCartItemApi = async (courseId : string) => {

    if(!courseId){
        return
    }

    const result = (await cartInstance.get(`/get-cartItem/${courseId}`)).data
    return result

}

//api for gettng all cart items
export const getCartListItemsApi = async (page : number = 1 , limit : number = 10) => {

    const result = (await cartInstance.get(`/get-cartItems/?page=${page}&limit=${limit}`)).data
    return result

}

//api for deleting cart items
export const deleteCartItemApi = async (cartItemId : string) => {

    if(!cartItemId){
        return
    }

    const result = (await cartInstance.delete(`/delete-cartItem/${cartItemId}`)).data
    return result

}

//api for getting all price of cart
export const getAllCartPriceApi = async () => {

    const result = (await cartInstance.get("/get-cartPrice")).data
    return result

}