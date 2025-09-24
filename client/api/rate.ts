import { rateInstance } from "./axiosInstance"

//api for adding rate
export const addRateApi = async (courseId : string , rate : number , comment ? : string) => {

    if(!courseId || !rate){
        return
    }
    const result = (await rateInstance.post("/add-rate" , {courseId : courseId , rate : rate , comment : comment})).data
    return result

}

//api for getting user rate
export const getUserRateApi = async (courseId : string) => {

    if(!courseId){
        return
    }
    const result = (await rateInstance.get(`/get-userRate/${courseId}`)).data
    return result

}

//api for getting total ratings
export const getTotalRatingsApi = async (courseId : string) => {

    if(!courseId){
        return
    }
    const result = (await rateInstance.get(`/get-totalRatings/${courseId}`)).data
    return result

}

//api for getting rate comments
export const getRateCommentsApi = async (courseId : string , page : number = 1 , limit : number = 10) => {

    if(!courseId){
        return
    }
    const result = (await rateInstance.get(`/get-rateComments/${courseId}?page=${page}&limit=${limit}`)).data
    return result

}

//api for removing rate
export const removeRateApi = async (rateId : string) => {

    if(!rateId){
        return
    }
    const result = (await rateInstance.delete(`/remove-rate/${rateId}`)).data
    return result

}