import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function NewPost() {
    const { loggedUser,setRefreshPage,refreshPage} = useContext(AppContext);
    const Base_URL = "https://fileupserver.onrender.com";
    // const Base_URL = "http://localhost:4000";
    const [newPost, setNewPost] = useState({ userId: loggedUser._id, caption: '' });
    const fileInputRef = useRef(null); // Create a ref for the file input
    const [error, setError] = useState(null);
    const [wait, setWait] = useState(false);

    function changeHandle(event) {
        const { name, value, files } = event.target;
        if (name === 'imgFile') {
            setNewPost((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        } else {
            setNewPost((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    }

    async function submitHandle(event) {
        event.preventDefault();
        setWait(true);
        // Create a FormData object
        const formData = new FormData();
        formData.append('userId', newPost.userId);
        formData.append('caption', newPost.caption);
        formData.append('imgFile', newPost.imgFile);

        try {
            setError(null);
            const response = await axios.post(`${Base_URL}/api/v1/upload/post`, formData);
            console.log("post done",response.data)
            setNewPost({ userId: loggedUser._id, caption: '' });
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset the file input field
            }
            toast.success('post uploaded!!')
            setWait(false);
            setRefreshPage(!refreshPage)            
        } catch (err) {
            if (err.response && err.response.status === 400 && err.response.data.message === 'Image format not supported') {
                setError('image format not supported');
                setWait(false);
                toast.error('image format not supported')
            }
            else{
                setError('Some error in uploading this post.');
                setWait(false);
                toast.error('some error in uploading post')
            }
        }
    }

    return (
        <div>
            {wait ? (
                <p className='flex text-2xl font-bold text-secondary-blue'>Uploading...</p>
            ) : (
                <form encType='multipart/form-data' className='flex flex-col gap-2' onSubmit={submitHandle}>
                    <input
                        type="text"
                        id='caption'
                        value={newPost.caption}
                        name='caption'
                        onChange={changeHandle}
                        className='px-1 py-2 w-1/2'
                        placeholder="What's going on in your mind?"
                        required
                    />
                    <div>
                        <input
                            type="file"
                            id='imgFile'
                            name='imgFile'
                            onChange={changeHandle}
                            ref={fileInputRef} // Attach the ref to the file input
                        />
                        <button className='bg-secondary-blue w-16 py-1 text-white rounded-lg'>Post</button>
                    </div>
                    {error && <p className='text-left' style={{ color: 'red' }}>{error}</p>}
                </form>
            )}
        </div>
    );
}
