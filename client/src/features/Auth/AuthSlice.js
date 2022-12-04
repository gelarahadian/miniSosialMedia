import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import API from "../../api/server";

const initialState = []

export const signIn = createAsyncThunk('user/signiIn', async data => {
    const res = await API.post(`/user/signin`, data.formData)
    return {respon: res.data, navigate: data.navigate}
})

export const signUp = createAsyncThunk('user/signUp', async data => {
    const res = await API.post(`/user/signup`, data.formData)
    return {respon: res.data, navigate: data.navigate}
})

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        googleAuth(state, action) {
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
        },
        logOut(state,action) {
            localStorage.clear()
        }
    },
    extraReducers(builder){
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                localStorage.setItem('profile', JSON.stringify({ ...action?.payload?.respon }))
                action?.payload?.navigate('/')
            })
            .addCase(signUp.fulfilled, (state, action) => {
                localStorage.setItem('profile', JSON.stringify({ ...action?.payload.respon }) )
                action?.payload?.navigate('/')
            })
    }
})

export default AuthSlice.reducer

export const { googleAuth, logOut } = AuthSlice.actions