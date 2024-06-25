import React,{useContext} from 'react';
import { AppContext } from '../context/AppContext';
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
    const navigate=useNavigate();
    let{loggedUser}=useContext(AppContext)
    return (
            <div className='flex flex-col items-center justify-center cursor-pointer' onClick={()=>{navigate("/user/detail")}}>
              <FaUser size={40}/>
              <p className='font-md text-lg'>{loggedUser.userName}</p>
            </div>
    )
}
