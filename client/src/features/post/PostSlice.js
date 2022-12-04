import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import API from "../../api/server"

const url = 'http://localhost:5000'

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await API.get(`${url}/posts`)
    console.log(response.data)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialState) => {
    const response = await API.post(`/posts`, initialState)
    return response.data
})

export const updatePost = createAsyncThunk('/posts/updatePost', async (initialState) => {
    const { _id } = initialState
    const response = await API.patch(`/posts/${_id}`, initialState.postData)
    console.log(initialState.postData)
    return response.data
})

export const deletePost = createAsyncThunk('/posts/deletePost', async id => {
    const response = await API.delete(`/posts/${id}`)
    return response.data
})

export const likePost = createAsyncThunk('/posts/likePost', async id => {
    const response = await API.patch(`/posts/${id}/likepost`)
    return response.data
})

const postsSlice =  createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = state.posts.concat(action.payload.postMessages)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(action)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.posts = state.posts.map( post => {
                    if(post._id === action.payload._id){
                        return {...action.payload}
                    }
                    return post
                })
                console.log(action.payload)
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.posts.push(action.payload.newPostMessage)
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post._id !== action.payload.id)
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
                console.log(action.payload)
            })
            .addCase(likePost.rejected, (state, action) => {
                console.log(action.error.message)
            })

    }
})

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts
