import { enrollmentInstance } from "./axiosInstance"

//api for enrolling course
export const enrollCourseApi = async (courseId : string , price : number , courseEducatorId : string) => {

    if(!courseId || !price || !courseEducatorId){
        return
    }
    const result = (await enrollmentInstance.post("/enroll-course" , {courseId : courseId , price : price , courseEducatorId : courseEducatorId})).data
    return result

}

//api for getting an enrolled course
export const getEnrolledCourseApi = async (courseId : string) => {

    if(!courseId){
        return
    }
    const result = (await enrollmentInstance.get(`/get-enrolledCourse/${courseId}`)).data
    return result

}

//api for getting enrollment details
export const getEnrollmentDetailsApi = async (page : number = 1 , limit : number = 10) => {

    const result = (await enrollmentInstance.get(`/get-enrollmentDetails/?page=${page}&limit=${limit}`)).data
    return result

}

//api for completing lecture
export const completeLectureApi = async (enrollmentId : string , lectureId : string , completed : boolean = false) => {

    const result = (await enrollmentInstance.put(`/complete-lecture` , {enrollmentId : enrollmentId , lectureId : lectureId , completed : completed})).data
    return result

}

//api for getting top enrollments
export const getTopEnrollmentsApi = async () => {

    const result = (await enrollmentInstance.get(`/get-topEnrollments`)).data
    return result

}

//api for getting total enrollments
export const getTotalEnrollmentsApi = async (courseId : string) => {

    if(!courseId){
        return
    }
    const result = (await enrollmentInstance.get(`/get-totalEnrollments/${courseId}`)).data
    return result

}

//api for getting total learners
export const getTotalLearnersApi = async (educatorId : string) => {

    if(!educatorId){
        return
    }
    
    const result = (await enrollmentInstance.get(`/get-totalLearners/${educatorId}`)).data
    return result

}

//api for getting total earnings
export const getTotalEarningsApi = async () => {

    const result = (await enrollmentInstance.get("/get-totalEarnings")).data
    return result

}

//api for getting enrolled students
export const getEnrolledStudentsApi = async (page : number = 1 , limit : number = 10) => {

    const result = (await enrollmentInstance.get(`/get-enrolledStudents/?page=${page}&limit=${limit}`)).data
    return result

}

//api for getting latest enrollments
export const getLatestEnrollmentsApi = async () => {

    const result = (await enrollmentInstance.get("/get-latestEnrollments")).data
    return result

}