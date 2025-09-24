import axios from 'axios'

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL // authentication url
const COURSE_URL = process.env.NEXT_PUBLIC_COURSE_URL // course url
const CART_URL = process.env.NEXT_PUBLIC_CART_URL // cart url
const  WISHLIST_URL = process.env.NEXT_PUBLIC_WISHLIST_URL //wishlist url
const ENROLLMENT_URL = process.env.NEXT_PUBLIC_ENROLLMENT_URL //enrollment url
const RATE_URL = process.env.NEXT_PUBLIC_RATE_URL // rate url
const PAYMENT_URL = process.env.NEXT_PUBLIC_PAYMENT_URL // payment url

//auth instance
export const authInstance = axios.create({
    baseURL : AUTH_URL,
    withCredentials : true,
})

//course instance
export const courseInstance = axios.create({
    baseURL : COURSE_URL,
    withCredentials : true
})

//cart instance
export const cartInstance = axios.create({
    baseURL : CART_URL,
    withCredentials : true
})

//wishlist instance
export const wishlistInstance = axios.create({
    baseURL : WISHLIST_URL,
    withCredentials : true
})

//enrollment instance
export const enrollmentInstance = axios.create({
    baseURL : ENROLLMENT_URL,
    withCredentials : true
})

//rate instance
export const rateInstance = axios.create({
    baseURL : RATE_URL,
    withCredentials : true
})

//payment instance
export const paymentInstance = axios.create({
    baseURL : PAYMENT_URL,
    withCredentials : true
})