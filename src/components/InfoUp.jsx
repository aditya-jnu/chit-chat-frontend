import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function InfoUp() {
    const Base_URL="https://fileupserver.onrender.com";
    const navigate=useNavigate();
    const[submit,setSubmit]=useState(false);
    const[info,setInfo]=useState({desc:'',email:'', fileToUp:''});
    function changeHandle(event) {
        const { name, value, files } = event.target;
        setInfo((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    }
    async function submitHandle(event){
        event.preventDefault();
        setSubmit(true);
         // Create a FormData object
         const formData = new FormData();
         formData.append('desc', info.desc);
         formData.append('email', info.email);
         formData.append('fileToUp', info.fileToUp);
        try{
            const response=await axios.post(`${Base_URL}/api/v1/upload/file`,formData)
            console.log("File Uploaded!!")
            console.log(response.data);
            setSubmit(false);
            navigate("/");
        }
        catch(err){
            console.log(err);
        }
        
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            {submit?(<div>Button Clicked!!</div>):(<form encType='multipart/form-data' className='flex flex-col gap-6' onSubmit={submitHandle}>
                <div className='flex flex-col'>
                    <label htmlFor="desc">Description</label>
                    <input type="text" id='desc' value={info.desc} name='desc' onChange={changeHandle} className='border p-1'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' value={info.email} name='email' onChange={changeHandle} className='border p-1'/>
                </div>
                <div className='flex flex-col'>
                    <input type="file" id='fileToUp' name='fileToUp' onChange={changeHandle}/>
                </div>
                <button className='bg-secondary-blue p-2 text-white'>Submit</button>
                
            </form>)}
            
        </div>
    )
}
