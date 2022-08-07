import { createSlice } from "@reduxjs/toolkit";

let userState;

if (window.localStorage.getItem('hotelUser')) {
    userState = JSON.parse(window.localStorage.getItem('hotelUser'))
} else {
    userState = null
}

export const userSlice = createSlice({
    name: "user",
    initialState: userState ? userState : null,
    reducers: {
        loginUser: (state, action) => {
            state = {...state, ...action.payload.data}
        },
        logoutUser: (state, action) => {
            state = action.payload.data
        }
    }
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer