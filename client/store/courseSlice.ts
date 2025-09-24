import { CourseListType } from "@/types/courseType"
import { createSlice } from "@reduxjs/toolkit"

interface InitialState{
    loading : boolean,
    message : any,
    error : any,
    courses : CourseListType[]
}

const initialState : InitialState = {
    loading : false,
    message : null,
    error : null,
    courses : []
}

const courseSlice = createSlice({
    name : 'course',
    initialState : initialState,
    reducers : {

        courseRequest : (state) => {
            state.loading = true
            state.message = null
            state.error = null
            state.courses = []
        },
        courseSuccess : (state , action) => {
            state.loading = false
            state.message = action.payload.message
            state.error = null,
            state.courses = action.payload.courses
        },
        courseFailed : (state , action) => {
            state.loading = false
            state.message = null
            state.error = action.payload.error
            state.courses = []
        }

    }
})

export default courseSlice.reducer
export const {courseRequest , courseSuccess , courseFailed} = courseSlice.actions