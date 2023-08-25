import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button';
import Heading from '../components/Heading';
import Para from '../components/Para';
import TypingAnimation from '../components/TypingAnimation'
import { Link } from 'react-router-dom';

const FirstPage = () => {

  const textObjects = [
    { title: "Give Me Idea", text: "For what to do with a customer" },
    { title: "Take your Note", text: "For better understanding when.." },
    { title: "Create account", text: "For discover new friends and follower" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textObjects.length);
    }, 4000); // Change text every 4 seconds

    return () => clearInterval(interval);
  }, [textObjects.length]);

  
  return (
    <div className='firstpage'>
        <div className="left">
            <Heading title='ChatBard' className='firstHeading' />
            <TypingAnimation texts={textObjects} currentIndex={currentIndex} />
        </div>
        <div className="right">
        <Heading className='firstHeading' title='Get started' />
        <Link to='/login'><Button className='Button1' variant="contained">Log In</Button></Link>
        <Link to='/registration'><Button className='Button2' variant="contained">Sign Up</Button></Link>
        </div>
    </div>
  )
}

export default FirstPage