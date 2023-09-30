import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import Button from '@mui/material/Button';
import Images from './Images'
import GroupImg from '../assets/GroupImg.png'
import Paragraph from './Paragraph';
import { getDatabase, ref, set, onValue, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const Userlist = () => {
    const db = getDatabase();
    const [usersList,setUsersList] = useState([]);
    const userInfo = useSelector((state) => state.loginUser.value)
    const [reqID,setReqID] = useState([]);

    useEffect(() => {
      const userRef = ref(db, 'users/');
      onValue(userRef, (snapshot) => {
          let arr = [];
          snapshot.forEach((item) => {
            if (userInfo.uid != item.key) {
              arr.push({...item.val(),userID:item.key})
            }
          })
          setUsersList(arr)
      });
    },[])

    let handleButton = (item) => {
      set(ref(db, 'friendrequest/' + item.userID), {
        whosendname: userInfo.displayName,
        whosenduid: userInfo.uid,
        whoreceivename: item.username,
        whoreceiveuid: item.userID
      });
    }

    useEffect(() => {
      const requestRef = ref(db, 'friendrequest');
      onValue(requestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
          arr.push(item.val().whoreceiveuid+item.val().whosenduid)
      })
      setReqID(arr)
    });
  },[])
  
  
  let handleCancel = (item,index) => {
    remove(ref(db, 'friendrequest/' + item.userID))
  }
  

  return (
    <div className='box'>
        <Heading title='Userlist' />
          {
            usersList.map((item,index)=> (
              <div className='list' key={index} >
                <Images className='groupimg' src={GroupImg} />
                <Paragraph className='uname' title={item.username} />
                <Paragraph className='uname' title={index} />
                {/* <Paragraph className='uname' title={item.userID} /> */}
                {reqID.includes(item.userID+userInfo.uid)?
                <>
                <Button variant="contained" disabled>Sent</Button>
                <Button onClick={() => handleCancel(item,index)} variant="contained" color='error'>Cancel</Button>
                </>
                :
                <Button onClick={() => handleButton(item)} variant="contained">Add</Button>
              }
              </div>
            ))
          }
    </div>
  )
}

export default Userlist