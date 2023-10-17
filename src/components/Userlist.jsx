import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import Button from '@mui/material/Button';
import Images from './Images'
import Paragraph from './Paragraph';
import { getDatabase, ref, set, onValue, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const Userlist = () => {
    const db = getDatabase();
    const [usersList,setUsersList] = useState([]);
    const userInfo = useSelector((state) => state.loginUser.value)
    const [reqID,setReqID] = useState([]);
    const [bID,setBID] = useState([]);
    const [fID,setFID] = useState([]);
    const [userBID,setUserBID] = useState([]);
    const [mirrorID,setMirrorID] = useState([]);
    const [mirrorID2,setMirrorID2] = useState([]);

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
      set(push(ref(db, 'frndReq')), {
        whosendId: userInfo.uid,
        whosendName: userInfo.displayName,
        whosendPic: userInfo.photoURL,
        whoreceiveId: item.userID,
        whoreceiveName: item.username,
        whoreceivePic: item.profile_picture
      });
    }

    useEffect(() => {
      const requestRef = ref(db, 'frndReq');
        onValue(requestRef, (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {
            arr.push(item.val().whoreceiveId+item.val().whosendId)
        })
        setReqID(arr)
      });
    },[])


    // Request problem solved.. Alhamdulillah
    let handleCancel = (item) => {
      const reqRef = ref(db, 'frndReq');
      let ID = ''
      onValue(reqRef, (snapshot) => {
        snapshot.forEach((reqitem) => {
          const request = reqitem.val();
          if (request.whoreceiveId === item.userID && 
            request.whosendId === userInfo.uid) {
              ID = reqitem.key
            }
          })
        });
        remove(ref(db, 'frndReq/' + ID))
    }

  // UserList F button
  useEffect(() => {
    const requestRef = ref(db, 'frnds');
    onValue(requestRef, (snapshot) => {
    let arr = [];
    snapshot.forEach((item) => {
      // if (item.val().blockById == userInfo.uid) {
        
        arr.push(item.val().whosendId+item.val().whoreceiveId)
      // }
    })
    setFID(arr)
  });
},[])
  // UserList Blocked button
useEffect(() => {
  const reqRef = ref(db, 'block');
  onValue(reqRef, (snapshot) => {
  let arr = [];
  snapshot.forEach((item) => {
    if (item.val().blockById == userInfo.uid) {
      
      arr.push(item.val().blockId+item.val().blockById)
    }
  })
  setBID(arr)
  });
},[])

useEffect(() => {
  const userBIDRef = ref(db, 'block');
  onValue(userBIDRef, (snapshot) => {
  let arr = [];
  snapshot.forEach((item) => {
      
      arr.push(item.val().blockById)
  })
  setUserBID(arr)
  });
},[])

useEffect(() => {
  const userBIDRef = ref(db, 'frndReq');
  onValue(userBIDRef, (snapshot) => {
  let arr = [];
  snapshot.forEach((item) => {
      arr.push(item.val().whosendId)
  })
  setMirrorID(arr)
  });
},[])
useEffect(() => {
  const userBIDRef = ref(db, 'frndReq');
  onValue(userBIDRef, (snapshot) => {
  let arr = [];
  snapshot.forEach((item) => {
      arr.push(item.val().whoreceiveId)
  })
  setMirrorID2(arr)
  });
},[])

let handleAccept = (item) => {
  set(push(ref(db, 'frnds')), {
    whosendId: item.userID,
    whosendName: item.username,
    whosendPic: item.profile_picture,
    whoreceiveId: userInfo.uid,
    whoreceiveName: userInfo.displayName,
    whoreceivePic: userInfo.photoURL
  }).then(() => {
    const reqRef = ref(db, 'frndReq');
      let ID = ''
      onValue(reqRef, (snapshot) => {
        snapshot.forEach((reqitem) => {
          const request = reqitem.val();
          if (request.whosendId == item.userID && request.whoreceiveId == userInfo.uid) {
              ID = reqitem.key
            }
          })
        });
        remove(ref(db, 'frndReq/' + ID))
  })
}
  

return (
  <div className='box'>
    <Heading title='Userlist' />
    {
      usersList.map((item, index) => {
        if (!userBID.includes(item.userID)) {
          return (
            <div className='list' key={index}>
              <Images className='groupimg' src={item.profile_picture} />
              <Paragraph className='uname' title={item.username} />
              <Paragraph className='uname' title={index} />
              {/* <Paragraph className='uname' title={item.userID} /> */}
              {reqID.includes(item.userID + userInfo.uid) ?
                <>
                  <Button variant="contained" disabled>Sent</Button>
                  <Button onClick={() => handleCancel(item)} variant="contained" color='error'>Cancel</Button>
                </>
                :mirrorID.includes(item.userID) && mirrorID2.includes(userInfo.uid)?
                <>
                  <Button variant="contained" onClick={() => handleAccept(item)} >Accept</Button>
                  <Button onClick={() => handleCancel(item)} variant="contained" color='error'>Delete</Button>
                </>
                : fID.includes(item.userID + userInfo.uid) || fID.includes(userInfo.uid + item.userID) ?
                  <Button onClick={() => handleButton(item)} variant="contained" color='success'>F</Button>
                : bID.includes(item.userID + userInfo.uid) || bID.includes(userInfo.uid + item.userID) ?
                  <Button onClick={() => handleButton(item)} variant="contained" disabled>Blocked</Button>
                :
                  <Button onClick={() => handleButton(item)} variant="contained">Add</Button>
              }
            </div>
          );
        }
        // return null; // Skip rendering if userBID doesn't include item.key
      })
    }
  </div>
);

}

export default Userlist