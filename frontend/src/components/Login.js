import React, { useState } from 'react'
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import LoginWithGoogle from './LoginWithGoogle'
import axios from 'axios'
import { CREATE_USER_API, GET_USER_API } from '../api'
import { config } from '../configs/headersConfig'
const auth = getAuth(app)
const provider = new GoogleAuthProvider(app)
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleLoginUser = () => {
        if (!email || !password) {
            alert('Enter all fields')
            return
        }
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user)
                const { data } = await axios.post(GET_USER_API, {
                    email: email
                }, config)
                localStorage.setItem("carBidInfo", JSON.stringify({ email: data.email, name: data.name, pic: data.pic }))
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            });

    }
    const handelGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                //   const credential = GoogleAuthProvider.credentialFromResult(result);
                //   const token = credential.accessToken;
                const user = result.user;
                // console.log(user)
                try {
                    await axios.post(GET_USER_API, {
                        email: user.email
                    }, config)

                }
                catch (error) {
                    console.log("Catch block login page API call")
                    await axios.post(CREATE_USER_API, {
                        name: user.displayName,
                        email: user.email,
                        pic: user.photoURL
                    }, config)
                }
                localStorage.setItem("carBidInfo", JSON.stringify({ email: user.email, name: user.displayName, pic: user.photoURL }))
                navigate('/')
            }).catch((error) => {
                console.log(error)
            });
    }
    return (
        <>
            <div className='flex justify-center'>
                <div>
                    <div className='m-6 p-2'><input type="text" className='w-[300px] h-[30px] border border-gray-500 pl-[10px] text-xl' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' /></div>
                    <div className='m-6 p-2'><input type="text" className='w-[300px] h-[30px] border border-gray-500 pl-[10px] text-xl' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                    <div className='flex justify-center'>
                        <div className='w-[140px] h-[40px] bg-blue-500 hover:bg-blue-600 cursor-pointer mt-[10px] flex justify-center items-center font-bold text-white rounded-lg ' onClick={() => handleLoginUser()}>Login</div></div>
                    <div className='flex justify-center mt-[5px] mb-[5px]'>new user <Link to="/register"><span className='text-blue-500 ml-[2px] mr-[2px]cursor-pointer'>register</span></Link> here</div>
                    <div onClick={() => handelGoogleSignIn()}><LoginWithGoogle /></div>
                </div>
            </div>
        </>
    )
}

export default Login