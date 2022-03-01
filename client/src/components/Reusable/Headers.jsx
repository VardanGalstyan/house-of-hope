import React from 'react';

function Headers({ title, paragraph }) {
    return (
        <div className='editable-header'>
            <h1>{title}</h1>
            <p>{paragraph}</p>
        </div>
    )
}

export default Headers;
