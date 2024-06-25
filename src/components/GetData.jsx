import React,{useState,useEffect,useContext} from 'react';
import { LiaCommentSolid } from "react-icons/lia";
import axios from 'axios';
import PostCom from './PostCom';
import SideBar from './SideBar';
import NewPost from './NewPost';
import { AppContext } from '../context/AppContext';

export default function GetData() {
    const{refreshPage}=useContext(AppContext)
    console.log('GD',refreshPage)
    const Base_URL="https://fileupserver.onrender.com";
    // const Base_URL="http://localhost:4000"
    const [page, setPage] = useState([]);
    const[hide,setHide]=useState(true);
    const[error,setError]=useState(null)

    const getInfo = async () => {
        try {
            const response = await axios.get(`${Base_URL}/api/v1/posts`);
            setPage(response.data.posts);
        } catch (err) {
            setError('error in fetching data.')
        }
    };

    useEffect(() => {
        console.log("Executing")
        getInfo();
    },[refreshPage]);

    return (
        <div className='flex flex-col m-2 min-h-screen min-w-screen'>
            <div className='flex justify-between border-b border-dotted p-1'>
                <NewPost/>
                <SideBar/>
            </div>
            {error?(<p className='text-center' style={{color:'red'}}>{error}</p>):(
                <div className='flex flex-col items-center py-2 gap-2'>
                     {page.length!==0 ? 
                         (page.map((post, index) =>(
                         <div key={index} className='flex flex-col gap-3 p-2 border-b border-dashed'>
                         <div>
                            <div className='flex gap-2'>
                                 <p className='font-bold'>{post.userId.userName}</p>
                                 <p className='max-w-sm'>{post.caption}</p>
                            </div>
                            {post.fileUrl?<img src={post.fileUrl} alt="error"  className='h-64 rounded-xl'/>:''}
                         </div>
                         <div>
                             <div onClick={()=>{setHide(!hide)}} className='flex gap-1 items-center cursor-pointer'>
                                <LiaCommentSolid className='size-6'/>
                                <div className='text-secondary-blue text-sm'>{hide?(<p>show comments...</p>):(<p>hide comments...</p>)}</div>
                             </div>
                             {/* comments */}
                             {
                                hide?(<div></div>):(<div className='h-32 overflow-y-auto'> {post.commentsArray.length!==0?(post.commentsArray.map((comment,index)=>( <div key={index} className='flex gap-2'><p className='font-bold'>{comment.userId.userName}</p><p>{comment.comment}</p></div>))
                            ):(<div>no any comments</div>)}</div>)
                             } 
                         </div>
                         <div>
                            <PostCom postId={post._id}/>
                         </div>
                    </div>
                    ))
                 ):(<div className='italic font-bold text-3xl text-secondary-blue'>currently no any post...<br/>wait few seconds.....</div>)
            }
            </div>
            )}      
        </div> 
    )
}
