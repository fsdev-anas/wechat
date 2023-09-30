import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Grouplist from '../components/Grouplist';
import Friends from '../components/Friends';
import Userlist from '../components/Userlist';
import Friendrequest from '../components/Friendrequest';
import Mygroup from '../components/Mygroup';
import Blockedusers from '../components/Blockedusers';

const Home = () => {
  return (
    <>
      <Grid container spacing={2} >
        <Grid xs={4}>
          <Grouplist />
        </Grid>
        <Grid xs={4}>
          <Friends />
        </Grid>
        <Grid xs={4}>
          <Userlist />
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid xs={4}>
          <Friendrequest />
        </Grid>
        <Grid xs={4}>
          <Mygroup />
        </Grid>
        <Grid xs={4}>
          <Blockedusers />
        </Grid>
      </Grid>
    </>
  )
}

export default Home