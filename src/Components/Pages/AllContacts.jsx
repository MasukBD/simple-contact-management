import React, { useContext, useState } from 'react';
import Heading from '../SharedComponent/Heading';
import { Helmet } from 'react-helmet-async';
import ContactCard from '../SharedComponent/ContactCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-number-input';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import toast from 'react-hot-toast';
import { DNA } from 'react-loader-spinner';
import { AuthContext } from '../../Provider/AuthProvider';
const imageHostingApiKey = import.meta.env.VITE_IMAGE_HOST_KEY;

const AllContacts = () => {
    const [updateContact, setUpdateContact] = useState(null);
    const { loading } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('access-token');
    const headers = {
        'content-type': 'application/json',
        authorization: `bearer ${token}`
    }

    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingApiKey}`;

    const [phoneValue, setPhoneValue] = useState(updateContact?.phoneNumber)
    const { data: contacts = [], refetch, isLoading } = useQuery({
        queryKey: ['contacts', searchQuery && searchQuery],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(`https://contact-management-server-theta.vercel.app/contacts?search=${searchQuery}`, { headers })
            return res.data;
        }
    });

    const handleUpdateContact = user => {
        setUpdateContact(user);
        document.getElementById('my_modal').showModal();
    };

    const handleUpdatedData = async (event) => {
        const from = event.target;
        const name = from.name.value;
        const email = from.email.value;
        const photo = from.photo.files[0];
        const phone = phoneValue;
        const address = from.address.value;
        if (!isPossiblePhoneNumber(String(phone))) {
            setError('Phone Number is Required!');
            return event.preventDefault();
        }
        if (photo) {
            const formData = new FormData();
            formData.append('image', photo);

            await fetch(imageHostingUrl, { method: "POST", body: formData })
                .then(res => res.json())
                .then(data => {

                    if (data.success) {
                        const updatedPhoto = data.data.display_url;
                        const updatedData = { name, email, phoneNumber: phone, address, photoURL: updatedPhoto }
                        axios.put(`https://contact-management-server-theta.vercel.app/contacts/${updateContact?._id}`, updatedData, { headers })
                            .then(res => {
                                if (res.status === 200) {
                                    toast.success('Updated Successfully!');
                                    refetch();
                                    from.reset();
                                }
                            })
                    }
                })
        }
        else {
            const updatedData = { name, email, phoneNumber: phone, address, photoURL: updateContact?.photoURL }
            axios.put(`https://contact-management-server-theta.vercel.app/contacts/${updateContact?._id}`, updatedData, { headers })
                .then(res => {
                    if (res.status === 200) {
                        toast.success('Updated Successfully!');
                        refetch();
                        from.reset();
                    }
                })
        }
    }

    const handleDeleteContact = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://contact-management-server-theta.vercel.app/contacts/${id}`, {
                    method: "DELETE", headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${token}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            }
        });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <Helmet><title>All Contacts - Contact - Management - System</title></Helmet>
            <Heading subHeading={'Connectify - SyncMingle'} heading={'All Contacts'}></Heading>
            <div className='my-10 flex justify-center items-center'>
                <div className="join">
                    <input type='text' onChange={handleSearch} className="input input-bordered join-item" placeholder="Phone Number" />
                    <button className="btn btn-primary join-item rounded">Search</button>
                </div>
            </div>
            {
                isLoading && <div className='flex justify-center my-3'><DNA
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                /></div>
            }
            {
                contacts.length <= 0 && isLoading === false && <h1 className='text-3xl font-bold text-red-500 text-center my-10'>No User Added Yet!</h1>
            }
            <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:w-10/12 mx-auto p-2'>
                {
                    [...contacts].reverse().map(contact => <ContactCard handleDelete={handleDeleteContact} handleUpdate={handleUpdateContact} key={contact._id} contact={contact}></ContactCard>)
                }
            </div>
            <dialog id="my_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-xl py-1.5 border-y-2 text-center">Update User Data</h3>
                    <div className="modal-action bg-blue-200 rounded-md">
                        <form onSubmit={handleUpdatedData} className='w-full p-2 space-y-3' method="dialog">
                            <div className='w-full flex flex-col items-center'>
                                <div>
                                    <label className='font-semibold mb-1'>Current Photo</label>
                                    <img className='w-40 rounded-full' src={updateContact && updateContact.photoURL} alt="" />
                                </div>
                                <div className='my-3'>
                                    <label><span className='font-semibold'>Upload New Photo</span> <span className='text-black'>*</span></label><br />
                                    <input name='photo' type="file" className="file-input file-input-bordered file-input-primary w-full" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div>
                                    <label><span className='font-semibold'>Name</span> <span className='text-red-500'>*</span></label><br />
                                    <input required defaultValue={updateContact?.name} className='w-full p-2 rounded-md' placeholder='Your Name' type="text" name='name' id="name" />
                                </div>
                                <div>
                                    <label><span className='font-semibold'>Email</span> <span className='text-black'>*</span></label><br />
                                    <input defaultValue={updateContact && updateContact.email} className='w-full p-2 rounded-md' placeholder='Your Email' type="email" name='email' id="email" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div>
                                    <label><span className='font-semibold'>Phone</span> <span className='text-red-500'>*</span></label><br />
                                    <PhoneInput
                                        defaultCountry='BD'
                                        international={true}
                                        limitMaxLength={true}
                                        className='phone-input'
                                        onChange={setPhoneValue} />
                                    {
                                        error && <span className='text-xs text-red-500'>{error}</span>
                                    }
                                </div>
                                <div>
                                    <label><span className='font-semibold'>Address</span> <span className='text-red-500'>*</span></label><br />
                                    <input required defaultValue={updateContact && updateContact.address} className='w-full p-2 rounded-md' placeholder='Write Address Here' name='address' type="text" id="address" />
                                </div>
                            </div>
                            <div className='text-center'>
                                <button className='my-3'><input className='p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-900' type="submit" value="Update Now" /></button>
                            </div>
                            <p className='text-sm text-center my-1'>Press Keyboard Esc to Cancel!</p>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default AllContacts;