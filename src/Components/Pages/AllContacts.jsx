import React from 'react';
import Heading from '../SharedComponent/Heading';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import ContactCard from '../SharedComponent/ContactCard';

const AllContacts = () => {
    const users = useLoaderData();
    return (
        <>
            <Helmet><title>All Contacts - Contact - Management - System</title></Helmet>
            <Heading subHeading={'Connectify - SyncMingle'} heading={'All Contacts'}></Heading>
            <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:w-10/12 mx-auto p-2'>
                {
                    [...users].reverse().map(user => <ContactCard key={user._id} user={user}></ContactCard>)
                }
            </div>
        </>
    );
};

export default AllContacts;