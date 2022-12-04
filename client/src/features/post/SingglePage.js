import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AllOutIcon from '@mui/icons-material/AllOutRounded';
import dateFormat from 'dateformat';


import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from './PostSlice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwTFeDBAi-IaZY9muEWvHqyDr0r_urryZLAT8s_F14&s'

const LinkCard = styled(Link)({
    textDecoration: 'none'
})

export default function RecipeReviewCard() {
  const dispatch = useDispatch()

  const { postId } = useParams()

  const post = useSelector( state => state.posts.posts.find(message => message._id === postId) )

  return (
    <Card sx={{ maxWidth: 545 }}>
        <CardHeader
            avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {post.title.slice(0,1).toUpperCase()}
            </Avatar>
            }
            action={
            <IconButton aria-label="edit">
                <EditIcon />
            </IconButton>
            }
            title={post.title}
            subheader={dateFormat(post.createdAt, "mmmm d yyyy")}
        />
        <CardMedia
            component="img"
            height="194"
            image={post.selectedFile || img}
            alt={post.creator}
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                {post.message}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(deletePost(post._id))} >
                <DeleteIcon />
            </IconButton>
            <IconButton>
                <LinkCard to={`/`} ><AllOutIcon/></LinkCard>
            </IconButton>
        </CardActions>
    </Card>
  );
}