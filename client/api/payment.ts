import { paymentInstance } from "./axiosInstance"

//api for creating payment intent
export const createPaymentIntentApi = async (courseId : string , price : number) => {

    const result = (await paymentInstance.post("/create-checkout-intent/single" , {courseId : courseId , price : price})).data
    return result

}

//api for creating payment intent for cart items
export const createCartPaymentIntentApi = async (totalPrice : number) => {

    const result = (await paymentInstance.post('/create-checkout-intent/cart' , {cartTotalPrice : totalPrice})).data
    return result

}