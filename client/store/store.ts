import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import courseReducer from './courseSlice'
import wishlistReduer from './wishlistSlice'
import cartReducer from './cartSlice'

const makeStore = () => {
    return configureStore({
        reducer : {
            authReducer : authReducer,
            courseReducer : courseReducer,
            wishlistReduer : wishlistReduer,
            cartReducer
        }
    })
}

export const store = makeStore()
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']