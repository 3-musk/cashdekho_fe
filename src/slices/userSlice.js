import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedin: false,
    accessToken: "",
    userRole: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.jwt;
            state.isLoggedin = true;
            state.userRole = action.payload.role;
        },
        updateJwt: (state, action) => {
            state.accessToken = action.payload.jwt;
        },
        logout: (state) => {
            state.isLoggedin = false;
            state.accessToken = "";
            state.userRole = "";
        }
    },
});

export const { login, updateJwt, logout } = userSlice.actions;
export default userSlice.reducer;