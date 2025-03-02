import { useContext, useEffect } from 'react';
import { AppContext } from './context/AppContext.js';
import {Routes, Route, useNavigate} from 'react-router-dom';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import GetData from './components/GetData.jsx';
import UserDetail from './components/UserDetail.jsx';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function App() {
  const navigate=useNavigate();
  let{isLoggedIn,setIsLoggedIn,setLoggedUser}=useContext(AppContext);
  const token = localStorage.getItem('authToken');
  const Base_URL=process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log('Decoded Token:', decodedToken);
          const userId = decodedToken.userId;

          const response = await axios.get(`${Base_URL}/api/v1/user/${userId}`);
          console.log('User details:', response.data.user);

          // Update the loggedUser in context
          setLoggedUser(response.data.user);
          setIsLoggedIn(true)
        } catch (error) {
          console.error('Error fetching user details:', error.response?.data?.message || error.message);
        }
      }
    };

    fetchUserDetails();
  }, [setIsLoggedIn, setLoggedUser, token]);
  

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
