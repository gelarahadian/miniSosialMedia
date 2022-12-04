
import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";

export const getPosts = async (req,res) => {
    try{
        const postMessages = await postMessage.find()
        res.status(200).json({postMessages})
    }catch(error) {
        res.status(404).json({ message: error.message})
    }
}

export const createPost = async (req,res) => {
    const post = req.body;
    if(!req.userId) return res.json({ message: "unauthenticated"})
    const newPostMessage = new postMessage( { ...post, creator: req.userId, createdAt: new Date().toISOString()})
    try{
        await newPostMessage.save()
        res.status(201).json({newPostMessage})
    }catch(error){
        res.status(409).json({message: error.message})
    }
}

export const getPost = async (req,res) => {
    const { id } = req.params
    try{
        const post = await postMessage.findById(id)
        res.status(200).json({post})
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params
    if(!req.userId) return res.json({ message: "unauthenticated"})
    const { title, message, selectedFile, creator, tags, _id } = req.body
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Not Post With id: ${id}`)
    const updatedPost = {title, message, selectedFile, creator, tags, _id}
    const postUpdated = await postMessage.findByIdAndUpdate(id, updatedPost, {new: true})
    res.json(postUpdated)
}

export const deletePost = async (req,res) => {
    const { id } = req.params
    if(!req.userId) return res.json({ message: "unauthenticated"})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Post With id: ${id}`)
    await postMessage.findByIdAndRemove(id)
    res.json({ id })
}

export const likePost = async (req, res) => {
    const {id} = req.params
    if(!req.userId) return res.json({ message: "unauthenticated"})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Post With id: ${id}`)
    const post = await postMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId))
    if (index === -1){
        post.likes.push(req.userId)
    }else{
        post.likes = post.likes.filter( id => id !== String(req.userId) )
    }
    const updateLikePost = await postMessage.findByIdAndUpdate(id, post, {new: true}  )
    res.json(updateLikePost)
}
