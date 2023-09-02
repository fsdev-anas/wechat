import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';

const RootLayout = () => {
  return (
    <>

      <Grid container spacing={2}>
        <Grid xs={1}>
          <Paragraph title='Ami root'/>
        </Grid>
        <Grid xs={11}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  )
}

export default RootLayout