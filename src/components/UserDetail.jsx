import React,{useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function UserDetail() {
    let{loggedUser,setIsLoggedIn,postCal}=useContext(AppContext)
    const navigate=useNavigate();
    let commNum=loggedUser.commentsArray.length;
    console.log("In UserDetail", loggedUser)
    const userCreated=loggedUser.timestamp.split(',')[0]

    function logO(){
        setIsLoggedIn(false)
        navigate('/')
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className='flex items-center gap-1'>
                <p className='text-lg'>userName: </p><p> {loggedUser.userName}</p>
            </div>
            <div>user created on:{userCreated}</div>
            <div className='flex items-center gap-1'>
                <p>number of posts:</p><p className='text-xl font-bold'>{postCal(loggedUser)}</p>
            </div>
            <div className='flex items-center gap-1'>
                <p>number of comments:</p><p className='text-xl font-bold'>{commNum}</p>
            </div>
            <div className='flex gap-1 items-center' onClick={()=>{navigate('/')}}>
                <p>go to</p><p className='cursor-pointer text-secondary-blue text-xl font-bold'>feed</p>
            </div>
            <div onClick={logO}>
                click to <span className='cursor-pointer text-secondary-blue'>logOut</span>
            </div>                             
        </div>
    )
}
