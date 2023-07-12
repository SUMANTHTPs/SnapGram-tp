import React from 'react'
import shareVideo from '../assets/share.mp4';
import appLogo from '../assets/appLogo.png';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();
    const user = false;
    const createOrGetUser = async (response) => {
        const decoded = jwt_decode(response.credential);
        const { name, picture, sub } = decoded;
        const user = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture,
        }
        localStorage.setItem('user', JSON.stringify(decoded));

        client.createIfNotExists(user).then(() => {
            navigate('/', { replace: true })
        })
    }
    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className=" relative w-full h-full">
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={appLogo} width="130px" className='appLogo' alt='app Logo'/>
                    </div>
                    <div className="shadow-2xl">
                        {user ? (
                            <div> loggedIn </div>
                        ) : (
                            <GoogleLogin
                                onSuccess={(response) => {
                                    createOrGetUser(response)
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login