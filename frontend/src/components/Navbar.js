import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className='flex bg-green-500 w-full h-[56px] justify-between'>
        <div className='font-Roboto  text-white ml-[10px] flex items-center text-2xl font-bold '>Car Bid</div>
         {!localStorage.getItem("carBidInfo") ? <Link to ="/login"><div className='mt-[5px] flex justify-end items-center mr-[10px]'>
          <button className='w-[150px] h-[40px] bg-blue-700 hover:bg-blue-500 rounded-lg text-white font-bold cur'>Login</button>
        </div></Link> : <Link to="/my-profile"><img src={JSON.parse(localStorage.getItem("carBidInfo")).pic} className=' w-[45px] h-[45px] rounded-full mt-[3px] mr-[15px]' alt="loading" /></Link>}
    </div>
    </>
  )
}

export default Navbar