import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";

export default function SignIn() {
    const navigate = useNavigate();
    const { setIsLoggedIn, setLoggedUser } = useContext(AppContext);
    const Base_URL = "https://fileupserver.onrender.com";
    // const Base_URL = "http://localhost:4000";
    const [info, setInfo] = useState({ userName: '', password: '' });
    const [isPass, setIsPass] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const[submit,setSubmit]=useState(false)

    function changeHandle(event) {
        const { name, value } = event.target;
        setInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function submitHandle(event) {
        setSubmit(true)
        event.preventDefault();
        try {
            const response = await axios.post(`${Base_URL}/api/v1/signin`, info);
            setIsLoggedIn(true);
            console.log("Logged user is",response.data)
            setLoggedUser(response.data.user);
            setErrorMessage(null);
            // Store the JWT token in localStorage
            localStorage.setItem('authToken', response.data.token);
            navigate('/');
        } catch (err) {
            if (err.response && err.response.status === 402) {
                setErrorMessage(err.response.data.message);
                toast.error("user doesn't exist")
            } else if (err.response && err.response.status === 403) {
                setErrorMessage(err.response.data.message);
                toast.error('incorrect passWord')
            } else {
                setErrorMessage('an error occurred, please try again.');
            }
        }
        setSubmit(false)
    }

    return(
        submit?
        (<div className='font-bold flex justify-center mt-8'><PulseLoader size={50} aria-label="Loading    Spinner" data-testid="loader"/>
        </div>):
        (<div className='flex flex-col gap-2 items-center justify-center h-screen w-screen'>
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
                <p onClick={() => navigate("/signup")} className='cursor-pointer text-stone font-bold'>signUp</p>
            </div>
        </div>)
    )
}
