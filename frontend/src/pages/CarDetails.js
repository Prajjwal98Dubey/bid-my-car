import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ADD_TO_WATCH_LIST, CHECK_CAR_IN_WATCH_LIST, REMOVE_FROM_WATCH_LIST, SINGLE_CAR } from '../api'
import Navbar from '../components/Navbar'
import { CALENDAR_IMG, COMMENTS_IMG, DOWN_ARROW_IMG, HASH_IMG, SHARE_ICON_IMG, STAR_BLACK_ICON_IMG, STAR_ICON_IMG, UP_ARROW, WATCH_IMG } from '../images/image'
import { toast } from 'react-toastify'
import { config } from '../configs/headersConfig'
const CarDetails = () => {
  const [searchParam] = useSearchParams()
  const [car, setCar] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [watchStatus, setWatchStatus] = useState(true)
  useEffect(() => {
    const getCar = async () => {
      const { data } = await axios.get(SINGLE_CAR + searchParam.get("c_id"))
      setCar(data)
      setIsLoading(false)
    }
    getCar()
  }, [searchParam])
  const handleWatchList = async () => {
    const { data } = await axios.post(CHECK_CAR_IN_WATCH_LIST, {
      userEmail: JSON.parse(localStorage.getItem("carBidInfo")).email,
      carId: searchParam.get("c_id")
    }, config)
    if (data.status) {
      await axios.delete(REMOVE_FROM_WATCH_LIST + '?email=' + JSON.parse(localStorage.getItem('carBidInfo')).email + '&carId=' + searchParam.get("c_id"), config)
      toast.error("Car Removed from Watch List", {
        position: 'top-center'
      })
    }
    else {
      await axios.post(ADD_TO_WATCH_LIST, {
        userEmail: JSON.parse(localStorage.getItem("carBidInfo")).email,
        carId: searchParam.get("c_id")
      }, config)
      toast.success('Car Added to Watch List', {
        position: 'top-center'
      })
    }
    // let tmp = watchStatus ? await axios.post(ADD_TO_WATCH_LIST,{
    //   userEmail:JSON.parse(localStorage.getItem("carBidInfo")).email,
    //   carId:searchParam.get("c_id")
    // },config) : await axios.delete(REMOVE_FROM_WATCH_LIST + '?email=' + JSON.parse(localStorage.getItem('carBidInfo')).email + '&carId=' + searchParam.get("c_id"),config)
    // watchStatus ? toast.success("Car added ",{position:'top-center'}) : toast.error("car removed",{position:'top-center'})
  }
  return (
    <>
      <div className=' z-10 sticky top-0'>
        <Navbar />
      </div>
      {isLoading ? <div className='text-center mt-10'>Loading..</div> :
        <div className='mt-[15px] w-full h-full font-Roboto'>
          <div className='flex w-[1220px] h-full justify-between'>
            <div className='m-4'>
              <div className='font-bold text-2xl'>{car.requiredCar.make} <span>{car.requiredCar.description}</span></div>
              <div className='font-semibold text-md text-gray-600'>~{car.requiredCar.distance} KM, #<span>{car.requiredCar.numberplate}, <span>{car.requiredCar.engine} engine, </span></span><span> {car.requiredCar.transmission} transmission, </span><span>{car.requiredCar.exteriorColor}</span></div>
            </div>
            <div className='flex pt-[20px]'>
              <button className='w-[97px] h-[40px] bg-gray-200 hover:bg-gray-300 flex justify-center items-center cursor-pointer rounded-lg font-semibold m-1' onClick={() => {
                setWatchStatus(!watchStatus)
                handleWatchList()
              }}><span className='m-1'><img src={STAR_BLACK_ICON_IMG} alt="loading" className='w-[15px] h-[15px]' /></span>
                <span className='m-1'>Watch</span>
              </button>
              <button className='w-[97px] h-[40px] bg-gray-200 hover:bg-gray-300 flex justify-center items-center cursor-pointer rounded-lg font-semibold m-1'><span className='m-1'><img src={SHARE_ICON_IMG} alt="loading" className='w-[15px] h-[15px]' /></span>
                <span className='m-1'>Share</span>
              </button>
            </div>
            {/* <div className='m-4 w-[300px] flex justify-evenly items-center '>
                 <div><button className='w-[97px] h-[40px] bg-gray-200 rounded-lg hover:bg-gray-300'> <span><img src={WATCH_IMG} alt="loading" className='w-[15px] h-[15px]' /></span> Watch</button></div>
                 <div><button className='w-[97px] h-[40px] bg-gray-200 rounded-lg hover:bg-gray-300'>Share</button></div>
              </div> */}
          </div>
          <div className='m-4 flex'>
            <div>
              <img src={car.requiredCar.images[0]} alt="loading" className='w-[954px] h-[445px] rounded-lg' />
            </div>
            <div className='ml-[6px]'>
              {car.requiredCar.images.filter((c, index) => index !== 0).map((c) => (
                <div className="m-2">
                  <img src={c} alt="laoding" className='w-[250px] h-[140px] rounded-lg' />
                </div>
              ))}
            </div>
          </div>
          <div className='m-4 flex w-[850px] h-[70px] p-4 z-10 sticky top-[60px] bg-white/90'>
            <div className='w-[740px] bg-black/85 h-[40px] flex justify-around text-white items-center rounded-lg'>
              <div className='flex'><img src={WATCH_IMG} alt="loading" className='w-[14px] h-[18px] m-1 ' /><div className='text-gray-400  m-[1px]'>Time Left<span className="text-white font-semibold"> 2 Days</span></div></div>
              <div className='flex '><img src={UP_ARROW} alt="loading" className='w-[20px] h-[20px] m-1' /><div className='text-gray-400 mt-[3px]'>High Bid <span className="text-white font-semibold">₹{car.requiredCar.bidPrice.toLocaleString()}</span></div></div>
              <div className='flex '><img src={HASH_IMG} alt="loading" className='w-[20px] h-[20px] m-1' /><div className=' text-gray-400 mt-[3px]'>Bids <span className="text-white font-semibold">{car.requiredCar.numberOfBids}</span></div></div>
              <div className='flex '><img src={COMMENTS_IMG} alt="loading" className='w-[20px] h-[20px] m-1' /><div className=' text-gray-400 mt-[3px]'>Comments</div></div>
            </div>
            <div className=''>
              <button className='w-[132px] h-[40px] rounded-lg bg-green-500/85 flex justify-center items-center text-black text-[16px] font-semibold ml-[10px] hover:bg-green-700/85'>Place Bid</button>
            </div>
          </div>
          <div className='m-2 ml-[28px]'>
            <table className='border border-collapse'>
              <tr>
                <td className='w-[166px] h-[42px] border border-collapse text-center bg-gray-300/50 font-semibold'>Make</td>
                <td className='w-[270px] h-[42px] border border-collapse text-center'>{car.requiredCar.make}</td>
                <td className='w-[166px] h-[42px] border border-collapse text-center bg-gray-300/50 font-semibold'>Engine</td>
                <td className='w-[270px] h-[42px] border border-collapse text-center'>{car.requiredCar.engine} cc</td>
              </tr>
              <tr>
                <td className='w-[166px] h-[42px] border border-collapse text-center bg-gray-300/50 font-semibold'>Model</td>
                <td className='w-[270px] h-[42px] border border-collapse text-center'>{car.requiredCar.model}</td>
                <td className='w-[166px] h-[42px] border border-collapse text-center bg-gray-300/50 font-semibold'>VIN</td>
                <td className='w-[270px] h-[42px] border border-collapse text-center'>{car.requiredCar.numberplate}</td>
              </tr>
              <tr>
                <td className='w-[166px] h-[42px] border border-collapse text-center bg-gray-300/50 font-semibold'>Mileage</td>
                <td className='w-[270px] h-[42px] border border-collapse text-center'>{car.requiredCar.mileage}</td>
                <td className='w-[166px] h-[42px] border border-collapse text-center bg-gray-300/50 font-semibold'>Transmission</td>
                <td className='w-[270px] h-[42px] border border-collapse text-center'>{car.requiredCar.transmission}</td>
              </tr>
              <tr>
                <td className='w-[166px] h-[42px] border border-collapse text-center bg-gray-300/50 font-semibold'>Exterior Color</td>
                <td className='w-[270px] h-[42px] border border-collapse text-center'>{car.requiredCar.exteriorColor}</td>
                <td className='w-[166px] h-[42px] border border-collapse text-center bg-gray-300/50 font-semibold'>Interior Color</td>
                <td className='w-[270px] h-[42px] border border-collapse text-center'>{car.requiredCar.interiorColor}</td>
              </tr>
              <tr>
                <td className='w-[166px] h-[42px] border border-collapse text-center bg-gray-300/50 font-semibold'>Distance</td>
                <td className='w-[270px] h-[42px] border border-collapse text-center'>~{car.requiredCar.distance} KM</td>
                <td className='w-[166px] h-[42px] border border-collapse text-center bg-gray-300/50 font-semibold'>Base Price</td>
                <td className='w-[270px] h-[42px] border border-collapse text-center'>₹{car.requiredCar.basePrice.toLocaleString()}</td>
              </tr>
              <tr>
                <td className='w-[166px] h-[42px] border border-collapse text-center bg-gray-300/50 font-semibold'>Location</td>
                <td className='w-[270px] h-[42px] border border-collapse text-center'>{car.requiredCar.location}</td>
                <td className='w-[166px] h-[42px] border border-collapse text-center bg-gray-300/50 font-semibold'>Seller</td>
                <td className='w-[270px] h-[42px] border border-collapse text-center text-sm'>{car.requiredCar.seller}</td>
              </tr>
            </table>
          </div>
          <div className='m-2 ml-[28px] mt-[20px] font-Dosis'>
            <div className='m-4 w-[850px] border border-collapse flex'>
              <div className='w-1/2'>
                <div className='font-semibold m-2'>Current Bid</div>
                <div className='m-2 font-extrabold text-5xl'>₹{(car.requiredCar.bidPrice).toLocaleString()}</div>
              </div>
              <div className='w-1/2 mt-3'>
                <div>Seller <span className='ml-[15px] text-gray-800'>{car.requiredCar.seller}</span></div>
                <div className='flex'>Ending <span><img src={CALENDAR_IMG} alt="loading" className='w-[20px] h-[20px] ml-[10px]' /></span><span className='ml-[7px] text-gray-800'>{car.requiredCar.time}</span></div>
                <div className='flex'>Bids <span><img src={HASH_IMG} alt="loading" className='w-[20px] h-[20px] ml-[28px]' /></span><span className='ml-[7px] text-gray-800'>{car.requiredCar.numberOfBids}</span></div>
              </div>
            </div>
          </div>
          <div className='ml-[47px]'>
            <div className='text-2xl font-bold m-6 '>Comments & Bids</div>
            <div className=''><input type="text" className='relative w-[898px] h-[47px]  ml-6 border border-gray-400 pl-[10px] mb-[24px] text-md ' placeholder="Add a Comment..." />
            </div>
          </div>
          <div className='text-center font-light text-2xl'>
            COMMENTS
          </div>
        </div>

      }
    </>
  )
}

export default CarDetails