import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function SignUp() {
    const navigate=useNavigate();
    //const Base_URL="https://fileupserver.onrender.com";
    const Base_URL="http://localhost:4000"
    const[info,setInfo]=useState({userName:'',password:''});
    const[isPass,setIsPass]=useState(true);
    const[errorMessage, setErrorMessage] = useState(null);

    function changeHandle(event) {
        const { name, value} = event.target;
        setInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function submitHandle(event){
        event.preventDefault();
        try{
            const response=await axios.post(`${Base_URL}/api/v1/signup`,info)
            console.log("user created",response)
            toast.success('user created successfully!!')
            navigate("/")
        }
        catch(err){
            if (err.response && err.response.status === 400 && err.response.data.message === 'this userName already exist') {
                setErrorMessage('this user already exists, try with a different userName.');
                toast.error('this userName already exist')
            } else if (err.response && err.response.status === 500 && err.response.data.message === 'error in processing your request') {
                setErrorMessage('error in processing your request, please try again later.');
                toast.error('error in processing your request')
            } else {
                setErrorMessage('internal server error, please try again later.');
                toast.error('internal server error')
            }
        }
    }

    return (
            <div className='flex flex-col items-center justify-center gap-2 min-h-screen min-w-screen'>
                <div className='flex flex-col items-center'>
                     <p className='font-bold text-3xl'>campus chitChat</p>
                     <p className='italic text-xs'>signUp to get the latest campus gossip and stay in the loop!!</p>
                </div>
                <div>
                <form  className='flex flex-col gap-4 items-center' onSubmit={submitHandle}>
                 <input type="text" id='userName' value={info.userName} name='userName' onChange={changeHandle} className='border p-1 w-64' required placeholder='userName'/>
                 <div className='input-container'>
                     <input type={isPass?'password':'text'} id='password' value={info.password} name='password' onChange={changeHandle} className='border p-1 w-64' required placeholder='passWord'/>
                     <div className='eye-icon' onClick={() => { setIsPass(!isPass) }}>
                        {isPass ? <FaRegEye /> : <FaRegEyeSlash />}
                     </div>
                 </div>
                 {errorMessage && <p className='text-center' style={{color:'red'}}>{errorMessage}</p>}
                 <button className='bg-secondary-blue p-2 text-white w-20'>signUp</button>
                </form>
                </div>
                <div>or</div>
                <div className='flex gap-2'>
                     <p>already have an account? </p>
                     <p onClick={()=>navigate("/")} className='cursor-pointer text-secondary-blue'>logIn</p>
                </div>
            </div> 
    )
}
