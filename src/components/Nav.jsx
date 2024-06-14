import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const navigate=useNavigate();
    return (
        <div className='bg-primary-blue text-white w-full p-4 flex justify-between items-center'>
            <div>
                <p className='italic font-bold text-3xl'>Data Chor</p>
                <p>(tichkule & company)</p>
            </div>
            <button className='border w-24 h-8' onClick={()=>{navigate("/fileUpload")}}>Upload</button>
        </div>
    )
}
