import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
  let navigate = useNavigate();
  const auth = getAuth();
  let [email,setEmail] = useState("");

  let handleForgotpassword = () => {
    sendPasswordResetEmail(auth, email).then(() => {
        toast.success('Password change request sent, check Email!', {
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
            },3000)

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode.includes("user")) {
            toast.error('User doesnt exist with this Email! Please Enter registered Email', {
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
  

  return (
    <div className="forgotbox">
        <div className="forgotpassword">
        <TextField name='email' onChange={(e) => setEmail(e.target.value)} className='' type='email' id="outlined-basic" label="Email" variant="outlined" />
        <Button onClick={handleForgotpassword} className='forgotBTN' variant="contained">Enter</Button><br />
        <Link to='/login'><Button className='forgotBTN' variant="contained">Back</Button></Link>
        </div>
    </div>
  )
}

export default Forgotpassword