import React from 'react';

const ContactCard = ({ user, handleDelete, handleUpdate }) => {
    const { _id, name, email, phoneNumber, address, photoURL } = user;
    return (
        <div className='flex flex-col border-pink-500 border-2 shadow-md shadow-pink-400 bg-base-100 rounded-lg text-center w-full p-2'>
            <img className='rounded-full mb-2' src={photoURL} alt="" />
            <div className='mt-auto space-y-2'>
                <h3 className='font-bold text-xl'>Name: <span className='text-pink-500'>{name}</span></h3>
                <h4 className='font-semibold text-xl'>Email: {email}</h4>
                <h5 className='font-semibold text-xl'>Phone No: {phoneNumber}</h5>
                <p><b>Address:</b> {address}</p>
                <div className='flex gap-5 items-center justify-center'>
                    <button onClick={() => handleUpdate(user)} className='btn btn-outline btn-primary mt-3'>Update</button>
                    <button onClick={() => handleDelete(_id)} className='btn btn-outline btn-primary mt-3'>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;