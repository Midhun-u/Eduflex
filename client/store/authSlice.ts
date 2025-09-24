import { UserType } from '@/types/userType'
import {createSlice} from '@reduxjs/toolkit'

interface InitialState {
    loading : boolean,
    error : null | {success : boolean , error : string},
    message : string | null,
    user : UserType | null
}

//initial state
const initialState : InitialState = {
    loading : false,
    error : null,
    message : null,
    user : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState : initialState,
    reducers : {

        authRequest : (state) => {
            state.loading = true
        },
        authSuccess : (state , action) => {
            state.loading = false
            state.message = action.payload.message
            state.error = null,
            state.user = action.payload.user || null
        },
        authFailed : (state , action) => {
            state.loading = false
            state.error = action.payload.error
            state.message = null
        }

    },
})

export const {authFailed , authRequest , authSuccess} = authSlice.actions
export default authSlice.reducer