import { createSlice } from "@reduxjs/toolkit";
import type { AuthState, User } from "./authTypes"

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: { payload: User }) => {
            state.user = action.payload
            state.isAuthenticated = true;
        }
    }

})

export const { loginSuccess } = authSlice.actions
export default authSlice.reducer;