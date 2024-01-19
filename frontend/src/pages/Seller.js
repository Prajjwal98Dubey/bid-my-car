import axios from 'axios'
import React, { useState } from 'react'
import { config } from '../configs/headersConfig'
import { app } from '../firebase.js'
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'
import { v4 } from 'uuid'
const storage = getStorage(app)
const ADD_CAR_API = 'http://localhost:5001/api/cars/add-car'
const Seller = () => {
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [mileage, setMileage] = useState("")
    const [engine, setEngine] = useState("")
    const [transmission, setTransmission] = useState("")
    const [exteriorColor, setExteriorColor] = useState("")
    const [interiorColor, setInteriorColor] = useState("")
    const [location, setLocation] = useState("")
    const [distance, setDistance] = useState("")
    const [seller, setSeller] = useState('')
    const [mainImage, setMainImage] = useState("")
    const [sideImage1, setSideImage1] = useState("")
    const [sideImage2, setSideImage2] = useState("")
    const [sideImage3, setSideImage3] = useState("")
    const [description, setDescription] = useState("")
    const [bidPrice, setBidPrice] = useState("")
    const [numberOfBids, setNumberOfBids] = useState("")
    const [basePrice, setBasePrice] = useState("")
    const [time, setTime] = useState("")
    // const[list,setList]=useState([])

    const handleUploadImage = (image) => {
        const imageRef = ref(storage, `images/${seller}/${image.name + v4()}`)
        uploadBytes(imageRef, image).then(() => alert('Image Uploaded Successfully!!!'))
    }
    const handleSubmit = async () => {
        console.log("clicked")
        let imageRef = ref(storage, `images/${seller}/`)
        let list = []
        try {
            const response = await listAll(imageRef);

            // Use Promise.all to wait for all asynchronous operations to complete
            await Promise.all(
                response.items.map(async (item) => {
                    const url = await getDownloadURL(item);
                    list.push(url);
                })
            );
            console.log(typeof (list), list);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
        try {
            const {data} = await axios.post(ADD_CAR_API, {
                make: make,
                model: model,
                mileage: mileage,
                engine: engine,
                transmission: transmission,
                exteriorColor: exteriorColor,
                interiorColor: interiorColor,
                location: location,
                distance: distance,
                seller: seller,
                images: [list[0], list[1], list[2], list[3]],
                description: description,
                bidPrice: bidPrice,
                numberOfBids: numberOfBids,
                basePrice: basePrice,
                time: time
            }, config)
            alert("car added!!!")
            console.log("-----------------------",data)
        }
        catch (err) {
            alert("Something wen wrong")
        }

    }
    return (
        <>
            <div className='flex justify-center text-xl font-bold text-green-500'>Cars</div>
            <div className='flex justify-center'>
                <div>
                    <div>
                        <input className='w-[390px] h-[34px] pl-[4px] text-sm border border-black m-[7px]' placeholder="Toyota" type="text" value={make} onChange={(e) => setMake(e.target.value)} />
                    </div>
                    <div>
                        <input className=' pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="2019 toyota Fortuner" type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                    </div>
                    <div>
                        <input className=' pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="27" type="text" value={mileage} onChange={(e) => setMileage(e.target.value)} />
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="2755" type="text" value={engine} onChange={(e) => setEngine(e.target.value)} />
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="manual or automatice" type="text" value={transmission} onChange={(e) => setTransmission(e.target.value)} />
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="black" type="text" value={exteriorColor} onChange={(e) => setExteriorColor(e.target.value)} />
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="white" type="text" value={interiorColor} onChange={(e) => setInteriorColor(e.target.value)} />
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="40000" type="text" value={distance} onChange={(e) => setDistance(e.target.value)} />
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="sam singh" type="text" value={seller} onChange={(e) => setSeller(e.target.value)} />
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="delhi" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="image" type="file" onChange={(e) => setMainImage(e.target.files[0])} />
                        <span className='ml-[5px]'><button onClick={() => {
                            handleUploadImage(mainImage)
                        }}>upload</button></span>
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="image" type="file" onChange={(e) => setSideImage1(e.target.files[0])} />
                        <span className='ml-[5px]'><button onClick={() => {
                            handleUploadImage(sideImage1)
                        }}>upload</button></span>
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="image" type="file" onChange={(e) => setSideImage2(e.target.files[0])} />
                        <span className='ml-[5px]'><button onClick={() => {
                            handleUploadImage(sideImage2)
                        }}>upload</button></span>
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="image" type="file" onChange={(e) => setSideImage3(e.target.files[0])} />
                        <span className='ml-[5px]'><button onClick={() => {
                            handleUploadImage(sideImage3)
                        }}>upload</button></span>
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="2019 model toyota ......" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="₹20,00,000" type="number" value={bidPrice} onChange={(e) => setBidPrice(e.target.value)} />
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="4" type="number" value={numberOfBids} onChange={(e) => setNumberOfBids(e.target.value)} />
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="₹20,00,000" type="number" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} />
                    </div>
                    <div>
                        <input className='pl-[4px] w-[390px] h-[34px] text-sm border border-black m-[7px]' placeholder="select time" type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>
                    <div className='flex justify-center mb-[25px]'>
                        <button className='bg-blue-600 w-[150px] h-[30px] text-white rounded-lg font-bold ' onClick={() => handleSubmit()}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Seller