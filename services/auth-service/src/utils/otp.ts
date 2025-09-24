export const otpData : {otp : number  | null , expireDate : number} = {
    otp : null,
    expireDate : 0
}

//function for check otp correct 
export const checkOtpCorrect = (otpForChecking : number) : boolean => {

    const currentDate = Date.now()

    if(otpData.otp === otpForChecking && currentDate < otpData.expireDate){
        return true
    }else{
        return false
    }

}