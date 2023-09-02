import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux';
import { logedUser } from '../slices/userSlice';

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let data = useSelector((state) => state.loginUser.value)

  useEffect(() => {
    if (!data) {
      navigate('/login')
    }
  }, [])
  

  let handleButton = () => {
      signOut(auth).then(() => {
        dispatch(logedUser(null))
        localStorage.removeItem("user")
        navigate('/login')
      })
  }
  

  return (
    <Button onClick={handleButton} sx={{ mt:65, ml:73, py:1, width:'12%' }} variant="contained">Sign Out</Button>
  )
}

export default Home