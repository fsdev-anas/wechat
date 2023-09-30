import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import Button from '@mui/material/Button';
import Images from './Images'
import GroupImg from '../assets/GroupImg.png'
import Paragraph from './Paragraph';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';

const Friendrequest = () => {
  const dispatch = useDispatch();
  const db = getDatabase();
  let [requestList,setRequestList] = useState([]);
  const userInfo = useSelector((state) => state.loginUser.value)

  useEffect(() => {
    const requestRef = ref(db, 'friendrequest');
    onValue(requestRef, (snapshot) => {
    let arr = [];
    snapshot.forEach((item) => {
      if (item.val().whoreceiveuid == userInfo.uid) {
        arr.push({...item.val(),userID:item.key})
      }
    })
    setRequestList(arr)
  });
},[])

let handleDelete = (item) => {
  remove(ref(db, 'friendrequest/' + item.userID))
}


  return (
    <div className='box'>
        <Heading title='Friend Request' />
        {
            requestList.map((item,index) => (
                <div className='list' key={index} >
                    <Images className='groupimg' src={GroupImg} />
                    <Paragraph className='uname' title={item.whosendname} />
                    <Button variant="contained">Accept</Button>
                    <Button onClick={() => handleDelete(item)} variant="contained" color='error'>Delete</Button>
                </div>
            ))
        }
    </div>
  )
}

export default Friendrequest