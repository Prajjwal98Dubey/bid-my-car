import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GET_MY_WATCH_LIST_CARS } from '../api'
import { config } from '../configs/headersConfig'
import Navbar from '../components/Navbar'
import { BLACK_CAR_ICON_IMG } from '../images/image'
import { Link } from 'react-router-dom'

const WatchList = () => {
    const [cars,setCars] = useState([])
    const[isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        const getMyWathchListCars=async()=>{
            const {data} = await axios.get(GET_MY_WATCH_LIST_CARS + '?email=' + JSON.parse(localStorage.getItem('carBidInfo')).email,config)
            setCars(data)
            setIsLoading(false)
        }   
        getMyWathchListCars()
    },[])
  return (
    <>
    {console.log(cars)}
    <div className='font-Roboto'>
        <div><Navbar/></div>
        {isLoading? <div className='text-center'>Loading...</div>:
        cars.length===0 ?<div className='text-center font-semibold font-Roboto'>You have not added any car in the watch list.</div> :<div>
            <div className='flex justify-start m-2 text-2xl font-bold'>{cars.length}</div>
            <div className=' m-2 flex flex-wrap'>
                {cars.map((car)=>(
                    <Link to={"/car?c_id=" + car.carId}><div className='w-fit h-full hover:cursor-pointer hover:bg-gray-300 rounded-lg p-2'>
                        <div className='flex'>
                            <div><img src={car.images} alt="loading" className='w-[250px] h-[170px] rounded-xl p-2 ' /></div>
                            <div className='p-2'>
                                <div className='p-1 font-semibold'>{car.model}</div>
                                <div className='p-1 text-gray-800/85 text-sm'>{car.description}</div>
                                <div className='p-1 text-gray-800/85'>{car.transmission}</div>
                                <div className='text-gray-800/85 flex mb-[2px]'>
                                    <span className='p-1'><img src={BLACK_CAR_ICON_IMG} alt="loading" className='w-[26px] h-[26px]' /></span>
                                    <span className='text-md p-1 mt-[2px]'>{car.seller}</span>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div></Link>
                ))}
            </div>
        </div>
        }
    </div>
    </>
  )
}

export default WatchList