import React, { useContext, useEffect, useState } from 'react';
import mySvg from '../../assets/images/signup.svg';
import { Helmet } from 'react-helmet-async';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { Link, useNavigate } from 'react-router-dom';
import google from '../../assets/images/google.png';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const Register = () => {
    const [error, setError] = useState('');
    const { createUserByEmailAndPassword, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        loadCaptchaEnginge(4);
    }, []);

    const onSubmit = async (data) => {
        if (!validateCaptcha(data.captcha)) {
            setError("Captcha doesn't match!")
            return;
        }
        const userData = { name: data.name, email: data.email, role: 'user' };
        createUserByEmailAndPassword(data.email, data.password)
            .then(result => {
                const newUser = result.user;
                updateProfile(newUser, { displayName: data.name ? data.name : 'No name' })
                fetch('https://contact-management-server-theta.vercel.app/users', {
                    method: "POST",
                    headers:
                    {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            sendEmailVerification(newUser)
                                .then(() => {
                                    // SweetAlert Part Start Here 
                                    let timerInterval;
                                    Swal.fire({
                                        title: "Registration Successfull!",
                                        html: "A Verification Email Send In <b></b> milliseconds.",
                                        timer: 2000,
                                        timerProgressBar: true,
                                        didOpen: () => {
                                            Swal.showLoading();
                                            const timer = Swal.getPopup().querySelector("b");
                                            timerInterval = setInterval(() => {
                                                timer.textContent = `${Swal.getTimerLeft()}`;
                                            }, 100);
                                        },
                                        willClose: () => {
                                            clearInterval(timerInterval);
                                        }
                                    }).then((result) => {
                                        /* Read more about handling dismissals below */
                                        if (result.dismiss === Swal.DismissReason.timer) {
                                            //Success
                                        }
                                    });
                                    // SweetAlert Pop Up end Here 
                                    setError('');
                                    reset();
                                    navigate('/')
                                })
                        }
                    })
            })
            .catch(error => {
                setError(`${error.message}`)
            })
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const newUser = result.user;
                const userData = { name: newUser.displayName, email: newUser.email, role: 'user' };
                fetch('https://contact-management-server-theta.vercel.app/users', {
                    method: "POST",
                    headers:
                    {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(() => {
                        setError('');
                        toast.success('SignIn Successfully!')
                        navigate('/')
                    })
            })
            .catch(error => {
                setError(`${error.message}`)
            })
    }

    return (
        <>
            <Helmet><title>Sign Up - Contact - Management - System</title></Helmet>
            <div className='min-h-screen flex items-center justify-center w-full md:w-10/12 mx-auto mb-5 p-2'>
                <div className='grid w-full grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex items-center justify-center md:order-2'>
                        <img className='md:scale-125 lg:scale-110' src={mySvg} alt="" />
                    </div>
                    <div className='bg-base-100 h-fit shadow-md shadow-pink-500 p-2 md:order-1'>
                        <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-2'>
                            <h1 className='text-center text-2xl font-bold my-6 text-pink-600'>Sign Up</h1>
                            <div>
                                <label className='font-semibold'>Name</label><br />
                                <input {...register("name", { maxLength: 30 })} placeholder='Enter Your name' className='w-full border p-2 rounded-md' type="text" id="name" />
                                {errors.name?.type === 'maxLength' && <span className='text-sm text-red-500'>Name character exceeds limit!</span>}
                            </div>
                            <div>
                                <label className='font-semibold'>Email</label><br />
                                <input {...register("email", { required: true })} placeholder='Enter Your Email' className='w-full border p-2 rounded-md' type="email" id="email" />
                                {errors.email?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                            </div>
                            <div>
                                <label className='font-semibold'>Password</label><br />
                                <input {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, maxLength: 16 })} placeholder='Enter Your Password' className='w-full border p-2 rounded-md' type="password" id="password" />
                                {errors.password?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                                {errors.password?.type === 'minLength' && <span className='text-sm text-red-500'>Password Should be at least 6 character!</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-sm text-red-500'>Password could be max 16 character!</span>}
                                {errors.password?.type === 'pattern' && <span className='text-sm text-red-500'>Password Should include at least one small,one capital latter, one number and one special'@#$!&*' .</span>}
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex gap-5 flex-col lg:flex-row'>
                                    <LoadCanvasTemplate />
                                    <input {...register("captcha")} placeholder='Write Captcha Here' className='grow border rounded-md p-2' type="text" id="captcha" />
                                </div>
                                {
                                    error && <span className='font-semibold text-red-500'>{error}</span>
                                }
                            </div>
                            <div>
                                <button className='my-3 w-full'><input className='p-2 w-full hover:bg-[#252958] bg-blue-700 text-white font-semibold' type="submit" value="Sign Up" /></button>
                            </div>
                        </form>
                        <p>Already have an Account? <Link className='text-blue-500 underline' to='/login'>Login</Link></p>
                        <div className="divider font-semibold">Continue With</div>
                        <div className='flex mt-5 justify-center'>
                            <img onClick={handleGoogleLogin} title='google' className='w-10 cursor-pointer' src={google} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;