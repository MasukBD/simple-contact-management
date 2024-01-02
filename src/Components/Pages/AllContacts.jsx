import React from 'react';
import Heading from '../SharedComponent/Heading';
import { Helmet } from 'react-helmet-async';

const AllContacts = () => {
    return (
        <>
            <Helmet><title>All Contacts - Contact - Management - System</title></Helmet>
            <Heading subHeading={'Connectify - SyncMingle'} heading={'All Contacts'}></Heading>
        </>
    );
};

export default AllContacts;