import React, { useState } from 'react'
import '@fontsource/roboto/400.css';
import Grid from '@mui/material/Unstable_Grid2';
import { Link, useNavigate } from 'react-router-dom';
import Images from '../components/Images';
import IMG from '../assets/auth.jpg'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import Alert from '@mui/material/Alert';
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database";
import { RotatingLines } from  'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  let [formData,setFormData] = useState({
    fullname:"",
    email:"",
    password:"",
  });
  let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  let emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  let [fullnameError,setFullnameError] = useState("");
  let [emailError,setEmailError] = useState("");
  let [passwordError,setPasswordError] = useState("");
  let [show,setShow] = useState(false);
  let [load,setLoad] = useState(false);
  let navigate = useNavigate();

  const auth = getAuth();
  const db = getDatabase();

  let handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })

      if (e.target.name == 'fullname') {
        setFullnameError("")
      }
      if (e.target.name == 'email') {
        setEmailError("")
      }
      if (e.target.name == 'password') {
        setPasswordError("")
      }
  }
  
  let handleRegistration = () => {
      if (!formData.fullname) {
        setFullnameError("Fullname Required")
      }
      
      if (!formData.email) {
        setEmailError("Email Required")
      }else if(!emailPattern.test(formData.email)){
        setEmailError("Invalid Email")
      }

      if (!formData.password) {
        setPasswordError("Password Required")
      }else if(!passwordPattern.test(formData.password)){
        setPasswordError("Invalid Password")
      }

      if (emailPattern.test(formData.email) && passwordPattern.test(formData.password)) {
        setLoad(true)
        createUserWithEmailAndPassword(auth,formData.email,formData.password).then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: formData.fullname, 
            photoURL: "https://firebasestorage.googleapis.com/v0/b/practice-3e967.appspot.com/o/a.jpg?alt=media&token=6cfa56bf-ad5f-417b-bfed-feb3000d4e8a"
          }).then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              setLoad(false)
              setFormData({
                fullname:"",
                email:"",
                password:"",
              })
              toast.success('Registration Successfull, please verify your email!', {
                position: "bottom-center",
                autoClose: 3000,
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
            }).then(() => {
              set(ref(db, 'users/'+ user.uid), {
                username: formData.fullname,
                email: formData.email,
                profile_picture: user.photoURL
              })
            })
          })

        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          
          if (errorCode && errorCode.includes("email")) {
            toast.success('This Email already exists!', {
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
          
          setLoad(false)
        });
      }
  }
  

  return (
    <>
      <Grid container>
      <Grid xs={7}>
        <div className="left">
          <Grid smOffset={5} sx={{ pt:12 }}>
              <Heading className='Heading' title='Get started with easily register' />
              <Paragraph title="Free register and you can enjoy it" />
              <TextField onChange={handleChange} name='fullname' sx={{ mt:3, width:'90%' }}  type='text' id="filled-basic" label="Full Name" variant="filled" value={formData.fullname} />
              {fullnameError &&
              <Alert sx={{width:'83%' }} variant="filled" severity="error">
                {fullnameError}
              </Alert>
              }
              <TextField onChange={handleChange} name='email' sx={{ mt:3, width:'90%' }} type='email' id="filled-basic" label="Email" variant="filled" value={formData.email} />
              {emailError &&
              <Alert sx={{width:'83%' }} variant="filled" severity="error">
                {emailError}
              </Alert>
              }
              <TextField onChange={handleChange} name='password' sx={{ mt:3, width:'90%' }} type={show?'text':'password'} id="filled-basic" label="Password" variant="filled" value={formData.password} />
              {show?
              <AiFillEyeInvisible onClick={() => setShow(false)} className='eyecon' />
              :
              <AiFillEye onClick={() => setShow(true)} className='eyecon' />
              }
              {passwordError &&
              <Alert sx={{ width:'83%' }} variant="filled" severity="error">
                {passwordError}
              </Alert>
              }
              {load?
              <Button onClick={handleRegistration} sx={{ mt:5, mb:3, py:1, width:'90%' }} variant="contained" disabled >
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="2"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              </Button>
              :
              <Button onClick={handleRegistration} sx={{ mt:5, mb:3, py:1, width:'90%' }} variant="contained">Register</Button>
              }
              <Paragraph className='Paragraph' title="Already have an account?"><Link to='/login' className='focus'>Sign In</Link></Paragraph>
          </Grid>
        </div>
      </Grid>
      <Grid xs={5}>
        <div className="right">
          <Link>
            <Images className='img' src={IMG} alt='img' />
          </Link>
        </div>
      </Grid>
    </Grid>
    </>
  )
}

export default Registration