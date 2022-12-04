import { useState, useEffect } from "react"
import { Box, Typography, TextField, Button, Paper } from "@mui/material"
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux"

import { addNewPost, updatePost } from "./PostSlice"

const AddFormData = ({currentId, setCurrentId}) => {
    const [postData, setPostData ] = useState({
        title: '', 
        message: '', 
        tags: '', 
        selectedFile: ''
    })
    const [requestStatus, setRequestStatus] = useState('idle')

    const user = JSON.parse(localStorage.getItem('profile'))

    const dispatch = useDispatch()
    const post = useSelector(state => currentId ? state.posts.posts.find(message => message._id === currentId) : null)

    useEffect(() => {
        if (post) setPostData({
            title: post.title,
            message: post.message,
            tags: post.tags,
            selectedFile: post.selectedFile
        })
    },[post])
    
    const canSave =
        [ postData.title, postData.message ].every(Boolean) && requestStatus === 'idle'

    const clear = () => {
        setPostData({title: '', message: '', tags: '', selectedFile: ''})
    }

    const onSavePostClicked = async e => {
        e.preventDefault()
        if (canSave) {
            try{
                setRequestStatus('pending')
                if (currentId === 0){
                    await dispatch(addNewPost({ ...postData, name: user?.result?.name })).unwrap()
                }else{
                    await dispatch(updatePost({ postData, _id: currentId })).unwrap()
                    setCurrentId(0)
                }
                clear()
            }catch(err){
                console.log('Failed to save the post', err)
            }finally{
                setRequestStatus('idle')
            }
        }
    }
    if (!user?.result?.name) {
        return (
          <Paper>
            <Typography variant="h6" align="center">
              Please Sign In to create your own memories and like other's memories.
            </Typography>
          </Paper>
        );
      }
    return(
        <Box>
            <form onSubmit={onSavePostClicked} >
                <Typography variant='h4' component='div'>
                    {currentId ? 'Edit' : 'Add'} Post
                </Typography>
                <TextField name="title" label='title' fullWidth margin="normal" value={postData.title} onChange={e => setPostData({...postData, title: e.target.value})} />
                <TextField name="message" label='message' fullWidth margin="normal" value={postData.message} onChange={e => setPostData({...postData, message: e.target.value})} />
                <TextField name="tags" label='tags' fullWidth margin="normal" value={postData.tags} onChange={e => setPostData({...postData, tags: e.target.value})} />
                <div><FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})} ></FileBase></div>
                <Button color="primary" variant="contained" size='large' fullWidth type="submit" >{currentId ? 'Edit' : 'Add'} Post</Button>
                <Button color='secondary' size='small' variant="contained" onClick={clear}>clear</Button>
            </form>
        </Box>
    )
}

export default AddFormData