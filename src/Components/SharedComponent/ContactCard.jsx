import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const ContactCard = ({ contact, handleDelete, handleUpdate }) => {
    const { user, loading } = useContext(AuthContext);
    const { _id, name, email, phoneNumber, address, photoURL } = contact;
    const token = localStorage.getItem('access-token');

    const headers = {
        'content-type': 'application/json',
        authorization: `bearer ${token}`
    };

    const { data: favorites = [], refetch, isLoading } = useQuery({
        queryKey: ['favorites', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axios.get(`https://contact-management-server-theta.vercel.app/favorite?email=${user?.email}`, { headers })
            return response.data;
        }
    })

    const favorite = favorites.find(favorite => favorite.itemId === _id);

    const handleFavourite = () => {
        const favoriteItem = { itemId: _id, email: user?.email };
        axios.post('https://contact-management-server-theta.vercel.app/favorite', favoriteItem, { headers })
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Added Successfully!');
                    refetch();
                }
            })
    }

    return (
        <div className='flex flex-col border-pink-500 border-2 shadow-md shadow-pink-400 bg-base-100 rounded-lg text-center w-full p-2'>
            <img className='rounded-full mb-2' src={photoURL} alt="" />
            <div className='mt-auto space-y-2'>
                <h3 className='font-bold text-xl'>Name: <span className='text-pink-500'>{name}</span></h3>
                <h4 className='font-semibold text-xl'>Email: {email}</h4>
                <h5 className='font-semibold text-xl'>Phone No: {phoneNumber}</h5>
                <p><b>Address:</b> {address}</p>
                <div className='flex gap-2 lg:gap-5 items-center justify-center'>
                    <button onClick={() => handleUpdate(contact)} className='btn btn-outline btn-primary mt-3'>Update</button>
                    <button onClick={() => handleDelete(_id)} className='btn btn-outline btn-primary mt-3'>Delete</button>
                    <button onClick={handleFavourite} disabled={favorite} className='btn btn-outline btn-primary mt-3'>{favorite ? 'Favorite' : 'Add Favorite'}</button>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;