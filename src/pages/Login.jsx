import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import Images from '../components/Images'
import img from '../assets/login.jpg'
import Heading from '../components/Heading';
import Para from '../components/Para';
import Alert from '@mui/material/Alert';
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import { getAuth, signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const provider = new GoogleAuthProvider();
  const provider2 = new FacebookAuthProvider();
  let navigate = useNavigate();
  const auth = getAuth();
  let [formData,setFormData] = useState({
    email:"",
    password:""
  });
  let [emailError,setEmailError] = useState("");
  let [passwordError,setPasswordError] = useState("");
  let [open,setOpen] = useState(false);
  let [load,setLoad] = useState(false);

  let handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
      if (e.target.name == 'email') {
        setEmailError("");
      }
      if (e.target.name == 'password') {
        setPasswordError("");
      }
    }
    
    
    let handleRegistration = () => {
      let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

      
      if (!formData.email) {
        setEmailError("Email Required")
      }else if (!pattern.test(formData.email)) {
        setEmailError("Invalid Email")
      }
      if (!formData.password) {
        setPasswordError("Password Required")
      }else if (!passw.test(formData.password)) {
        setPasswordError("Wrong password!")
      }

      if (pattern.test(formData.email) && passw.test(formData.password)) {
        console.log("Done1");
        setLoad(true)
        signInWithEmailAndPassword(auth, formData.email, formData.password).then((userCredential)=>{
          console.log("Done2");
          setLoad(true)
          let user = userCredential.user
          // console.log(userCredential);
          if (user.emailVerified) {
            navigate('/home')
          }else{
            toast.error('Please verify your email for login first', {
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
        }).catch((error) => {
          setLoad(false)
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // console.log(errorCode);
          // console.log(errorMessage);
          toast.error('Wrong Password! try again', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

        })
      }
      
  }

  let handleProviderGoggle = () => {
    signInWithPopup(auth, provider).then(() => {
      // console.log("done");
      navigate('/home')
    })

  }
  let handleProviderFb = () => {
    signInWithPopup(auth, provider2).then((result) => {
      // console.log("done");
      // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // IdP data available using 
    getAdditionalUserInfo(result)
    // ...
      console.log('done');
      navigate('/home')
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
  
      // ...
    });

  }
  
  
  

  return (
    <div className='registration'>
        <div className="left">
            <div className="text-container">
                <Heading className='h1' title='Get started with easily register' />
                <Para className='p' title='Free register and you can enjoy it' />
                <Button onClick={handleProviderGoggle} className='' color='success' variant="contained">Google Sign In</Button>
                <Button onClick={handleProviderFb} className='fb' variant="outlined">Facebook Sign In</Button>
                <TextField name='email' onChange={handleChange} className='inputCSS' type='email' id="filled-basic" label="Email" variant="filled" value={formData.email} />
                {emailError &&
                  <Alert variant="filled" severity="error">
                    {emailError}
                  </Alert>
                }
                <TextField name='password' onChange={handleChange} className='inputCSS' type={open?'text':'password'} id="filled-basic" label="Password" variant="filled" value={formData.password} />
                {open?
                <AiFillEye onClick={() => setOpen(false)} className='hide' />
                :
                <AiFillEyeInvisible onClick={() => setOpen(true)} className='hide' />
                }
                {passwordError &&
                  <Alert variant="filled" severity="error">
                    {passwordError}
                  </Alert>
                }
                {load?
                <Button onClick={handleRegistration} className='regButton' variant="contained" disabled>
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="2"
                    animationDuration="0.75"
                    width="30"
                    visible={true}
                  />
                </Button>
                :
                <Button onClick={handleRegistration} className='regButton' variant="contained">Sign Up</Button>
                }
                <Para className='sign'>
                  Don’t have an account ? <Link to="/registration" className='focus'>Sign Up</Link>
                </Para>
                <Para className='forgot'>
                  Forgot Password ? <Link to="/forgotpassword" className='focus'>Click Here</Link>
                </Para>
            </div>
        </div>
        <div className="right">
            <Images src={img} alt='image' className='bg' />
        </div>
    </div>
  )
}

export default Login