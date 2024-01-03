import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {

    const navItems = <>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'default')}>Home</NavLink></li>
        <li><NavLink to="/addContact" className={({ isActive }) => (isActive ? 'active' : 'default')}>Add&nbsp;Contacts</NavLink></li>
        <li><NavLink to="/allContacts" className={({ isActive }) => (isActive ? 'active' : 'default')}>All&nbsp;Contacts</NavLink></li>
    </>

    return (
        <div className='bg-[#252958] text-white sticky top-0 z-10'>
            <div className="navbar w-11/12 mx-auto">
                <div className="navbar-start">
                    <Link><span className='font-bold hover:text-blue-900'>CONTACT MANAGEMENT</span></Link>
                </div>
                <div className="navbar-end">
                    <div className="dropdown">
                        <label tabIndex={0} className="pe-20 justify-end flex items-center text-white lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="bg-black bg-opacity-80 dropdown-content mt-5 p-2 z-10 shadow rounded">
                            {navItems}
                        </ul>
                    </div>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="flex items-center">
                        {navItems}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;