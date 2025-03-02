import React,{useCallback,useState,useEffect,useContext} from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import NewPost from './NewPost';
import PostCard from './PostCard';
import { AppContext } from '../context/AppContext';

export default function GetData() {
    
    const{refreshPage}=useContext(AppContext)
    const Base_URL=process.env.REACT_APP_API_BASE_URL;
    const[page, setPage] = useState([]);
    const[error,setError]=useState(null)

    const getInfo = useCallback(async () => {
        try {
            console.log("Fetching....")
            const response = await axios.get(`${Base_URL}/api/v1/posts`);
            const sortedPosts = response.data.posts.slice().reverse();   
            setPage(sortedPosts);
            console.log("Fetched....")
        } catch (err) {
            setError('error in fetching data.')
        }
    },[Base_URL]);

    useEffect(() => {
        console.log("Executing")
        getInfo();
    },[refreshPage, getInfo]);

    return (
        <div className='flex flex-col m-2 min-h-screen max-w-screen'>

            <div className='flex relative border-b border-dotted py-1 px-2 overflow-x-hidden'>
                <NewPost/>
                <SideBar/>
            </div>

            {error?(<p className='text-center' style={{color:'red'}}>{error}</p>):(

                <div className='flex flex-col items-center py-2 gap-2 w-full'>
                     {page.length!==0 ? 
                         (page.map((post, index) =>(<PostCard post={post} key={index} getInf={getInfo}/>))):
                         (<div className='italic font-bold text-3xl text-secondary-blue'>currently no any post...<br/>wait few seconds.....</div>)
                     }
                </div>)
            }      
        </div> 
    )
}
