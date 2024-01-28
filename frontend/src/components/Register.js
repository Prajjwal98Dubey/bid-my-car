import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import LoginWithGoogle from './LoginWithGoogle'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CREATE_USER_API, GET_USER_API } from '../api'
import { config } from '../configs/headersConfig'
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

const auth = getAuth(app)
const provider = new GoogleAuthProvider(app)
const storage = getStorage(app)
const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [pic, setPic] = useState("")
    const navigate = useNavigate()
    const handleUploadPhoto = (image) => {
        const imageRef = ref(storage, `userimages/${email}`)
        uploadBytes(imageRef, image).then(() => alert('Image Uploaded Successfully!!!'))
    }
    const handleRegisterUser = async () => {
        let img = "";
        if (!email || !password || !name) {
            alert('Enter all fields')
            return
        }
        if (pic) {
            getDownloadURL(ref(storage, `userimages/${email}`)).then((url) => {
                img = url
                console.log("-----------------------", typeof (img), img)

            }).catch((error) => console.log(error))
        }

        /// ----------------------

        // let userImageRef = ref(storage, `userimages/${email}/`)
        // let list = []
        // try {
        //     const response = await listAll(userImageRef);

        //     // Use Promise.all to wait for all asynchronous operations to complete
        //     await Promise.all(
        //         response.items.map(async (item) => {
        //             const url = await getDownloadURL(item);
        //             list.push(url);
        //         })
        //     );
        //     console.log("----------------------------",typeof (list), list);
        // } catch (error) {
        //     console.error("Error fetching images:", error);
        // }

        //------------------------------------

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const { data } = await axios.post(CREATE_USER_API, {
                    name, email, password, pic: img
                }, config)
                localStorage.setItem("carBidInfo", JSON.stringify({ email: email, name: name, pic: data.pic }))
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            });

        console.log("Clicked")
    }
    const handelGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                //   const credential = GoogleAuthProvider.credentialFromResult(result);
                //   const token = credential.accessToken;
                const user = result.user;
                try {
                    await axios.post(GET_USER_API, {
                        email: user.email
                    }, config)

                }
                catch (error) {
                    console.log("catch block API call")
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
                    <div className='m-6 p-2'><input type="text" className='w-[300px] h-[30px] border border-gray-500 pl-[10px] text-xl' value={name} onChange={(e) => setName(e.target.value)} placeholder='name' /></div>

                    <div className='m-6 p-2'><input type="text" className='w-[300px] h-[30px] border border-gray-500 pl-[10px] text-xl' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' /></div>
                    <div className='m-6 p-2'><input type="text" className='w-[300px] h-[30px] border border-gray-500 pl-[10px] text-xl' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                    <div className='m-6 p-2'><input type="file" className='w-[300px] h-[30px] border border-gray-500 pl-[10px] text-xl' placeholder='upload profile pic' onChange={(e) => setPic(e.target.files[0])} /></div>
                    <button className='flex justify-center cursor-pointer w-[190px] h-[30px] bg-blue-500 text-white rounded-lg' onClick={() => { handleUploadPhoto(pic) }}>Upload Photo</button>
                    <div className='flex justify-center'>
                        <div className='w-[140px] h-[40px] bg-blue-500 hover:bg-blue-600 cursor-pointer mt-[10px] flex justify-center items-center font-bold text-white rounded-lg ' onClick={() => handleRegisterUser()}>Register</div></div>
                    <div onClick={() => handelGoogleSignIn()}><LoginWithGoogle /></div>
                </div>

            </div>
        </>
    )
}

export default Register