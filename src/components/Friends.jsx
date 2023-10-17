import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import Button from '@mui/material/Button';
import Images from './Images'
import GroupImg from '../assets/groupimg.png'
import { getDatabase, ref, set, onValue, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Paragraph from './Paragraph';

const Friends = () => {
    const db = getDatabase();
    const [frndList, setFrndList] = useState([]);
    const userInfo = useSelector((state) => state.loginUser.value)

    useEffect(() => {
      const userRef = ref(db, 'frnds');
      onValue(userRef, (snapshot) => {
          let arr = [];
          snapshot.forEach((item) => {
            if (userInfo.uid == item.val().whosendId || userInfo.uid == item.val().whoreceiveId) {
              arr.push({...item.val(),userID:item.key})
            }
          })
          setFrndList(arr)
      });
    },[])

    let handleBlock = (item) => {
      if (userInfo.uid == item.whosendId) {
        set(ref(db, 'block/' + item.userID), {
          blockId: item.whoreceiveId,
          blockName: item.whoreceiveName,
          blockPic: item.whoreceivePic,

          blockById: item.whosendId,
          blockByName: item.whosendName,
          blockByPic: item.whosendPic
        }).then(() => {
          remove(ref(db, 'frnds/' + item.userID))
        });
      }else{
        set(ref(db, 'block/' + item.userID), {
          blockId: item.whosendId,
          blockName: item.whosendName,
          blockPic: item.whosendPic,
          
          blockById: item.whoreceiveId,
          blockByName: item.whoreceiveName,
          blockByPic: item.whoreceivePic,
        }).then(() => {
          remove(ref(db, 'frnds/' + item.userID))
        });
      }
    }
    

  return (
    <div className='box'>
        <Heading title='Friends' />
        {
          frndList.map((item, index) => (
            <div className='list' key={index}>
              <Images className='groupimg' src={userInfo.uid==item.whoreceiveId?item.whosendPic:item.whoreceivePic} />
              <Paragraph className='uname' title={userInfo.uid==item.whosendId?item.whoreceiveName:item.whosendName} />
              <Button onClick={() => handleBlock(item)} variant="contained" color='error'>Block</Button>
            </div>
          ))
        }
    </div>
  )
}

export default Friends