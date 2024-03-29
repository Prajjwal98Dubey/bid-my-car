import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../configs/headersConfig'
import { useContext } from 'react'
import { carContext } from '../contexts/carContext'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { findDiffDate } from '../helper/timeDifference'
import { WATCH_IMG } from '../images/image'
const GET_ALL_CARS = 'http://localhost:5001/api/cars/get-cars'
const Main = () => {
    const [cars, setCars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const carContextState = useContext(carContext)
    useEffect(() => {
        const getAllCars = async () => {
            const { data } = await axios.get(GET_ALL_CARS, config)
            setCars(data)
            carContextState.setItems(data)
            setIsLoading(false)
        }
        getAllCars()
    }, [])
    return (
        <>
        {console.log(carContextState)}
        <Navbar/>
            {isLoading ? <div>Loading...</div> :
                <div className='pl-[50px]'>
                <div className='flex flex-wrap font-Roboto'>
                    {cars.map((car) => (
                        <div key={car._id} className='font-Roboto'>
                        <Link  to={"/car?c_id="+car._id}>
                        <div className='flex justify-center hover:cursor-pointer hover:opacity-90'>
                        <div className='w-[313px] h-[356px] m-[10px] relative'>
                            <div className=''>
                                <img className="w-[313px] h-[205px] rounded-md "src={car.images[0]} alt="loading" />
                                <span className=' absolute left-[7px] top-[165px] bg-gray-800/85 w-fit h-fit text-white rounded-md flex justify-around p-[3px]'>
                                    <div className='flex m-[2px] p-[2px]'>
                                    <span><img src={WATCH_IMG} alt="loading" className='w-[15px] h-[15px] m-[2px]' /></span>
                                    <span className='text-[13px] font-semibold pl-1'>{findDiffDate(car.time,Date()) ?findDiffDate(car.time,Date()) :<div className='font-bold'>Sold</div> }</span>
                                    </div>
                                    <span className='text-[13px] font-semibold text-sm m-[2px] p-[2px]'>
                                        <span className='text-gray-300'>Bid </span><span>₹{car.bidPrice.toLocaleString()}</span>
                                    </span>
                                </span>
                            </div>
                            
                            <div className='text-[18px] font-semibold'>
                                {car.model}
                            </div>
                            <div className='text-sm font-light text-gray-600'>
                                {car.make}
                            </div>
                            <div className='text-[14px] font-light'>
                                {car.description.trimEnd()},
                                <span>{car.engine}</span> cc engine with <span>{car.transmission}</span> as transmission.
                            </div>
                            <div className='text-[12px] font-extralight text-gray-600'>
                                {car.location}, IN
                            </div>

                        </div>
                        </div>
                        </Link>
                        </div>
                    ))}
                </div>
                </div>
            }
        </>
    )
}

export default Main