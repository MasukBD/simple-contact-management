import React from 'react';
import animation from '../../assets/Error-Animation.json';
import Lottie from 'lottie-react';


const ErrorPage = () => {
    return (
        <div className='flex items-center justify-center'>
            <Lottie animationData={animation} loop={true} />
        </div>
    );
};

export default ErrorPage;