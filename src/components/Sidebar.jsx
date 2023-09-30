import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import { MdOutlineHome } from 'react-icons/md'
import { AiOutlineMessage, AiOutlineLogout } from 'react-icons/ai'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { FiSettings } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux';
import { logedUser } from '../slices/userSlice';

const Sidebar = () => {
    let [url,setUrl] = useState("");
    const userInfo = useSelector((state) => state.loginUser.value)
    const auth = getAuth();
    let navigate = useNavigate();
    let dispatch = useDispatch();
  
    useEffect(() => {
      if (!userInfo) {
        navigate('/login')
      }
    }, [])
    
  
    let handleLogOut = () => {
        signOut(auth).then(() => {
          dispatch(logedUser(null))
          localStorage.removeItem("user")
          navigate('/login')
        })
    }
  return (
    <div className='verticalBar' style={{width: '95%',marginLeft:"2.5%", height: '100vh', background: '#5F35F5', borderRadius:"20px",textAlign:"center",marginTop:"2.5vh",paddingTop:"38px"}}>
        
        {userInfo && userInfo.displayName && <img className='sidebarimg' src={userInfo.photoURL} alt="" />}
        {userInfo && userInfo.displayName && <Heading className='uname' title={userInfo.displayName}/>}
        <ul>
            <li onClick={() => setUrl("home")} className={url=="home"?"active":""}>
            <Link to='/home'><MdOutlineHome /></Link>
            </li>
            <li onClick={() => setUrl("msg")} className={url=="msg"?"active":""}>
            <Link to='/msg'><AiOutlineMessage /></Link>
            </li>
            <li onClick={() => setUrl("notification")} className={url=="notification"?"active":""}>
            <Link to='/notification'><IoIosNotificationsOutline /></Link>
            </li>
            <li onClick={() => setUrl("settings")} className={url=="settings"?"active":""}>
            <Link to='/settings'><FiSettings /></Link>
            </li>
            <li>
            <Link onClick={handleLogOut} to='/msg'><AiOutlineLogout /></Link>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar