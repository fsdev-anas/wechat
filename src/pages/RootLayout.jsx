import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import { useSelector } from 'react-redux';
import { MdOutlineHome } from 'react-icons/md'
import { AiOutlineMessage, AiOutlineLogout } from 'react-icons/ai'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { FiSettings } from 'react-icons/fi'
import Sidebar from '../components/Sidebar';

const RootLayout = () => {
  const userInfo = useSelector((state) => state.loginUser.value)
  return (
    <>

      <Grid container spacing={2}>
        <Grid xs={2}>
          <Sidebar />
        </Grid>
        <Grid xs={10}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  )
}

export default RootLayout