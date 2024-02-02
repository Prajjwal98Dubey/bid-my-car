import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GET_MY_WATCH_LIST_CARS } from '../api'
import { config } from '../configs/headersConfig'

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
    <div>
        {isLoading? <div className='text-center'>Loading...</div>:<div>Loaded</div>}
    </div>
    </>
  )
}

export default WatchList