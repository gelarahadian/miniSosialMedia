import { useState, useEffect } from "react"
import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Navbar from "./app/Navbar"
import { selectAllPosts } from "./features/post/PostSlice"
import { fetchPosts } from "./features/post/PostSlice"



const App = () => {
  const [currentId, setCurrentId] = useState(0)
  const allPost = useSelector(selectAllPosts) 
  const status = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())

  }, [dispatch, fetchPosts])
    return(
        <Container maxWidth="lg">
          <Navbar/>
          <Outlet context={[currentId, setCurrentId, allPost, status, error]}/>
      </Container>
    )
}

export default App