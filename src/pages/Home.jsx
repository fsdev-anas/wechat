import React from 'react'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();

  let handleButton = () => {
      signOut(auth).then(() => {
        setTimeout(() => {
          navigate('/login')
        }, 100);
      })
  }
  

  return (
    <Button onClick={handleButton} sx={{ mt:65, ml:73, py:1, width:'12%' }} variant="contained">Sign Out</Button>
  )
}

export default Home