import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ToastState {
    message: string;
    type: string;
}

const initialState: ToastState = {
    message: "",
    type: "",
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<{message: string, type: string}>) => {
            state.message = action.payload.message
            state.type = action.payload.type
        },
        clearToast: (state) => {
            state.message = ""
            state.type = ""
        }
    }
})

export const { showToast, clearToast } = toastSlice.actions
export default toastSlice.reducer