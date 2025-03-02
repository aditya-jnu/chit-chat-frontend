import React,{useState, useContext} from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PostCom(props) {
    let{loggedUser,setRefreshPage,refreshPage}=useContext(AppContext);
    const Base_URL=process.env.REACT_APP_API_BASE_URL;
    const[comment,setComment]=useState({comment:'',postId:props.postId,userId:loggedUser._id})

    function changeHandle(event){
        const{name,value}=event.target;
        setComment((prevState)=>({
            ...prevState,[name]:value
        }))
    }

    async function submitHandle(event){
        event.preventDefault();
        try{
            const response=await axios.post(`${Base_URL}/api/v1/upload/comment`,comment)
            console.log("Comment done")
            console.log(response.data);
            setComment((prevState) => ({
                ...prevState,
                comment: ''
            }));
            props.getInf();
            setRefreshPage(!refreshPage)
            console.log("PC",refreshPage)
        }
        catch(err){
            console.log("Error in posting a comment",err)
            toast.error('some error in posting comment')
        }
    }
    return (
            <form className='flex justify-between' onSubmit={submitHandle}>
                 <input type='text' placeholder='add a comment....' name='comment' value={comment.comment||''} onChange={changeHandle} required className='p-1'/>
                 <button className='text-secondary-blue'>post</button>
            </form>
    )
}
