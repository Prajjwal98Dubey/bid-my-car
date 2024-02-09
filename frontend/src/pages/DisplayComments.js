import React from 'react'

const DisplayComments = ({ comm }) => {
    return (

        <div className='text-sm font-Roboto m-1 ml-[25px] p-2 align-baseline'>
            <div className='flex justify-evenly w-[250px] m-1'>
                <div>
                    <img src={comm.userPhoto} alt="loading" className='w-[30px] h-[30px] rounded-full' />
                </div>
                <div className='font-semibold text-md'>
                    {comm.userName}
                </div>
                {comm.bid.length === 0 ? <div></div> : <div className='p-2 text-md font-bold bg-purple-600 text-white flex justify-center items-center w-[100px] h-[26px] rounded-lg'>
                    ₹{parseInt(comm.bid).toLocaleString()}
                </div>}
            </div>
            {comm.desc !== "" ? <div className='flex justify-start ml-[45px]'>{comm.desc}</div> : null}
        </div>
    )
}

export default DisplayComments