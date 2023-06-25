import React from 'react';
import { useNavigate } from 'react-router-dom';
const MostPopular = ({blogs}) => {
    const navigate=useNavigate()
    return (
        <div>
            <div className='blog-heading text-start pt-3 py-2 mb-4'>Más Populares</div>
         {blogs?.map((i)=>(
            <div style={{cursor:'pointer'}}onClick={()=>navigate(`/detail/${i.id}`)} className='row pb-3'key={i.id}>
            <div className='col-5 align-self-center'> 
             <img src={i.imgUrl}alt={i.title} className='most-popular-img'/>
            </div>
            <div className='col-7 padding'>
             <div className='text-start most-popular-font'>{i.title}</div>
             <div className='text-start most-popular-font-meta'> {i.timestamp.toDate().toDateString()}</div>
            </div>
            </div>
         ))}
            </div>
    );
}

export default MostPopular;
