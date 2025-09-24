import {authInstance} from './axiosInstance'

// api for checking email
export const checkEmailApi = async (email : string) => {
    const result = (await authInstance.post("/check-email" , {email : email})).data
    return result
}

//api for signing
export const signApi = async (fullname : string , email : string , password : string) => {

    const result = await authInstance.post("/sign" , {fullname , email , password})
    return result.data

}

//api for sending otp
export const sendOtpApi = async (email : string) => {

    const result = (await authInstance.post('/send-otp' , {email : email})).data
    return result

}

//api for verifying otp
export const verifyOtpApi = async (otpForChecking : string) => {

    const result = (await authInstance.post(`/check-otp/${otpForChecking}`)).data
    return result

}

//api for signing google
export const googleSignApi = async (fullname : string , email : string , profilePic : string) => {

    const result = (await authInstance.post('/google-sign' , {fullname , email , profilePic : profilePic})).data
    return result

}

//api for loging
export const loginApi = async (email : string , password : string) => {

    const result = (await authInstance.post("/login" , {email , password})).data
    return result

}

//api for loging using google
export const googleLoginApi = async (email : string) => {

    const result = (await authInstance.post('/google-login' , {email})).data
    return result

}

//api for logouting
export const logoutApi = async () => {

    const result = (await authInstance.post("/logout")).data
    return result

}

//api for getting auth user
export const getAuthUserApi = async () => {

    const result = (await authInstance.get("/get-authUser")).data
    return result

}

//api for getting user
export const getUserApi = async (userId : string) => {

    if(userId){

        const result = (await authInstance.get(`/get-user/${userId}`)).data
        return result

    }

} 

//api for updating user data
export const updateUserApi = async (fullname : string , bio : string , profilePic : {url : string , publicId : string}) => {

    const result = (await authInstance.put("/update-user" , {fullname : fullname , bio : bio , profilePic : profilePic})).data
    return result

}

//api for changing user password
export const changePasswordApi = async (currentPassword : string , newPassword : string) => {

    const result = (await authInstance.put("/change-password" , {currentPassword : currentPassword , newPassword : newPassword})).data
    return result

}