import React, { useState } from 'react'
import '@fontsource/roboto/400.css';
import Grid from '@mui/material/Unstable_Grid2';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { green, grey } from '@mui/material/colors';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    let [email,setEmail] = useState("");
    const auth = getAuth();
    let navigate = useNavigate();

    let handleForgot = () => {
        sendPasswordResetEmail(auth, email).then(() => {
            toast.success('Check Email for Reset your Password', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                navigate('/login')
            }, 100);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode,errorMessage);
        if (errorCode.includes('user-not-found')) {
            toast.success('User Not Exists with this Email', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    });
    }
    

  return (
    <Grid container>
        <Grid smOffset={3} xs={7} sx={{mt:15, p:25, background:'#4caf50'}}>
            <Paragraph title='Enter Your existing Email to reset Password' />
            <TextField onChange={(e) => setEmail(e.target.value)} name='email' sx={{ mt:3, mb:3, width:'90%' }} type='email' id="filled-basic" label="Email" variant="filled" />
            <Button onClick={handleForgot} sx={{py:1}} variant="contained">Forgot Password</Button>
        </Grid>
    </Grid>
  )
}

export default ForgotPassword