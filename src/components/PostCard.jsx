import React,{useState} from 'react'
import { LiaCommentSolid } from "react-icons/lia";
import PostCom from './PostCom';

export default function PostCard({post,getInf}) {
    console.log("Enter post card")
    const[hide,setHide]=useState(true);
    console.log("Before sorting",post.commentsArray)
    const reverseCommentArray=post.commentsArray.slice().reverse();
    console.log('After sorting ',post.commentsArray)


    function formatTimeDiff(timestamp){
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - timestamp;

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

    return days > 0 
        ? `${days}d` 
        : hours > 0 
        ? `${hours}hr` 
        : minutes > 0 
        ? `${minutes}min` 
        : `${seconds}sec`;
    }
    
    return (
                   <div className='flex flex-col items-center p-2 border-b border-dashed w-auto'>
                        <div className='flex flex-col gap-3'>

                            {/* ****POST**** */}
                            <div>
                            <div className='flex items-center'>
                                    <p className='font-bold'>{post.userId.userName}</p>
                                    <p className='text-xs'>({formatTimeDiff(post.timestamp)})</p>
                            </div>
                            {post.fileUrl?<img src={post.fileUrl} alt="error"  className='h-64 rounded-xl'/>:''}
                            <p className='max-w-sm'>{post.caption}</p>
                            </div>

                            {/*****  COMMENTS *****/}
                            <div className='w-full'>
                                <div onClick={()=>{setHide(!hide)}} className='flex gap-1 items-center cursor-pointer'>
                                     <LiaCommentSolid className='size-6'/>
                                     <div className='text-secondary-blue text-sm'>{hide?(<p>show comments...</p>):(<p>hide comments...</p>)}</div>
                                </div>
                                {hide?
                                    (<div></div>):

                                    (<div className='max-h-32 overflow-y-auto w-full pl-1'> 
                                         {reverseCommentArray.length!==0?
                                              (reverseCommentArray.map((comment,index)=>(
                                                <div key={index} className='flex gap-1 w-full'>
                                                    <div className='flex items-center'>
                                                        <p className='font-bold'>{comment.userId.userName}</p>
                                                        <p className='text-xs'>({formatTimeDiff(comment.timestamp)})</p>
                                                    </div>
                                                    <p className='max-w-full break-words'>{comment.comment}</p>
                                                </div>))):

                                                (<div className='text-xl text-center'>no any comments</div>)}
                                    </div>)
                                } 
                            </div>

                            {/* ****ADD COMMENT**** */}
                            <div className='px-1'>
                                 <PostCom postId={post._id} getInf={getInf}/>
                            </div>

                        </div>
                   </div>
           )
}
