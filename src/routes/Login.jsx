import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import registerPoster from '../assets/images/register-poster.jpg'
import beteweLogo from '../assets/icons/betewe-logo.png'
import { Mail, Lock, Eye, EyeOff, SquareArrowLeft } from 'lucide-react';
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify'
import axios from 'axios';

export default function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [touchedFields, setTouchedFields] = useState({
        email: false,
        password: false
    })
    const [showPassword, setShowPassword] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // const [validPassword, setValidPassword] = useState(false)

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isEmailEmpty = loginData.email.trim() === '';
    const isPasswordEmpty = loginData.password.trim() === '';
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { value, name } = e.target

        setTouchedFields(prevTouchedFields => {
            return {
                ...prevTouchedFields,
                [name]: true
            }
        })

        setLoginData(prevRegisterData => {
            return {
                ...prevRegisterData,
                [name]: value
            }
        })
    }

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouchedFields(prev => ({
            ...prev,
            [name]: true
        }));
    };

    useEffect(() => {
        const v1 = emailRegex.test(loginData.email)

        setValidEmail(v1)

    }, [loginData])

    const login = async () => {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email: loginData.email,
            password: loginData.password
        })

        return response
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isEmailEmpty || isPasswordEmpty) {
            // field akan dianggap touched jika user belum menyentuh field 
            // tapi langsung klik "Masuk" 
            setTouchedFields({
                email: true,
                password: true
            });

            toast.error('Formulir mengandung kesalahan atau tidak lengkap.', {
                position: 'top-center',
                autoClose: 2000
            });

            return
        }

        // Mulai loading
        setIsLoading(true);

        try {
            const res = await login(); // kirim data

            // ✅ Jika berhasil
            toast.success('Login berhasil! 🎉', {
                position: 'top-center',
                autoClose: 2000
            });

            localStorage.setItem('TOKEN', res.data.token)

            // beri jeda sedikit sebelum redirect
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);

            console.log(res);
        } catch (error) {
            toast.error('Login gagal.', {
                position: 'top-center',
                autoClose: 2000
            });
            console.log(error);
        } finally {
            // Selesai loading (baik sukses maupun gagal)
            // namun delay proses menghilangkan loading 500ms
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
        }
    }

    return (
        <section className='flex h-screen text-[#2C448C] bg-[#F2F2F2]'>
            <div className='lg:block hidden w-1/2 h-full'>
                <img src={registerPoster} className='object-cover h-full w-full' alt="Register Page Poster" />
            </div>
            <div className='lg:w-1/2 w-full h-full py-4 md:pl-12 pl-6 pr-6 overflow-auto'>
                <div className='flex justify-between'>
                    <Link to='/' className='flex items-center space-x-1'>
                        <SquareArrowLeft color='#2C448C' size={20} />
                        <p>Home</p>
                    </Link>
                    <Link to='/'>
                        <img src={beteweLogo} className='w-20 h-20' alt="Betewe Logo" />
                    </Link>
                </div>

                <h1 className='md:text-[2.25rem] text-3xl font-bold lg:text-start md:text-center'>Hai,</h1>
                <h1 className='md:text-[2.25rem] text-3xl font-bold lg:text-start md:text-center'>Selamat datang kembali</h1>
                <p className='md:text-[1.25rem] mb-6 lg:text-start md:text-center'>Masuk dan temukan jawaban dari rasa penasaranmu.</p>

                <form className='flex flex-col lg:items-start items-center space-y-6 w-full'>
                    {/* input email */}
                    <div className='md:w-[445px] w-full'>
                        <div className={`flex h-[55px] border rounded-[15px] items-center p-4 bg-white ${touchedFields.email && !validEmail ? 'border-[#C90000]' : 'border'} focus-within:border-[#2C448C]`}>
                            <Mail className='mr-4 text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                            <input
                                type="email"
                                placeholder='Email'
                                name='email'
                                value={loginData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='md:w-[329px] w-full focus:outline-none'
                            />
                        </div>
                        {touchedFields.email && (
                            isEmailEmpty ? (
                                <div className='flex items-center space-x-2 mt-2'>
                                    <span className='text-xs'>❌</span>
                                    <p className='text-xs text-[#C90000] max-w-[445px]'>
                                        Kolom ini wajib diisi
                                    </p>
                                </div>
                            ) : !validEmail && (
                                <div className='flex items-center space-x-2 mt-2'>
                                    <span className='text-xs'>❌</span>
                                    <p className='text-xs text-[#C90000] max-w-[445px]'>
                                        Format email tidak valid
                                    </p>
                                </div>
                            )
                        )}
                    </div>

                    {/* input password */}
                    <div className='md:w-[445px] w-full'>
                        <div className={`flex h-[55px] justify-between border rounded-[15px] items-center p-4 bg-white ${touchedFields.password && isPasswordEmpty ? 'border-[#C90000]' : 'border'} focus-within:border-[#2C448C]`}>
                            <Lock className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />

                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Kata Sandi'
                                name='password'
                                value={loginData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='flex-1 text-blue-900 mx-4 focus:outline-none'
                            />

                            <button type='button' onClick={() => setShowPassword(prev => !prev)}>
                                {
                                    showPassword ? (
                                        <Eye className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                                    ) : (
                                        <EyeOff className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                                    )
                                }
                            </button>
                        </div>
                        {touchedFields.password && isPasswordEmpty && (
                            <div className='flex items-center space-x-2 mt-2'>
                                <span className='text-xs'>❌</span>
                                <p className='text-xs text-[#C90000] max-w-[445px]'>
                                    Kolom ini wajib diisi
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="inline-flex justify-end text-sm mt-4 md:w-[445px] w-full">
                        <Link to="#" className="text-[#2C448C]">
                            Lupa kata sandi?
                        </Link>
                    </p>

                    <button
                        onClick={handleSubmit}
                        className={`
                            flex items-center justify-center space-x-4 text-xl md:w-[445px] w-full h-[50px] border rounded-[15px] font-bold text-white 
                            ${isLoading ? 'bg-[#2C448C] opacity-50 cursor-not-allowed' : 'bg-[#2C448C]'} 
                        `}
                    >
                        <ClipLoader
                            color='white'
                            size={20}
                            loading={isLoading}
                        />
                        <span>Masuk</span>
                    </button>
                </form>

                {/* login jika sudah punya akun */}
                <p className="inline-flex gap-1 text-sm text-black mt-4 justify-center lg:w-[445px] w-full">
                    Belum memiliki akun?
                    <Link to="/register" className="text-[#2C448C]">
                        Daftar
                    </Link>
                </p>
            </div>
        </section>
    )
}