import React from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
} from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import { ToastContainer, toast } from 'react-toastify';
import Forgotpassword from './pages/Forgotpassword'
import Messenger from './pages/Messenger'
import Notification from './pages/Notification'
import RootLayout from './pages/RootLayout'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<Registration />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgotpassword' element={<Forgotpassword />} />
      <Route path='/' element={<RootLayout />}>
        <Route path='/home' element={<Home />} />
        <Route path='/msg' element={<Messenger />} />
        <Route path='/notification' element={<Notification />} />
      </Route>
    </Route>
  ))

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
