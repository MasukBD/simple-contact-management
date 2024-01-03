import React from 'react';
import Lottie from "lottie-react";
import animation from '../../assets/animation.json';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CustomAnimation from '../SharedComponent/CustomAnimation';


const HomePage = () => {
    return (
        <>
            <Helmet><title>Home - Contact - Managements - System</title></Helmet>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 min-h-screen'>
                <div className='flex flex-col justify-center w-full my-10 lg:w-10/12 mx-auto space-y-2 p-2'>
                    <CustomAnimation>
                        <h1 className='text-3xl md:text-5xl font-bold'><span className='text-pink-700'>Connect</span>,<span className='text-pink-800'> Collaborate</span>,<span className='text-[#252958]'> Conquer</span>: Your Ultimate Contact Management Solution!</h1>
                        <p className='text-sm text-blue-800'>Effortless Connections, Seamless Management: Your Contacts, Your Way!</p>
                        <p>Discover the ultimate in contact management with our system – where effortless organization meets seamless connectivity. Streamline your contacts, boost productivity, and stay in control. Elevate your communication game with our intuitive Contact Management System, tailored for your convenience.</p>
                        <div className='flex gap-3 items-center'>
                            <Link to='/addContact'><button className='btn btn-outline my-3 btn-primary'>Add Contacts</button></Link>
                            <Link to='/allContacts'><button className='btn btn-outline my-3 btn-primary'>See Contacts</button></Link>
                        </div>
                    </CustomAnimation>
                </div>
                <div className='flex items-center justify-center'>
                    <Lottie animationData={animation} loop={true} />
                </div>
            </div>
        </>
    );
};

export default HomePage;