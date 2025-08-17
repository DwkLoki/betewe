import { useState, useEffect, useRef } from 'react';
import { ClipLoader } from "react-spinners";
import { useOutletContext } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, SquareArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ChangePassword() {
    const { user, refreshUser } = useOutletContext()
    const fileInputRef = useRef(null);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmedNewPass: ''
    })
    const [touchedFields, setTouchedFields] = useState({
        oldPassword: false,
        newPassword: false,
        confirmedNewPass: false
    })
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmedNewPass, setShowConfirmedNewPass] = useState(false)
    const [validOldPassword, setValidOldPassword] = useState(false)
    const [validNewPassword, setValidNewPassword] = useState(false)
    const [validMatchNewPass, setValidMatchNewPass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=,.])[A-Za-z\d!@#$%^&*()_\-+=,.]{8,}$/ // Kata sandi harus memiliki minimal 8 karakter, mengandung minimal satu huruf besar, satu huruf kecil, satu angka, dan satu simbol (!@#$%^&*()_-+=,.)
    const isOldPasswordEmpty = passwordData.oldPassword.trim() === '';
    const isNewPasswordEmpty = passwordData.newPassword.trim() === '';
    const isConfirmedNewPasswordEmpty = passwordData.confirmedNewPass.trim() === '';

    // console.log('Password Data', passwordData);

    const handleChange = (e) => {
        const { value, name } = e.target

        setTouchedFields(prevTouchedFields => {
            return {
                ...prevTouchedFields,
                [name]: true
            }
        })

        setPasswordData(prevPasswordData => {
            return {
                ...prevPasswordData,
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
        const v1 = passwordRegex.test(passwordData.oldPassword)
        const v2 = passwordRegex.test(passwordData.newPassword)
        const v3 = passwordData.newPassword === passwordData.confirmedNewPass

        setValidOldPassword(v1)
        setValidNewPassword(v2)
        setValidMatchNewPass(v3)

    }, [passwordData])

    const changePassword = async () => {
        const token = localStorage.getItem('TOKEN')
        const newPasswordData = {
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.put('http://localhost:3000/api/auth/user/change-password', newPasswordData, config)

        return response; // hanya kembalikan respons
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Mulai loading
        setIsLoading(true);

        try {
            const res = await changePassword(); // kirim data

            // ✅ Jika berhasil
            toast.success('Kata sandi berhasil diubah 🎉', {
                position: 'top-center',
                autoClose: 2000
            });

            // reset form
            setPasswordData({
                oldPassword: '',
                newPassword: '',
                confirmedNewPass: ''
            })

            console.log(res);
        } catch (error) {
            // Handle error responses
            if (error.response?.status === 400) {
                toast.error('Password lama yang anda masukkan salah.', {
                    position: 'top-center',
                    autoClose: 2000
                })
            } else {
                toast.error('Terjadi kesalahan. Silakan coba lagi nanti.', {
                    position: 'top-center',
                    autoClose: 2000
                })
            }
            console.log(error);
        } finally {
            // Selesai loading (baik sukses maupun gagal)
            // namun delay proses menghilangkan loading 1000ms
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)

            setTouchedFields({
                oldPassword: false,
                newPassword: false,
                confirmedNewPass: false
            });
        }
    }

    return (
        <section className='flex md:flex-row flex-col w-full justify-between gap-5 md:pb-0 pb-6'>
            {/* Form fields sama seperti sebelumnya */}
            <form className='flex flex-col space-y-6'>
                {/* input password lama */}
                <div>
                    <label htmlFor="oldPassword">Kata Sandi Saat Ini</label>
                    <div className={`flex justify-between lg:w-[445px] lg:h-[55px] md:w-[350px] md:h-[50px] border rounded-[15px] items-center p-4 mt-2 bg-white ${touchedFields.oldPassword ? validOldPassword ? ' border-[#00C938]' : 'border-[#C90000]' : 'border-[#BCBCBC]'} focus-within:border-[#2C448C]`}>
                        <Lock className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />

                        <input
                            id='oldPassword'
                            type={showOldPassword ? 'text' : 'password'}
                            // placeholder='Kata Sandi Saat Ini'
                            name='oldPassword'
                            value={passwordData.oldPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='flex-1 text-blue-900 mx-4 focus:outline-none'
                        />

                        <button type='button' onClick={() => setShowOldPassword(prev => !prev)}>
                            {
                                showOldPassword ? (
                                    <Eye className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                                ) : (
                                    <EyeOff className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                                )
                            }
                        </button>
                    </div>
                    {touchedFields.oldPassword && (
                        isOldPasswordEmpty ? (
                            <div className='flex items-center space-x-2 mt-2'>
                                <span className='text-xs'>❌</span>
                                <p className='text-xs text-[#C90000] max-w-[445px]'>
                                    Kolom ini wajib diisi
                                </p>
                            </div>
                        ) : !validOldPassword && (
                            <div className='flex items-center space-x-2 mt-2'>
                                <span className='text-xs'>❌</span>
                                <p className='text-xs text-[#C90000] max-w-[445px]'>
                                    Kata sandi harus memiliki minimal 8 karakter, mengandung minimal satu huruf besar, satu huruf kecil, satu angka, dan satu simbol (!@#$%^&*()_-+=,.)
                                </p>
                            </div>
                        )
                    )}
                </div>

                {/* input password baru */}
                <div>
                    <label htmlFor="newPassword">Kata Sandi Baru</label>
                    <div className={`flex justify-between h-[55px] border rounded-[15px] items-center p-4 mt-2 bg-white ${touchedFields.newPassword ? validNewPassword ? ' border-[#00C938]' : 'border-[#C90000]' : 'border-[#BCBCBC]'} focus-within:border-[#2C448C]`}>
                        <Lock className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />

                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            // placeholder='Kata Sandi Baru'
                            name='newPassword'
                            value={passwordData.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='flex-1 text-blue-900 mx-4 focus:outline-none'
                        />

                        <button type='button' onClick={() => setShowNewPassword(prev => !prev)}>
                            {
                                showNewPassword ? (
                                    <Eye className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                                ) : (
                                    <EyeOff className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                                )
                            }
                        </button>
                    </div>
                    {touchedFields.newPassword && (
                        isNewPasswordEmpty ? (
                            <div className='flex items-center space-x-2 mt-2'>
                                <span className='text-xs'>❌</span>
                                <p className='text-xs text-[#C90000] max-w-[445px]'>
                                    Kolom ini wajib diisi
                                </p>
                            </div>
                        ) : !validNewPassword && (
                            <div className='flex items-center space-x-2 mt-2'>
                                <span className='text-xs'>❌</span>
                                <p className='text-xs text-[#C90000] max-w-[445px]'>
                                    Kata sandi harus memiliki minimal 8 karakter, mengandung minimal satu huruf besar, satu huruf kecil, satu angka, dan satu simbol (!@#$%^&*()_-+=,.)
                                </p>
                            </div>
                        )
                    )}
                </div>

                {/* input konfirmasi password baru */}
                <div>
                    <label htmlFor="oldPassword">Konfirmasi Kata Sandi Baru</label>
                    <div className={`flex justify-between lg:w-[445px] lg:h-[55px] md:w-[350px] md:h-[50px] border rounded-[15px] items-center p-4 mt-2 bg-white ${touchedFields.confirmedNewPass ? validMatchNewPass ? ' border-[#00C938]' : 'border-[#C90000]' : 'border-[#BCBCBC]'} focus-within:border-[#2C448C]`}>
                        <Lock className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />

                        <input
                            type={showConfirmedNewPass ? 'text' : 'password'}
                            // placeholder='Konfirmasi Kata Sandi Baru'
                            name='confirmedNewPass'
                            value={passwordData.confirmedNewPass}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='flex-1 text-blue-900 mx-4 focus:outline-none'
                        />

                        <button type='button' onClick={() => setShowConfirmedNewPass(prev => !prev)}>
                            {
                                showConfirmedNewPass ? (
                                    <Eye className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                                ) : (
                                    <EyeOff className='text-[#BCBCBC]' strokeWidth={1.25} size={25} />
                                )
                            }
                        </button>
                    </div>
                    {touchedFields.confirmedNewPass && (
                        isConfirmedNewPasswordEmpty ? (
                            <div className='flex items-center space-x-2 mt-2'>
                                <span className='text-xs'>❌</span>
                                <p className='text-xs text-[#C90000] max-w-[445px]'>
                                    Kolom ini wajib diisi
                                </p>
                            </div>
                        ) : !validMatchNewPass && (
                            <div className='flex items-center space-x-2 mt-2'>
                                <span className='text-xs'>❌</span>
                                <p className='text-xs text-[#C90000] max-w-[445px]'>
                                    Password tidak sesuai
                                </p>
                            </div>
                        )
                    )}
                </div>
            </form>
            <button
                type='button'
                onClick={handleSubmit}
                disabled={isLoading || !validOldPassword || !validNewPassword || !validMatchNewPass}
                className={`
                    flex justify-center items-center space-x-4 lg:text-xl text-lg w-fit lg:h-[50px] h-[40px] lg:px-4 px-3 border rounded-[15px] font-bold text-white 
                    ${validOldPassword && validNewPassword && validMatchNewPass ? isLoading ? 'bg-[#2C448C] opacity-50 cursor-not-allowed' : 'bg-[#2C448C]' : 'bg-[#BCBCBC] cursor-not-allowed'}
                `}
            >
                <ClipLoader
                    color='white'
                    size={20}
                    loading={isLoading}
                />
                <span>Simpan</span>
            </button>
        </section>
    )
}