import React,{useState, useEffect} from 'react';
import axios from 'axios';

export default function GetData() {
    const [data, setData] = useState([]);
    const[error,setError]=useState(null);
    
    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await axios.get('/api/v1/upload/posts');
                setData(response.data.data);
                console.log(response.data.data); // Log the fetched data
            } catch (err) {
                setError(err);
            }
        };

        getInfo(); // Call getInfo when the component mounts

    }, []);

    
    return (
        <div className='flex flex-wrap justify-center gap-4 p-1'>
          {
             data.length!==0 ? 
                 //if true render this  
                 (data.map((user, index) =>(
                     <div key={index} className='border w-1/4 h-1/4'>
                         <img src={user.fileUrl} alt="" className='h-40 w-full '/>
                         <p className='text-center font-semibold'>{user.desc}</p>
                      </div>
                      ))
                 ):
                 //  if false render this
                    (
                      <div>Loading...</div>
                    )
          }
        </div>
    )
}
