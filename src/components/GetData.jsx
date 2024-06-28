import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import NewPost from './NewPost';
import PostCard from './PostCard';
import { AppContext } from '../context/AppContext';

export default function GetData() {
    
    const{refreshPage}=useContext(AppContext)
    console.log('GD',refreshPage)
    const Base_URL="https://fileupserver.onrender.com";
    // const Base_URL="http://localhost:4000"
    const [page, setPage] = useState([]);
    const[error,setError]=useState(null)

    const getInfo = async () => {
        try {
            const response = await axios.get(`${Base_URL}/api/v1/posts`);
            console.log('BEFORE SORTING',response.data.posts)
            const sortedPosts = response.data.posts.slice().reverse();   
            console.log("AFTER SORT", sortedPosts);
             setPage(sortedPosts);
        } catch (err) {
            setError('error in fetching data.')
        }
    };

    useEffect(() => {
        console.log("Executing")
        getInfo();
    },[refreshPage]);

    return (
        <div className='flex flex-col m-2 min-h-screen max-w-screen'>

            <div className='flex justify-between border-b border-dotted py-1 px-2'>
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
