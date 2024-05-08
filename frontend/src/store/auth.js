import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    authUser: JSON.parse(localStorage.getItem('chat-user')) || null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser(state, action) {
            state.authUser = action.payload;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;