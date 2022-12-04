import { Grid } from '@mui/material';
import { useOutletContext } from 'react-router-dom';

import Posts from '../features/post/Posts'
import AddFormData from '../features/post/AddFormData'

const Home = () => {
  const [currentId, setCurrentId, allPost,status,error] = useOutletContext()
  return(
    <Grid container justifyContent="space-between" alignItems="stretch" spacing={2}>
      <Grid item xs={12} sm={7}>
        <Posts setCurrentId={setCurrentId} allPost={allPost} status={status} error={error} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <AddFormData currentId={currentId} setCurrentId={setCurrentId} />
      </Grid>
  </Grid>
  )
}

export default Home;