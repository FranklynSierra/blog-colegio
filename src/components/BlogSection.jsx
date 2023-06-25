import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom'
import { excerpt } from '../utility';

 
const BlogSection = ({ blogs, user,handleDelete }) => {

   

    return (
        <div>
            <div className='blog-heading text-start py-2 mb-4'>Blog Diario</div>
            {blogs?.map((item) => (
                <div className='row pb-4' key={item.id}>
                    <div className='col-md-5'>
                        <div className='hover-blogs-img'>
                            <div className='blogs-img'>
                                <img src={item.imgUrl} alt={item.title} />
                                
                            </div>
                        </div>
                    </div>
                    <div className='col-md-7'>
                        <div className='text-start'>
                            <h6 className='category catg-color'>{item.category}</h6>
                            <span className='title py-2'>{item.title}</span>
                            <span className='meta-info'>
                                <p className='author'>{item.author}</p> -&nbsp;
                                {item.timestamp.toDate().toDateString()}
                               </span>
                        </div>
                        <div className='short-description text-start'>
                        { excerpt(item.description,120)}
                        
                        </div>
                      <Link to={`/detail/${item.id}`}><button className='btn btn-read'>Leer Más</button></Link>  
                      {user?.uid&&item.userId===user.uid&&(
                        <div style={{float:'right'}} >
                        <FontAwesome onClick={()=>handleDelete(item.id)} size='2x' name='trash'style={{margin:'15px',cursor:'pinter'}}/>
                       <Link to={`/update/${item.id}`}><FontAwesome size='2x' name='edit'style={{cursor:'pinter'}}/></Link>
                       
                        
                        </div>
                      )} 
                      
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BlogSection;
