import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import Images from '../components/Images'
import img from '../assets/auth.jpg'
import Heading from '../components/Heading';
import Para from '../components/Para';
import Alert from '@mui/material/Alert';
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  let navigate = useNavigate();
  const auth = getAuth();
  let [formData,setFormData] = useState({
    fullname:"",
    email:"",
    password:""
  });
  let [fullNameError,setFullNameError] = useState("");
  let [emailError,setEmailError] = useState("");
  let [passwordError,setPasswordError] = useState("");
  let [open,setOpen] = useState(false);
  let [load,setLoad] = useState(false);

  let handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
      if (e.target.name == 'fullname') {
        setFullNameError("");
      }
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

      if (!formData.fullname) {
        setFullNameError("Name Required")
      }else if (!(formData.fullname.length >= 3)) {
        setFullNameError("Invalid Name")
      }
      if (!formData.email) {
        setEmailError("Email Required")
      }else if (!pattern.test(formData.email)) {
        setEmailError("Invalid Email")
      }
      if (!formData.password) {
        setPasswordError("Password Required")
      }else if (!passw.test(formData.password)) {
        setPasswordError("Password not Strong!")
      }

      if ((formData.fullname.length >= 3) && pattern.test(formData.email) && passw.test(formData.password)) {
        console.log("Done1");
        setLoad(true)
        createUserWithEmailAndPassword (auth, formData.email, formData.password).then(() => {
          console.log("done2");
          sendEmailVerification(auth.currentUser).then(() => {
            console.log('done3');
            setFormData({
              fullname:"",
              email:"",
              password:""
            })
            setLoad(false);
            // toast("Wow so easy!");
            toast.success('Registration Successfull!', {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });

              setTimeout(() => {
                navigate("/login")
              },1000)
            });
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode,errorMessage);
          setLoad(false);
          // setEmailError(errorCode)
          // setEmailError("Email already exists")
          if (errorCode.includes("email")) {
            toast.error('Email already exists!', {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }
        });
      }
      
  }
  

  return (
    <div className='registration'>
        <div className="left">
            <div className="text-container">
                <Heading className='h1' title='Get started with easily register' />
                <Para className='p' title='Free register and you can enjoy it' />
                <TextField name='fullname' onChange={handleChange} className='inputCSS' type='text' id="filled-basic" label="Full Name" variant="filled" value={formData.fullname} />
                {fullNameError &&
                  <Alert variant="filled" severity="error">
                    {fullNameError}
                  </Alert>
                }
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
                  Already have an account ? <Link to="/login" className='focus'>Sign in</Link>
                </Para>
            </div>
        </div>
        <div className="right">
            <Images src={img} alt='image' className='bg' />
        </div>
    </div>
  )
}

export default Registration