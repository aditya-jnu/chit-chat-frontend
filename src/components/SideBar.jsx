import React,{useContext} from 'react';
import { AppContext } from '../context/AppContext';
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
    const navigate=useNavigate();
    let{loggedUser}=useContext(AppContext)
    return (
            <div className='flex flex-col items-center justify-center cursor-pointer absolute right-0 top-0' onClick={()=>{navigate("/user/detail")}}>
              <FaUser size={36}/>
              <p className='font-bold'>{loggedUser.userName}</p>
            </div>
    )
}
