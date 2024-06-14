import React,{useState, useEffect} from 'react';
import axios from 'axios';

export default function GetData() {
    const Base_URL="https://fileupserver.onrender.com";
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await axios.get(`${Base_URL}/api/v1/upload/posts`);
                setData(response.data.data);
                console.log("Fetched Data is here");
                console.log(response.data.data);
            } catch (err) {
                console.log('Error in fetching the data!!')
                console.log(err);
            }
        };
        getInfo();
    }, []);

    
    return (
        <div className='flex flex-col items-center py-2 gap-2 w-full'>
          {
             data.length!==0 ? 
                 //if true render this  
                 (data.map((user, index) =>(
                     <div key={index} className='border-4 border-amber-600 rounded-xl'>
                         <img src={user.fileUrl}  className='h-64'/>
                         <p className='text-center font-semibold'>{user.desc}</p>
                      </div>
                      ))
                 ):
                 //  if false render this
                    (
                      <div className='italic font-bold text-3xl'>Loading...</div>
                    )
          }
        </div>
    )
}
