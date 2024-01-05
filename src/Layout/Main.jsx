import React from 'react';
import Header from '../Components/SharedComponent/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/SharedComponent/Footer';
import ScrollToTop from '../Components/SharedComponent/ScrollToTop';

const Main = () => {
    return (
        <>
            <ScrollToTop></ScrollToTop>
            <Header></Header>
            <div className='min-h-screen'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>

        </>
    );
};

export default Main;