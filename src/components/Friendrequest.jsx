import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import Button from '@mui/material/Button';
import Images from './Images'
import GroupImg from '../assets/groupimg.png'
import Paragraph from './Paragraph';
import { getDatabase, set, ref, onValue, remove, push } from "firebase/database";
import { useSelector } from 'react-redux';

const Friendrequest = () => {
  const db = getDatabase();
  let [requestList,setRequestList] = useState([]);
  const userInfo = useSelector((state) => state.loginUser.value)

  useEffect(() => {
    const requestRef = ref(db, 'frndReq');
    onValue(requestRef, (snapshot) => {
    let arr = [];
    snapshot.forEach((item) => {
      if (item.val().whoreceiveId == userInfo.uid) {
        arr.push({...item.val(),userID:item.key})
      }
    })
    setRequestList(arr)
  });
},[])

let handleDelete = (item) => {
  remove(ref(db, 'frndReq/' + item.userID))
}

let handleAccept = (item) => {
  set(push(ref(db, 'frnds')), {
    ...item
  }).then(() => {
    remove(ref(db, 'frndReq/' + item.userID))
  })
}




  return (
    <div className='box'>
        <Heading title='Friend Request' />
        {
            requestList.map((item,index) => (
                <div className='list' key={index} >
                    <Images className='groupimg' src={GroupImg} />
                    <Paragraph className='uname' title={item.whosendName} />
                    <Button onClick={() => handleAccept(item)} variant="contained">Accept</Button>
                    <Button onClick={() => handleDelete(item)} variant="contained" color='error'>Delete</Button>
                </div>
            ))
        }
    </div>
  )
}

export default Friendrequest