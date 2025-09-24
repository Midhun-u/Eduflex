import { createSlice } from "@reduxjs/toolkit"
import type {WishlistItemType} from '../types/wishlistItemType'

interface InitialState {
    loading: boolean,
    message: any,
    error: any,
    wishlistItems : WishlistItemType[]
}

const initialState: InitialState = {
    loading: false,
    message: null,
    error: null,
    wishlistItems: []
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: initialState,
    reducers: {

        wishlistRequest: (state) => {
            state.loading = true
            state.message = null
            state.error = null
            state.wishlistItems = []
        },
        wishlistSuccess: (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.error = null,
            state.wishlistItems = action.payload.wishlistItems
        },
        wishlistFailed: (state, action) => {
            state.loading = false
            state.message = null
            state.error = action.payload.error
            state.wishlistItems = []
        }

    }
})

export default wishlistSlice.reducer
export const { wishlistRequest, wishlistSuccess, wishlistFailed } = wishlistSlice.actions