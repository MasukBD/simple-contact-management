import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import MySvg from '../../assets/images/login.svg';
import google from '../../assets/images/google.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Login = () => {
    const [error, setError] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { loginwithEmailPassword, googleLogin, passwordReset } = useContext(AuthContext);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(4);
    }, []);

    const onSubmit = async (data) => {
        if (!validateCaptcha(data.captcha)) {
            setError("Captcha doesn't match!")
            return;
        }
        loginwithEmailPassword(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                reset();
                setError('');
                toast.success('Login Successfull!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                setError(`${error.message}`);
            })
    };

    const handleForgetPassword = async () => {
        const { value: email } = await Swal.fire({
            title: "Enter Your Account Email",
            input: "email",
            inputLabel: "Your email address",
            inputPlaceholder: "Enter your email address"
        });
        if (email) {
            passwordReset(email)
                .then(() => {
                    setError('');
                    // SweetAlert Here 
                    let timerInterval;
                    Swal.fire({
                        title: `Check ${email}`,
                        html: "Password Reset email sent in <b></b> milliseconds.",
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
                            //Alert Closed
                        }
                    });
                    // SweetAlert Ends Here 
                })
                .catch(error => {
                    setError(`${error.message}`)
                })
        }
    }

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
                        toast.success('Sign In Successfully!')
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => {
                setError(`${error.message}`)
            })
    }

    return (
        <>
            <Helmet><title>Login - Contact - Management - System</title></Helmet>
            <div className='min-h-screen flex items-center justify-center w-full md:w-10/12 mx-auto mb-5 p-2'>
                <div className='grid w-full grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex items-center justify-center'>
                        <img className='md:scale-125 lg:scale-110' src={MySvg} alt="" />
                    </div>
                    <div className='bg-base-100 h-fit shadow-md shadow-pink-500 p-2'>
                        <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-3'>
                            <h1 className='text-center text-2xl font-bold my-6 text-pink-600'>Please Login</h1>
                            <div>
                                <label className='font-semibold'>Email</label><br />
                                <input {...register("email", { required: true })} placeholder='Enter Your Email' className='w-full border p-2 rounded-md' type="email" id="email" />
                                {errors.email?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                            </div>
                            <div>
                                <label className='font-semibold'>Password</label><br />
                                <input {...register("password", { required: true })} placeholder='Enter Your Password' className='w-full border p-2 rounded-md' type="password" id="password" />
                                <span onClick={handleForgetPassword} className='text-xs text-blue-500 hover:underline cursor-pointer my-0.5'>Forget Password?</span>
                                {errors.password?.type === 'required' && <span className='text-sm text-red-500 py-0.5'>This field is required!</span>}
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
                                <button className='my-3 w-full'><input className='p-2 w-full hover:bg-[#252958] bg-blue-700 text-white font-semibold' type="submit" value="Login" /></button>
                            </div>
                        </form>
                        <p>Don't have an Account? <Link className='text-blue-500 underline' to='/register'>Register</Link></p>
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

export default Login;