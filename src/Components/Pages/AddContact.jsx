import React, { useState } from 'react';
import Heading from '../SharedComponent/Heading';
import 'react-phone-number-input/style.css'
import { useForm } from "react-hook-form";
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import './CustomStyle.css';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import axios from 'axios';
const imageHostingApiKey = import.meta.env.VITE_IMAGE_HOST_KEY;

const AddContact = () => {
    const [loader, setLoader] = useState(false);
    const token = localStorage.getItem('access-token');
    const headers = {
        'content-type': 'application/json',
        authorization: `bearer ${token}`
    }

    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingApiKey}`;

    const { register, handleSubmit, reset, watch, formState: { errors }, control } = useForm();

    // sweetAlert Variable 
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const onSubmit = async (data) => {
        setLoader(true);
        const formData = new FormData();
        formData.append('image', data.photo[0]);

        await fetch(imageHostingUrl, { method: 'POST', body: formData })
            .then(res => res.json())
            .then(imageResponse => {
                if (imageResponse.success) {
                    const photoURL = imageResponse.data.display_url;
                    const userData = { name: data.name, email: data.email, phoneNumber: data.phoneInput, address: data.address, photoURL: photoURL };
                    axios.post('https://contact-management-server-theta.vercel.app/contacts', userData, { headers })
                        .then(res => {
                            if (res.data.insertedId) {
                                Toast.fire({
                                    icon: "success",
                                    title: "User Added Successfully!"
                                });
                                reset();
                                setLoader(false);
                            }
                        })
                }
            })
    }
    return (
        <div className='p-2'>
            <Helmet><title>Add Contacts - Contact - Management - System</title></Helmet>
            <Heading subHeading={'Connectify - SyncMingle'} heading={'Add Contacts'}></Heading>
            <div className='mt-5 mb-4 md:mt-12 md:w-10/12 mx-auto bg-blue-200 rounded-md'>
                <form onSubmit={handleSubmit(onSubmit)} className='p-2 space-y-3'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        <div>
                            <label><span className='font-semibold'>Name</span> <span className='text-red-500'>*</span></label><br />
                            <input {...register("name", { required: true, maxLength: 30 })} className='w-full p-2 rounded-md' placeholder='Your Name' type="text" id="name" />
                            {errors.name?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label><span className='font-semibold'>Email</span> <span className='text-black'>*</span></label><br />
                            <input {...register("email")} className='w-full p-2 rounded-md' placeholder='Your Email' type="email" id="email" />
                        </div>
                        <div>
                            <label><span className='font-semibold'>Phone</span> <span className='text-red-500'>*</span></label><br />
                            <PhoneInputWithCountry
                                name="phoneInput"
                                defaultCountry='BD'
                                control={control}
                                international={true}
                                limitMaxLength={true}
                                className='phone-input'
                                rules={{ required: true }} />
                            {errors.phoneInput?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        <div>
                            <label><span className='font-semibold'>Address</span> <span className='text-red-500'>*</span></label><br />
                            <input {...register("address", { required: true })} className='w-full p-2 rounded-md' placeholder='Write Address Here' type="text" id="name" />
                            {errors.address?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label><span className='font-semibold'>Upload Photo</span> <span className='text-red-500'>*</span></label><br />
                            <input {...register("photo", { required: true })} type="file" className="file-input file-input-bordered file-input-primary w-full" />
                            {errors.photo?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label><span className='font-semibold'>Photo URL</span> <span className='text-black'>*</span></label><br />
                            <input disabled className='w-full p-2 rounded-md' type="url" id="photo" />
                        </div>
                    </div>
                    <div className='text-center'>
                        <button disabled={loader} className='mt-6 mb-5'><input className='bg-blue-700 hover:bg-[#252958] uppercase text-white font-semibold p-2 rounded-md' type="submit" value={loader ? "Item Adding..." : "Add To Contact"} /></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContact;