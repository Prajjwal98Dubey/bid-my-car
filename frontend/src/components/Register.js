import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import LoginWithGoogle from './LoginWithGoogle'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CREATE_USER_API } from '../api'
import { config } from '../configs/headersConfig'

const auth = getAuth(app)
const provider = new GoogleAuthProvider(app)
const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const[name,setName] = useState("")
    const navigate = useNavigate()
    const handleRegisterUser = async() => {
        if (!email || !password) {
            alert('Enter all fields')
            return
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                const user = userCredential.user;
                console.log(user)
                localStorage.setItem("carBidInfo",JSON.stringify(email))
                await axios.post(CREATE_USER_API,{
                        name,email,password
                },config)
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            });
        console.log("Clicked")
    }
    const handelGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                //   const credential = GoogleAuthProvider.credentialFromResult(result);
                //   const token = credential.accessToken;
                const user = result.user;
                console.log(user)
                localStorage.setItem("carBidInfo",JSON.stringify(user.email))
                navigate('/')
            }).catch((error) => {
                console.log(error)
            });
    }
    return (
        <>
            <div className='flex justify-center'>
                <div>
                <div className='m-6 p-2'><input type="text" className='w-[300px] h-[30px] border border-gray-500 pl-[10px] text-xl' value={name} onChange={(e) => setName(e.target.value)} placeholder='name' /></div>
                    
                    <div className='m-6 p-2'><input type="text" className='w-[300px] h-[30px] border border-gray-500 pl-[10px] text-xl' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' /></div>
                    <div className='m-6 p-2'><input type="text" className='w-[300px] h-[30px] border border-gray-500 pl-[10px] text-xl' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                    <div className='flex justify-center'>
                        <div className='w-[140px] h-[40px] bg-blue-500 hover:bg-blue-600 cursor-pointer mt-[10px] flex justify-center items-center font-bold text-white rounded-lg ' onClick={() => handleRegisterUser()}>Register</div></div>
                    <div onClick={()=>handelGoogleSignIn()}><LoginWithGoogle/></div>
                </div>

            </div>
        </>
    )
}

export default Register