import React from 'react'
import { Outlet } from 'react-router-dom'
import FirstPage from './FirstPage'

const RootLayout = () => {
  return (
    <>
        <Outlet />
    </>
  )
}

export default RootLayout