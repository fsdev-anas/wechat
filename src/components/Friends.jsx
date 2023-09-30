import React from 'react'
import Heading from './Heading'
import Button from '@mui/material/Button';
import Images from './Images'
import GroupImg from '../assets/groupimg.png'
import Paragraph from './Paragraph';

const Friends = () => {

  return (
    <div className='box'>
        <Heading title='Friends' />
        <div className='list'>
            <Images className='groupimg' src={GroupImg} />
            <Paragraph className='uname' title='Friends Reunion' />
            <Button variant="contained">Join</Button>
        </div>
    </div>
  )
}

export default Friends