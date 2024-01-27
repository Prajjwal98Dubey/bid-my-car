import React from 'react'
import Navbar from '../components/Navbar'
import { CAR_ICON_IMG, LOGOUT_ICON_IMG, STAR_ICON_IMG, USER_ICON_IMG } from '../images/image'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
    const navigate = useNavigate()
    const handleUserLogout=()=>{
        localStorage.removeItem("carBidInfo")
        navigate('/')
        return
    }
  return (
    <div className='font-Roboto'>
    <div className='z-10 sticky top-0'><Navbar/></div>
    <div className='flex justify-center m-10 font-extrabold text-4xl'>Hi.</div>
    <div className='flex justify-center mt-[3px] font-bold text-2xl text-blue-400'>{JSON.parse(localStorage.getItem("carBidInfo"))} <span onClick={()=>handleUserLogout()}><img className=' w-[30px] h-[30px] flex justify-center items-center cursor-pointer ml-[5px]' src={LOGOUT_ICON_IMG} alt="loading" /></span></div>
    <div className='flex justify-around m-5'>
        <div className='bg-gray-800/85 w-[300px] h-[160px] text-white flex justify-center items-center text-2xl font-semibold rounded-lg shadow-xl cursor-pointer hover:bg-gray-800/75'>
           <img src={CAR_ICON_IMG} alt="loading" className='w-[45px] h-[45px] mr-[4px] mb-[5px]' /> Become a Seller
        </div>
        <div  className='bg-gray-800/85 w-[300px] h-[160px] text-white flex justify-center items-center text-2xl font-semibold rounded-lg shadow-xl cursor-pointer hover:bg-gray-800/75'>
        <img src={USER_ICON_IMG} alt="loading" className='w-[45px] h-[45px] mr-[4px] mb-[5px]' />  Edit Profile
        </div>
        <div  className='bg-gray-800/85 w-[300px] h-[160px] text-white flex justify-center items-center text-2xl font-semibold rounded-lg shadow-xl cursor-pointer hover:bg-gray-800/75'>
        <img src={STAR_ICON_IMG} alt="loading" className='w-[45px] h-[45px] mr-[4px] mb-[5px]' />  Watch List
        </div>
    </div>
    </div>
  )
}

export default MyProfile