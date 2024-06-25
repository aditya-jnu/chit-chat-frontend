import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function SignIn() {
    const navigate = useNavigate();
    const { setIsLoggedIn, setLoggedUser } = useContext(AppContext);
    // const Base_URL = "https://fileupserver.onrender.com";
    const Base_URL = "http://localhost:4000";
    const [info, setInfo] = useState({ userName: '', password: '' });
    const [isPass, setIsPass] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    function changeHandle(event) {
        const { name, value } = event.target;
        setInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function submitHandle(event) {
        event.preventDefault();
        try {
            const response = await axios.post(`${Base_URL}/api/v1/signin`, info);
            setIsLoggedIn(true);
            console.log("Logged user is",response.data)
            setLoggedUser(response.data.user);
            setErrorMessage(null);
            navigate('/');
            toast.success('user loggedIn successfully!!')
        } catch (err) {
            if (err.response && err.response.status === 400 && err.response.data.message === 'user does not exist, please signUp.') {
                setErrorMessage('user does not exist, please signUp.');
                toast.error('user does not exist, please signUp.')
            } else if (err.response && err.response.status === 403 && err.response.data.message === 'incorrect passWord, please try again.') {
                setErrorMessage('incorrect passWord, please try again.');
                toast.error('incorrect passWord')
            } else {
                setErrorMessage('an error occurred, please try again.');
            }
        }
    }

    return (
        <div className='flex flex-col gap-2 items-center justify-center min-h-screen min-w-screen'>
            <div className='flex flex-col items-center'>
                <p className='font-bold text-3xl'>campus chitChat</p>
                <p className='italic text-xs'>logIn to get the latest campus gossip and stay in the loop!!</p>
            </div>
            <div>
                <form className='flex flex-col gap-4 items-center' onSubmit={submitHandle}>
                    <input type="text" id='userName' value={info.userName} name='userName' onChange={changeHandle} className='border p-1 w-64' required placeholder='userName' />
                    <div className='input-container'>
                        <input type={isPass ? 'password' : 'text'} id='password' value={info.password} name='password' onChange={changeHandle} className='border p-1 w-64' required placeholder='passWord' />
                        <div className='eye-icon' onClick={() => { setIsPass(!isPass) }}>
                            {isPass ? <FaRegEye /> : <FaRegEyeSlash />}
                        </div>
                    </div>
                    {errorMessage && <p className='text-center' style={{ color: 'red' }}>{errorMessage}</p>}
                    <button className='bg-secondary-blue p-2 text-white w-20'>logIn</button>
                </form>
            </div>
            <div>or</div>
            <div className='flex gap-2 justify-center'>
                <p>don't have an account? </p>
                <p onClick={() => navigate("/signup")} className='cursor-pointer text-secondary-blue'>signUp</p>
            </div>
        </div>
    )
}
