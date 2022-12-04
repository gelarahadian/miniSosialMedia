import { useState } from "react"
import { Paper,Avatar,Typography,Grid,Box, Button } from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import { GoogleLogin } from 'react-google-login' 
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { signIn,signUp } from "./AuthSlice"
import { googleAuth } from "./AuthSlice"
import Input from './Input'

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
const user = JSON.parse(localStorage.getItem('profile'))

const Auth = () => {
    const [isSignUp, setSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword ] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isSignUp){
            dispatch(signUp({formData, navigate}))
        }else{
            dispatch(signIn({formData, navigate}))
        }
    }

    const handleSucces = res => {
        const result = res.profileObj
        const token = res.tokenId

        dispatch(googleAuth({result, token}))
        
        navigate('/')
    }
    const handleError = (err) => {
        console.log(` erroe`, err)
    }
    return(
        <Paper sx={{width: 400, margin: '3rem auto', padding: 3 }}>
            <Avatar sx={{margin: "auto"}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5" align="center" >{signUp ? 'Sign Up' : 'Sign In'}</Typography>
            <Box component='form' onSubmit={handleSubmit} >
                <Grid container justifyContent={'center'} mt={2} spacing={2}>
                    {isSignUp && (
                        <>
                            <Input name="firstName" label={'First Name'} type="text" handleChange={handleChange} half autoFocus />
                            <Input name="lastName" label={'Last Name'} type="text" handleChange={handleChange} half />
                        </>
                    )}
                    <Input name='email' label='Email' type='email' handleChange={handleChange} />
                    <Input name='password' label='password' type={showPassword ? "text" : "password"} handleChange={handleChange} handleShowPassword={handleShowPassword} />
                    {isSignUp && <Input name='confirmPassword' label='repeat password' type='text' handleChange={handleChange} />}
                </Grid>
                <Button type='submit' variant='contained' color='primary' fullWidth sx={{
                    margin: '1rem 0'
                }} >{isSignUp ? "Sign Up" : "Sign In"}</Button>
                <GoogleLogin
                    clientId="6900107525-atfpci9u5gs8r0phth7781dk3ot98i1b.apps.googleusercontent.com"
                    render={ renderProps => (
                        <Button color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={handleSucces}
                    onFailure={handleError}
                    cookiePolicy={'single_host_origin'}
                />
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button size="small" onClick={ () =>  setSignUp(prevValue => !prevValue)} > 
                            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}

export default Auth