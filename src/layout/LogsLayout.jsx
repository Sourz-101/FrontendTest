import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
const Main = () => {
  return (
    <div>
        <div className='flex flex-col'>
            {/* <NavBar/> */}
            <Outlet/>
            {/* <Footer/> */}
        </div>
    </div>
  )
}

export default Main