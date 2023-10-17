import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import Button from '@mui/material/Button';
import Images from './Images'
import GroupImg from '../assets/groupimg.png'
import Paragraph from './Paragraph';
import { getDatabase, set, ref, onValue, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Blockedusers = () => {
  const [open, setOpen] = useState(false);
  const db = getDatabase();
  let [blockList,setBlockList] = useState([]);
  const userInfo = useSelector((state) => state.loginUser.value)

  useEffect(() => {
    const requestRef = ref(db, 'block');
        onValue(requestRef, (snapshot) => {
        let arr = [];
            snapshot.forEach((item) => {
                if (item.val().blockId != userInfo.uid) {
                    arr.push({...item.val(),userID:item.key})
                }
            })
        setBlockList(arr)
        });
    },[])

    let handleUnblock = (item) => {
      remove(ref(db, 'block/'+item.userID)).then(() => {
        set(ref(db, 'frnds/' + item.userID), {
            whosendId: item.blockById,
            whosendName: item.blockByName,
            whosendPic: item.blockByPic,
            whoreceiveId: item.blockId,
            whoreceiveName: item.blockName,
            whoreceivePic: item.blockPic
          });
      })
      setOpen(false)
    }

    let handleUnblockUnfriend = (item) => {
      remove(ref(db, 'block/'+item.userID))
      setOpen(false)
    }
    
    
    
  return (
    <div className='box'>
        <Heading title='Blocked Users' />
        {
            blockList.map((item) => (
                <div className='list'>
                    <Images className='groupimg' src={item.blockPic} />
                    <Paragraph className='uname' title={item.blockName} />
                    <Button onClick={() => setOpen(true)} color='error'>Unblock</Button>
                    <Modal open={open}>
                        <Box sx={style}>
                        <Heading title='Unblock Only!' />
                        <Button onClick={() => handleUnblock(item)} variant="contained">Remain Friend</Button><br /><br />
                        <Heading title='Unblock and Unfriend!' />
                        <Button onClick={() => handleUnblockUnfriend(item)} variant="contained" color='error'>Unfriend</Button><br /><br />
                        <Button onClick={() => setOpen(false)} color='success'>Cancel</Button>
                        </Box>
                    </Modal>
                </div>
            ))
        }
    </div>
  )
}

export default Blockedusers