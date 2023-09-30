import React, { useEffect, useState } from 'react'
import '@fontsource/roboto/400.css';
import Grid from '@mui/material/Unstable_Grid2';
import { Link, useNavigate } from 'react-router-dom';
import Images from '../components/Images';
import IMG from '../assets/login.jpg'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import Alert from '@mui/material/Alert';
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database";
import { RotatingLines } from  'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { logedUser } from '../slices/userSlice';

const Login = () => {
  let [formData,setFormData] = useState({
    email:"",
    password:""
  });
  let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  let emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  let [fullnameError,setFullnameError] = useState("");
  let [emailError,setEmailError] = useState("");
  let [passwordError,setPasswordError] = useState("");
  let [show,setShow] = useState(false);

  let data = useSelector((state) => state.loginUser.value)

  useEffect(() => {
    if (data) {
      navigate('/home')
    }
  }, [])

  const auth = getAuth();
  const db = getDatabase();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const provider2 = new FacebookAuthProvider();

  let handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })

      
      if (e.target.name == 'email') {
        setEmailError("")
      }
      if (e.target.name == 'password') {
        setPasswordError("")
      }
  }
  
  let handleRegistration = () => {
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

      if (emailPattern.test(formData.email) && passwordPattern.test(formData.password)){
        signInWithEmailAndPassword(auth,formData.email,formData.password).then((userCredential) => {
          const userData = userCredential.user;
          console.log(userData);
          // if (user.emailVerified) {
          const user = {
            // Store only the necessary user data here
            uid: userData.uid,
            email: userData.email,
            displayName: userData.displayName,
            photoURL: userData.photoURL,
          };
          dispatch(logedUser(user)); // Dispatch with serializable data
          localStorage.setItem("user", JSON.stringify(user));
          setTimeout(() => {
            navigate('/home')
          }, 100);
          // }else{
          //   toast.success('please verify your email first to login!', {
          //     position: "bottom-center",
          //     autoClose: 3000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //     theme: "dark",
          //     });
          // }
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);

          if (errorCode && errorCode.includes("user-not-found")) {
            toast.success('User not Found', {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          }
          if (errorCode && errorCode.includes("wrong-password")) {
            toast.success('Wrong Password', {
              position: "bottom-center",
              autoClose: 2000,
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
  }

  let handleGoogle = () => {
    signInWithPopup(auth, provider).then((userCredential) => {
      navigate('/home')
      const userData = userCredential.user;
      const user = {
        // Store only the necessary user data here
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      };      dispatch(logedUser(user)); // Dispatch with serializable data
      localStorage.setItem("user", JSON.stringify(user));
      set(ref(db, 'users/'+ userData.uid), {
        username: userData.displayName,
        email: userData.email,
        profile_picture: userData.photoURL
      })
    })
  }
  let handleFb = () => {
    signInWithPopup(auth, provider2).then((userCredential) => {
      navigate('/home')
      const userData = userCredential.user;
      console.log(userData);
      const user = {
        // Store only the necessary user data here
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      };
      dispatch(logedUser(user)); // Dispatch with serializable data
      localStorage.setItem("user", JSON.stringify(user));
      set(push(ref(db, 'users')), {
        username: userData.displayName,
        email: userData.email,
        profile_picture: userData.photoURL
      })
    })
  }
  
  

  return (
    <>
      <Grid container>
      <Grid xs={7}>
        <div className="left">
          <Grid smOffset={5} sx={{ pt:12 }}>
              <Heading className='Heading' title='Sign In to Facebook' />
              <Paragraph title="Your social platform" />
              <Button onClick={handleGoogle} sx={{ mt:3, ml:0, py:1, width:'40%' }} variant="contained">Sign in with Google</Button>
              <Button onClick={handleFb} sx={{ mt:3, ml:2, py:1, width:'45%', fontWeight:600 }} variant="outlined">Sign in with Facebook</Button>
              <TextField onChange={handleChange} name='email' sx={{ mt:3, width:'90%' }} type='email' id="filled-basic-email" label="Email" variant="filled" />
              {emailError &&
              <Alert sx={{width:'83%' }} variant="filled" severity="error">
                {emailError}
              </Alert>
              }
              <TextField onChange={handleChange} name='password' sx={{ mt:3, width:'90%' }} type={show?'text':'password'} id="filled-basic-password" label="Password" variant="filled" />
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
              <Button onClick={handleRegistration} sx={{ mt:5, mb:3, py:1, width:'90%' }} variant="contained">Login to Continue</Button>
              <Paragraph className='Paragraph' title="Forgot Password?"><Link to='/forgotpassword' className='focus'>Reset</Link></Paragraph>
              <Paragraph className='Paragraph2' title="Don't have an account?"><Link to='/' className='focus'>Sign Up</Link></Paragraph>
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

export default Login