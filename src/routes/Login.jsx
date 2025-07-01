import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import registerPoster from '../assets/images/register-poster.jpg'
import beteweLogo from '../assets/icons/betewe-logo.png'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

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
    // const [validPassword, setValidPassword] = useState(false)

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isEmailEmpty = loginData.email.trim() === '';
    const isPasswordEmpty = loginData.password.trim() === '';
    
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

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    // console.log(loginData);
    // console.log(`
    //     email valid? ${validEmail}
    //     password valid? ${validPassword}
    // `);
    

    return (
        <section className='flex h-screen text-[#2C448C] bg-[#F2F2F2]'>
            <div className='w-1/2 h-full'>
                <img src={registerPoster} className='object-cover h-full w-full' alt="Register Page Poster" />
            </div>
            <div className='w-1/2 h-full py-4 pl-12 pr-6 overflow-auto'>
                <div className='flex justify-end'>
                    <img src={beteweLogo} className='w-20 h-20' alt="Betewe Logo" />
                </div>

                <h1 className='text-[2.25rem] font-bold'>Hai,</h1>
                <h1 className='text-[2.25rem] font-bold'>Selamat datang kembali</h1>
                <p className='text-[1.25rem] mb-6'>Masuk dan temukan jawaban dari rasa penasaranmu.</p>

                <form className='flex flex-col space-y-6'>
                    {/* input email */}
                    <div>
                        <div className={`flex w-[445px] h-[55px] border rounded-[15px] items-center p-[1rem] bg-white ${touchedFields.email && !validEmail ? 'border-[#C90000]' : 'border'} focus-within:border-[#2C448C]`}>
                            <Mail className='mr-4 text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                            <input
                                type="email"
                                placeholder='Email'
                                name='email'
                                value={loginData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='w-[329px] focus:outline-none'
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
                    <div>
                        <div className={`flex justify-between w-[445px] h-[55px] border rounded-[15px] items-center px-4 bg-white ${touchedFields.password && isPasswordEmpty ? 'border-[#C90000]' : 'border'} focus-within:border-[#2C448C]`}>
                            <Lock className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />

                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Kata Sandi'
                                name='password'
                                value={loginData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='flex-1 text-blue-900 mx-4 focus:outline-none text-gray-700'
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
                    
                    <p className="text-sm mt-4 text-end max-w-[445px]">
                        <Link to="#" className="text-[#2C448C]">
                            Lupa kata sandi?
                        </Link>
                    </p>

                    <button 
                        onClick={handleSubmit} 
                        className='text-xl w-[445px] h-[50px] border rounded-[15px] font-bold text-white bg-[#2C448C]'
                    >
                        Masuk
                    </button>
                </form>
                
                {/* login jika sudah punya akun */}
                <p className="text-sm text-black mt-4 text-center max-w-[445px]">
                    Belum memiliki akun?{' '}
                    <Link to="/register" className="text-[#2C448C]">
                        Daftar
                    </Link>
                </p>
            </div>
        </section>
    )
}