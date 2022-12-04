import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Grid } from '@mui/material';
import { CircularProgress } from '@mui/material';
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined"
import dateFormat from 'dateformat'
import { deletePost,likePost } from './PostSlice';
import { useDispatch, } from 'react-redux';
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';

const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwTFeDBAi-IaZY9muEWvHqyDr0r_urryZLAT8s_F14&s'


const Post = ({post, setCurrentId}) => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const Likes = () => {
        if(post.likes.length > 0) {
            return post.likes.find( like => like === (user?.result?.googleId || user?.result?._id))
            ? (
                <><ThumbUpAlt  fontSize='small'/>
                    &nbsp; {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` 
                    : `${post.likes.length} like${post.likes.length > 1 ? "s" : '' }`}
                </>
            ) : (
                <><><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</></>
            )
        } 
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }
    return(
        <Grid item xs={12} sm={6}>
            <Card sx={{ maxWidth: 400 }}>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {post?.name?.slice(0,1).toUpperCase()}
                    </Avatar>
                    }
                    action={
                        (user?.result?.googleId === post.creator || user?.result?._id === post.creator) && (
                            <IconButton onClick={() => {setCurrentId(post._id)}} aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        )
                    }
                    title={post?.name}
                    subheader={dateFormat(post.createdAt, "mmmm d yyyy")}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={post.selectedFile || img}
                    alt={post.creator}
                />
                <CardContent>
                    <Typography variant="h6" >
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post.message}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={() => dispatch(likePost(post._id))} >
                        <Likes/>
                    </IconButton>
                    {(user?.result?.googleId === post.creator || user?.result?._id === post.creator) && (
                        <IconButton onClick={() => dispatch(deletePost(post._id))} >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </CardActions>
            </Card>
        </Grid>
    )
}


const Posts = ({setCurrentId, allPost, status, error}) => {
    let content
    if( status === 'loading'){
        content = <CircularProgress/>
    }else if(status === 'succeeded'){
        content = allPost.map( post => (
            <Post post={post} key={post._id} setCurrentId={setCurrentId} />
        ))
    }else if(status === 'failed'){
        content = <p>{error}</p>
    }
    return (
        <Grid container spacing={2}>
            {content}
        </Grid>
    )
}

export default Posts