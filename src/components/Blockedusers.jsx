import React from 'react'
import Heading from './Heading'
import Button from '@mui/material/Button';
import Images from './Images'
import GroupImg from '../assets/GroupImg.png'
import Paragraph from './Paragraph';

const Blockedusers = () => {

  return (
    <div className='box'>
        <Heading title='Blocked Users' />
        <div className='list'>
            <Images className='groupimg' src={GroupImg} />
            <Paragraph className='uname' title='Friends Reunion' />
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <Images className='groupimg' src={GroupImg} />
            <Paragraph className='uname' title='Friends Reunion' />
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <Images className='groupimg' src={GroupImg} />
            <Paragraph className='uname' title='Friends Reunion' />
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <Images className='groupimg' src={GroupImg} />
            <Paragraph className='uname' title='Friends Reunion' />
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <Images className='groupimg' src={GroupImg} />
            <Paragraph className='uname' title='Friends Reunion' />
            <Button variant="contained">Join</Button>
        </div>
    </div>
  )
}

export default Blockedusers