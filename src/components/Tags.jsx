import React from 'react';

const Tags = ({tags}) => {
    return (
        <div>
            <div>
            <div className='blog-heading text-start py-2 mb-4'>
            </div>
            <div className='tags'>
              {tags?.map((tag,i)=>(
                <p className='tag'key={i}>{tag}</p>
              ))}
            </div>
            </div>
        </div>
    );
}

export default Tags;
