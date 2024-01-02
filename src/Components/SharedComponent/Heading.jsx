import React from 'react';

const Heading = ({ subHeading, heading }) => {
    return (
        <div className='w-11/12 mx-auto md:w-3/5 lg:w-5/12 mt-10'>
            <p className='text-blue-600 text-center mb-1'>-- {subHeading} --</p>
            <h3 className='text-center font-bold text-2xl md:text-4xl py-2 border-y-2'>{heading}</h3>
        </div>
    );
};

export default Heading;