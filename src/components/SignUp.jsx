import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";

export default function SignUp() {
    const navigate=useNavigate();
    const Base_URL="https://fileupserver.onrender.com";
    // const Base_URL="http://localhost:4000"
    const[info,setInfo]=useState({userName:'',password:''});
    const[isPass,setIsPass]=useState(true);
    const[errorMessage, setErrorMessage] = useState(null);
    const[submit,setSubmit]=useState(false)

    function changeHandle(event) {
        const { name, value} = event.target;
        setInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function submitHandle(event){
        setSubmit(true)
        event.preventDefault();
        try{
            console.log("BASE_URL ",Base_URL);
            const response=await axios.post(`${Base_URL}/api/v1/signup`,info)
            console.log("user created",response)
            toast.success('user created successfully!!')
            navigate("/")
        }
        catch(err){
            if(err.response && err.response.status === 400) {
                setErrorMessage(err.response.data.message);
                toast.error(err.response.data.message)
            }else if(err.response && err.response.status === 401){
                setErrorMessage(err.response.data.message)
                toast.error(err.response.data.message)
            }else if (err.response && err.response.status === 500) {
                setErrorMessage(err.response.data.message);
                toast.error(err.response.data.message)
            } else {
                setErrorMessage('internal server error, please try again later.');
                toast.error('internal server error')
            }
        }
        setSubmit(false)
    }

    return(
        submit?
        (<div className='flex justify-center font-bold mt-8'>
            <PulseLoader size={50} aria-label="Loading Spinner" data-testid="loader"/>
        </div>):
        (<div className='flex flex-col items-center justify-center gap-2 h-screen w-screen'>
            <div className='flex flex-col items-center'>
                <p className='font-bold text-3xl'>campus chitChat</p>
                <p className='italic text-xs'>signUp to get the latest campus gossip and stay in the loop!!</p>
            </div>
            <div>
                <form  className='flex flex-col gap-4 items-center' onSubmit={submitHandle}>
                    <input type="text" id='userName' value={info.userName} name='userName' onChange={changeHandle} className='border p-1 w-64' required placeholder='create a userName'/>
                    <div className='input-container'>
                        <input type={isPass?'password':'text'} id='password' value={info.password} name='password' onChange={changeHandle} className='border p-1 w-64' required placeholder='create a passWord'/>
                        <div className='eye-icon' onClick={() => { setIsPass(!isPass) }}>
                            {isPass ? <FaRegEye /> : <FaRegEyeSlash />}
                        </div>
                    </div>
                    {errorMessage && <p className='text-center' style={{color:'red'}}>{errorMessage}</p>}
                    <button className='bg-stone p-2 text-white w-20'>signUp</button>
                </form>
            </div>
            <div>or</div>
            <div className='flex gap-2'>
                <p>already have an account? </p>
                <p onClick={()=>navigate("/")} className='cursor-pointer text-secondary-blue font-bold'>logIn</p>
            </div>
        </div>)
    )
}
