import { useContext } from 'react';
import { AppContext } from './context/AppContext.js';
import {Routes, Route, useNavigate} from 'react-router-dom';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import GetData from './components/GetData.jsx';
import UserDetail from './components/UserDetail.jsx';

export default function App() {
  const navigate=useNavigate();
  let{isLoggedIn}=useContext(AppContext);
  return (
    <div className="font-lato">
       <Routes>
        <Route path="/" element={isLoggedIn?(<GetData/>):(<SignIn/>)}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/user/detail' element={isLoggedIn?<UserDetail/>:<div onClick={()=>{navigate('/')}} className='flex gap-1 h-screen w-screen justify-center items-center text-xl'>go to <p className='cursor-pointer text-secondary-blue'>logIn</p> page</div>}/>
       </Routes>
    </div>
  );
}
