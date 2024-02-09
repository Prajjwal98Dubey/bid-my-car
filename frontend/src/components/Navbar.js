import React from 'react'
import { Link } from 'react-router-dom'
import { SEARCH_ICON_IMG } from '../images/image'

const Navbar = () => {
  return (
    <>
    <div className='flex bg-green-500 w-full h-[56px] justify-between'>
        <Link to="/" className='w-[120px] h-[56px] flex justify-center items-center'><div className='font-Roboto text-white text-2xl font-bold '>Car Bid</div></Link>
        <div className='relative flex justify-center items-center'>
          <input type="text" placeholder='Search for cars (ex. BMW, Toyota)' className='w-[490px] h-[42px] rounded-lg bg-[#EEEEF0] p-[15px] pl-[43px] ' />
          <img className='w-[15px] h-[15px] absolute  left-3' src={SEARCH_ICON_IMG} alt="loading" />
        </div>
         {!localStorage.getItem("carBidInfo") ? <Link to ="/login"><div className='mt-[5px] flex justify-end items-center mr-[10px]'>
          <button className='w-[150px] h-[40px] bg-blue-700 hover:bg-blue-500 rounded-lg text-white font-bold cur'>Login</button>
        </div></Link> : <Link to="/my-profile"><img src={JSON.parse(localStorage.getItem("carBidInfo")).pic} className=' w-[45px] h-[45px] rounded-full mt-[3px] mr-[15px]' alt="loading" /></Link>}
    </div>
    </>
  )
}

export default Navbar