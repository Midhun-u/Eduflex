import { createSlice } from "@reduxjs/toolkit"
import type {CartItemType} from '../types/cartItemType'

interface InitialState {
    loading: boolean,
    message: any,
    error: any,
    cartItems : CartItemType[],
    totalCartPrice : number
}

const initialState: InitialState = {
    loading: false,
    message: null,
    error: null,
    cartItems: [],
    totalCartPrice : 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {

        cartRequest: (state) => {
            state.loading = true
            state.message = null
            state.error = null
            state.cartItems = [],
            state.totalCartPrice = 0
        },
        cartSuccess: (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.error = null
            state.cartItems = action.payload.cartItems
            state.totalCartPrice = action.payload.totalCartPrice
        },
        cartFailed: (state, action) => {
            state.loading = false
            state.message = null
            state.error = action.payload.error
            state.cartItems = []
            state.totalCartPrice = 0
        }

    }
})

export default cartSlice.reducer
export const { cartRequest, cartSuccess, cartFailed } = cartSlice.actions