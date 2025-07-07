import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import registerPoster from '../assets/images/register-poster.jpg'
import beteweLogo from '../assets/icons/betewe-logo.png'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Register() {
    const [registerData, setRegisterData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmedPass: ''
    }) 
    const [touchedFields, setTouchedFields] = useState({
        userName: false,
        email: false,
        password: false,
        confirmedPass: false
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmedPass, setShowConfirmedPass] = useState(false)
    const [validUserName, setValidUserName] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [validMatchPass, setValidMatchPass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9._]{2,49}$/ // minimal 3 karakter, max 50 | Boleh huruf, angka, underscore, dan titik | Tidak boleh diawali karakter spesial ( _ atau . )
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=,.])[A-Za-z\d!@#$%^&*()_\-+=,.]{8,}$/ // Kata sandi harus memiliki minimal 8 karakter, mengandung minimal satu huruf besar, satu huruf kecil, satu angka, dan satu simbol (!@#$%^&*()_-+=,.)
    const isUserNameEmpty = registerData.userName.trim() === ''; // Untuk validasi form (misalnya input kosong tapi user isi spasi)
    const isEmailEmpty = registerData.email.trim() === '';
    const isPasswordEmpty = registerData.password.trim() === '';
    const isConfirmedPasswordEmpty = registerData.confirmedPass.trim() === '';
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { value, name } = e.target

        setTouchedFields(prevTouchedFields => {
            return {
                ...prevTouchedFields,
                [name]: true
            }
        })
        
        setRegisterData(prevRegisterData => {
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
        const v1 = usernameRegex.test(registerData.userName)
        const v2 = emailRegex.test(registerData.email)
        const v3 = passwordRegex.test(registerData.password)
        const v4 = registerData.password === registerData.confirmedPass

        setValidUserName(v1)
        setValidEmail(v2)
        setValidPassword(v3)
        setValidMatchPass(v4)

    }, [registerData])

    const register = async () => {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
            username: registerData.userName,
            email: registerData.email,
            password: registerData.password
        })

        return response; // hanya kembalikan respons
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Mulai loading
        setIsLoading(true);

        try {
            const res = await register(); // kirim data

            // ✅ Jika berhasil
            toast.success('Registrasi berhasil! Silakan login 🎉', {
                position: 'top-center',
                autoClose: 2000
            });

            // beri jeda sedikit sebelum redirect
            setTimeout(() => {
                navigate('/login');
            }, 1500);

            console.log(res);
        } catch (error) {
            toast.error('Registrasi gagal.', {
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

    // console.log(registerData);
    // console.log(`
    //     username valid? ${validUserName}
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
                <h1 className='text-[2.25rem] font-bold'>Hai, Selamat datang</h1>
                <p className='text-[1.25rem] mb-6'>Daftarkan akunmu untuk mendapatkan akses fitur lebih.</p>

                <form className='flex flex-col space-y-6'>
                    {/* input username */}
                    <div>
                        <div className={`flex w-[445px] h-[55px] border rounded-[15px] items-center p-[1rem] bg-white ${touchedFields.userName ? validUserName ? 'border-[#00C938]' : 'border-[#C90000]' : 'border'} focus-within:border-[#2C448C]`}>
                            <User className='mr-4 text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                            <input
                                type="text"
                                placeholder='Nama Pengguna'
                                name='userName'
                                value={registerData.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='w-[329px] focus:outline-none'
                            />
                        </div>
                        {touchedFields.userName && (
                            isUserNameEmpty ? (
                                <div className='flex items-center space-x-2 mt-2'>
                                    <span className='text-xs'>❌</span>
                                    <p className='text-xs text-[#C90000] max-w-[445px]'>
                                        Kolom ini wajib diisi
                                    </p>
                                </div>
                            ) : !validUserName && (
                                <div className='flex items-center space-x-2 mt-2'>
                                    <span className='text-xs'>❌</span>
                                    <p className='text-xs text-[#C90000] max-w-[445px]'>
                                        Username harus memiliki minimal 3 karakter, hanya boleh mengandung huruf, angka, underscore, dan titik. Tidak boleh diawali karakter spesial (_ atau .)
                                    </p>
                                </div>
                            )
                        )}
                    </div>

                    {/* input email */}
                    <div>
                        <div className={`flex w-[445px] h-[55px] border rounded-[15px] items-center p-[1rem] bg-white ${touchedFields.email ? validEmail ? 'border-[#00C938]' : 'border-[#C90000]' : 'border'} focus-within:border-[#2C448C]`}>
                            <Mail className='mr-4 text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                            <input
                                type="email"
                                placeholder='Email'
                                name='email'
                                value={registerData.email}
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
                        <div className={`flex justify-between w-[445px] h-[55px] border rounded-[15px] items-center px-4 bg-white ${touchedFields.password ? validPassword ? ' border-[#00C938]' : 'border-[#C90000]' : 'border'} focus-within:border-[#2C448C]`}>
                            <Lock className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />

                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Kata Sandi'
                                name='password'
                                value={registerData.password}
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
                        {touchedFields.password && (
                            isPasswordEmpty ? (
                                <div className='flex items-center space-x-2 mt-2'>
                                    <span className='text-xs'>❌</span>
                                    <p className='text-xs text-[#C90000] max-w-[445px]'>
                                        Kolom ini wajib diisi
                                    </p>
                                </div>
                            ) : !validPassword && (
                                <div className='flex items-center space-x-2 mt-2'>
                                    <span className='text-xs'>❌</span>
                                    <p className='text-xs text-[#C90000] max-w-[445px]'>
                                        Kata sandi harus memiliki minimal 8 karakter, mengandung minimal satu huruf besar, satu huruf kecil, satu angka, dan satu simbol (!@#$%^&*()_-+=,.)
                                    </p>
                                </div>
                            )
                        )}
                    </div>

                    {/* input konfirmasi password */}
                    <div>
                        <div className={`flex justify-between w-[445px] h-[55px] border rounded-[15px] items-center px-4 bg-white ${touchedFields.confirmedPass ? validMatchPass ? ' border-[#00C938]' : 'border-[#C90000]' : 'border'} focus-within:border-[#2C448C]`}>
                            <Lock className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />

                            <input
                                type={showConfirmedPass ? 'text' : 'password'}
                                placeholder='Konfirmasi Kata Sandi'
                                name='confirmedPass'
                                value={registerData.confirmedPass}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='flex-1 text-blue-900 mx-4 focus:outline-none text-gray-700'
                            />

                            <button type='button' onClick={() => setShowConfirmedPass(prev => !prev)}>
                                {
                                    showConfirmedPass ? (
                                        <Eye className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                                    ) : (
                                        <EyeOff className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                                    )
                                }
                            </button>
                        </div>
                        {touchedFields.confirmedPass && (
                            isConfirmedPasswordEmpty ? (
                                <div className='flex items-center space-x-2 mt-2'>
                                    <span className='text-xs'>❌</span>
                                    <p className='text-xs text-[#C90000] max-w-[445px]'>
                                        Kolom ini wajib diisi
                                    </p>
                                </div>
                            ) : !validMatchPass && (
                                <div className='flex items-center space-x-2 mt-2'>
                                    <span className='text-xs'>❌</span>
                                    <p className='text-xs text-[#C90000] max-w-[445px]'>
                                        Password tidak sesuai
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                    <button 
                        type='button'
                        onClick={handleSubmit} 
                        disabled={isLoading || !validUserName || !validEmail || !validPassword || !validMatchPass}
                        className={`
                            flex justify-center items-center space-x-4 text-xl w-[445px] h-[50px] border rounded-[15px] font-bold text-white 
                            ${validUserName && validEmail && validPassword && validMatchPass ? isLoading ? 'bg-[#2C448C] opacity-50 cursor-not-allowed' : 'bg-[#2C448C]' : 'bg-[#BCBCBC] cursor-not-allowed'}
                        `}
                    >
                        <ClipLoader 
                            color='white'
                            size={20}
                            loading={isLoading}
                        />
                        <span>Daftar</span>
                    </button>
                </form>
                
                {/* login jika sudah punya akun */}
                <p className="text-sm text-black mt-4 text-center max-w-[445px]">
                    Sudah memiliki akun?{' '}
                    <Link to="/login" className="text-[#2C448C]">
                        Masuk
                    </Link>
                </p>
            </div>
        </section>
    )
}