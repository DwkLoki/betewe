// import { useState, useEffect, useRef } from 'react';
// import { ClipLoader } from "react-spinners";
// import { useOutletContext } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// export default function EditProfile() {
//     const user = useOutletContext()
//     const fileInputRef = useRef(null);
//     const [profileData, setProfileData] = useState({
//         username: '',
//         email: '',
//         nama_lengkap: '',
//         foto_profil: '',
//         jurusan: ''
//     }) 
//     const [touchedFields, setTouchedFields] = useState({
//         username: false,
//         email: false,
//         nama_lengkap: false,
//         jurusan: false
//     })
//     // console.log(profileData);

//     const [validUserName, setValidUserName] = useState(false)
//     const [validEmail, setValidEmail] = useState(false)
//     const [isLoading, setIsLoading] = useState(false)

//     const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9._]{2,49}$/ // minimal 3 karakter, max 50 | Boleh huruf, angka, underscore, dan titik | Tidak boleh diawali karakter spesial ( _ atau . )
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
//     const isUserNameEmpty = profileData.username.trim() === ''; // Untuk validasi form (misalnya input kosong tapi user isi spasi)
//     const isEmailEmpty = profileData.email.trim() === '';

//     useEffect(() => {
//         getMe(); // hanya ambil user dulu
//     }, []);

//     useEffect(() => {
//         const v1 = usernameRegex.test(profileData.username)
//         const v2 = emailRegex.test(profileData.email)

//         setValidUserName(v1)
//         setValidEmail(v2)

//     }, [profileData])

//     const getMe = async () => {
//         try {
//             const token = localStorage.getItem("TOKEN");
//             const response = await axios.get('http://localhost:3000/api/auth/user/me', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             setProfileData({
//                 username: response.data.username || '',
//                 email: response.data.email || '',
//                 nama_lengkap: response.data.nama_lengkap || null,
//                 foto_profil: response.data.foto_profil || '',
//                 jurusan: response.data.jurusan || null
//             });
//         } catch (err) {
//             console.error("Gagal mengambil data user:", err);
//         }
//     };   

//     const handleChange = (e) => {
//         const { value, name } = e.target

//         setTouchedFields(prevTouchedFields => {
//             return {
//                 ...prevTouchedFields,
//                 [name]: true
//             }
//         })

//         setProfileData(prevData => {
//             return {
//                 ...prevData,
//                 [name]: value
//             }
//         })
//     }

//     const handleBlur = (e) => {
//         const { name } = e.target;
//         setTouchedFields(prev => ({
//             ...prev,
//             [name]: true
//         }));
//     };

//     const updateMe = async () => {
//         const token = localStorage.getItem('TOKEN')
//         const response = await axios.put('http://localhost:3000/api/auth/user/me', profileData, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         })

//         return response; // hanya kembalikan respons
//     }

//     const handleFileChange = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const formData = new FormData();
//         formData.append('foto_profil', file);

//         try {
//             const token = localStorage.getItem("TOKEN");
//             const res = await axios.post('http://localhost:3000/api/auth/user/profile-picture', formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             // Update preview setelah berhasil upload
//             setProfileData(prev => ({
//                 ...prev,
//                 foto_profil: res.data.foto_profil_url // pastikan backend mengembalikan URL
//             }));

//             toast.success('Foto profil berhasil diperbarui');
//         } catch (err) {
//             console.error("Gagal upload foto:", err);
//             toast.error('Gagal upload foto');
//         }
//     };         

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         console.log(profileData)

//         // Mulai loading
//         setIsLoading(true);

//         try {
//             const res = await updateMe(); // kirim data

//             // ✅ Jika berhasil
//             toast.success('Ubah data profil berhasil! 🎉', {
//                 position: 'top-center',
//                 autoClose: 2000
//             });

//             console.log(res);
//         } catch (error) {
//             toast.error('Ubah data profil gagal.', {
//                 position: 'top-center',
//                 autoClose: 2000
//             });
//             console.log(error);
//         } finally {
//             // Selesai loading (baik sukses maupun gagal)
//             // namun delay proses menghilangkan loading 1000ms
//             setTimeout(() => {
//                 setIsLoading(false);
//             }, 1000)

//             // form kembali seperti semula
//             setTouchedFields({
//                 username: false,
//                 email: false,
//                 nama_lengkap: false,
//                 jurusan: false
//             });
//         }
//     }
    
//     return (
//         <section className='flex justify-between'>
//             <div>
//                 <div className='flex items-center space-x-5 mb-12'>
//                     <img src={profileData?.foto_profil} alt="Profile Capture" className='w-24 h-24 rounded-full object-cover' />
//                     <input
//                         type="file"
//                         accept="image/*"
//                         ref={fileInputRef}
//                         onChange={handleFileChange}
//                         style={{ display: 'none' }}
//                     />
//                     <div>
//                         <p className='pb-1 text-lg'>{user?.username}</p>
//                         <button 
//                             type="button"
//                             className='text-[#2C448C] text-sm font-bold'
//                             onClick={() => fileInputRef.current.click()}
//                         >
//                             Ubah foto profil
//                         </button>
//                     </div>
//                 </div>

//                 <form className='flex flex-col space-y-6'>
//                     {/* input username */}
//                     <div>
//                         <label htmlFor="userName">Nama Pengguna</label>
//                         <div className={`flex w-[445px] h-[55px] border rounded-[15px] items-center p-[1rem] mt-2 bg-white ${touchedFields.username ? validUserName ? 'border-[#00C938]' : 'border-[#C90000]' : 'border-[#BCBCBC]'} focus-within:border-[#2C448C]`}>
//                             <input
//                                 id='userName'
//                                 type="text"
//                                 name='username'
//                                 value={profileData.username}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 className='w-full focus:outline-none'
//                             />
//                         </div>
//                         {touchedFields.username && (
//                             isUserNameEmpty ? (
//                                 <div className='flex items-center space-x-2 mt-2'>
//                                     <span className='text-xs'>❌</span>
//                                     <p className='text-xs text-[#C90000] max-w-[445px]'>
//                                         Kolom ini wajib diisi
//                                     </p>
//                                 </div>
//                             ) : !validUserName && (
//                                 <div className='flex items-center space-x-2 mt-2'>
//                                     <span className='text-xs'>❌</span>
//                                     <p className='text-xs text-[#C90000] max-w-[445px]'>
//                                         Username harus memiliki minimal 3 karakter, hanya boleh mengandung huruf, angka, underscore, dan titik. Tidak boleh diawali karakter spesial (_ atau .)
//                                     </p>
//                                 </div>
//                             )
//                         )}
//                     </div>

//                     {/* input email */}
//                     <div>
//                         <label htmlFor="email">Email</label>
//                         <div className={`flex w-[445px] h-[55px] border rounded-[15px] items-center p-[1rem] mt-2 bg-white ${touchedFields.email ? validEmail ? 'border-[#00C938]' : 'border-[#C90000]' : 'border-[#BCBCBC]'} focus-within:border-[#2C448C]`}>
//                             <input
//                                 id='email'
//                                 type="email"
//                                 name='email'
//                                 value={profileData.email}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 className='w-full focus:outline-none'
//                             />
//                         </div>
//                         {touchedFields.email && (
//                             isEmailEmpty ? (
//                                 <div className='flex items-center space-x-2 mt-2'>
//                                     <span className='text-xs'>❌</span>
//                                     <p className='text-xs text-[#C90000] max-w-[445px]'>
//                                         Kolom ini wajib diisi
//                                     </p>
//                                 </div>
//                             ) : !validEmail && (
//                                 <div className='flex items-center space-x-2 mt-2'>
//                                     <span className='text-xs'>❌</span>
//                                     <p className='text-xs text-[#C90000] max-w-[445px]'>
//                                         Format email tidak valid
//                                     </p>
//                                 </div>
//                             )
//                         )}
//                     </div>

//                     {/* input nama lengkap */}
//                     <div>
//                         <label htmlFor="namaLengkap">Nama Lengkap</label>
//                         <div className={`flex w-[445px] h-[55px] border border-[#BCBCBC] rounded-[15px] items-center p-[1rem] mt-2 bg-white focus-within:border-[#2C448C]`}>
//                             <input
//                                 id='namaLengkap'
//                                 type="text"
//                                 name='nama_lengkap'
//                                 value={profileData.nama_lengkap}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 className='w-full focus:outline-none'
//                             />
//                         </div>
//                     </div>

//                     {/* input jurusan */}
//                     <div>
//                         <label htmlFor="jurusan">Program Studi</label>
//                         <div className={`flex w-[445px] h-[55px] border border-[#BCBCBC] rounded-[15px] items-center p-[1rem] mt-2 bg-white focus-within:border-[#2C448C]`}>
//                             <input
//                                 id='jurusan'
//                                 type="text"
//                                 name='jurusan'
//                                 value={profileData.jurusan}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 className='w-full focus:outline-none'
//                             />
//                         </div>
//                     </div>
//                 </form>
//             </div>
//             <button
//                 type='button'
//                 onClick={handleSubmit}
//                 disabled={isLoading || !validUserName || !validEmail }
//                 className={`
//                             flex justify-center items-center space-x-4 text-xl w-fit h-[50px] px-4 border rounded-[15px] font-bold text-white 
//                             ${validUserName && validEmail ? isLoading ? 'bg-[#2C448C] opacity-50 cursor-not-allowed' : 'bg-[#2C448C]' : 'bg-[#BCBCBC] cursor-not-allowed'}
//                         `}
//             >
//                 <ClipLoader
//                     color='white'
//                     size={20}
//                     loading={isLoading}
//                 />
//                 <span>Simpan</span>
//             </button>
//         </section>
//     )
// }

import { useState, useEffect, useRef } from 'react';
import { ClipLoader } from "react-spinners";
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function EditProfile() {
    const { user, refreshUser } = useOutletContext()
    const fileInputRef = useRef(null);
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        nama_lengkap: '',
        foto_profil: '',
        jurusan: ''
    })
    const [touchedFields, setTouchedFields] = useState({
        username: false,
        email: false,
        nama_lengkap: false,
        jurusan: false
    })
    const [validUserName, setValidUserName] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false) // Tambahan state untuk upload

    const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9._]{2,49}$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isUserNameEmpty = profileData.username.trim() === '';
    const isEmailEmpty = profileData.email.trim() === '';

    console.log(profileData);

    useEffect(() => {
        getMe();
    }, []);

    useEffect(() => {
        const v1 = usernameRegex.test(profileData.username)
        const v2 = emailRegex.test(profileData.email)

        setValidUserName(v1)
        setValidEmail(v2)
    }, [profileData])

    const getMe = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await axios.get('http://localhost:3000/api/auth/user/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProfileData({
                username: response.data.username || '',
                email: response.data.email || '',
                nama_lengkap: response.data.nama_lengkap || '',
                foto_profil: response.data.foto_profil || '',
                jurusan: response.data.jurusan || ''
            });
        } catch (err) {
            console.error("Gagal mengambil data user:", err);
            toast.error('Gagal mengambil data user');
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target

        setTouchedFields(prevTouchedFields => ({
            ...prevTouchedFields,
            [name]: true
        }))

        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouchedFields(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const updateMe = async () => {
        const token = localStorage.getItem('TOKEN')
        const response = await axios.put('http://localhost:3000/api/auth/user/me', profileData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response;
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validasi ukuran file (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Ukuran file terlalu besar. Maksimal 5MB');
            return;
        }

        // Validasi tipe file
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Tipe file tidak didukung. Gunakan JPEG, PNG, atau GIF');
            return;
        }

        const formData = new FormData();
        formData.append('foto_profil', file);

        setIsUploading(true); // Mulai loading upload

        try {
            const token = localStorage.getItem("TOKEN");
            const res = await axios.post('http://localhost:3000/api/auth/user/profile-picture', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Update preview setelah berhasil upload
            setProfileData(prev => ({
                ...prev,
                foto_profil: res.data.foto_profil
            }));

            // refresh user
            await refreshUser();

            toast.success('Foto profil berhasil diperbarui! 🎉', {
                position: 'top-center',
                autoClose: 2000
            });
        } catch (err) {
            console.error("Gagal upload foto:", err);
            toast.error(err.response?.data?.error || 'Gagal upload foto', {
                position: 'top-center',
                autoClose: 2000
            });
        } finally {
            setIsUploading(false); // Selesai loading upload
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(profileData)

        setIsLoading(true);

        try {
            const res = await updateMe();

            toast.success('Ubah data profil berhasil! 🎉', {
                position: 'top-center',
                autoClose: 2000
            });

            console.log(res);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Ubah data profil gagal.', {
                position: 'top-center',
                autoClose: 2000
            });
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)

            setTouchedFields({
                username: false,
                email: false,
                nama_lengkap: false,
                jurusan: false
            });
        }
    }

    return (
        <section className='flex justify-between'>
            <div>
                <div className='flex items-center space-x-5 mb-12'>
                    <div className="relative">
                        <img
                            src={profileData?.foto_profil
                                ? profileData.foto_profil.startsWith('http')
                                    ? profileData.foto_profil
                                    : `http://localhost:3000${profileData.foto_profil}`
                                : '/default-avatar.png'
                            }
                            alt="Profile Capture"
                            className='w-24 h-24 rounded-full object-cover'
                        />
                        {isUploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                <ClipLoader color='white' size={20} />
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <div>
                        <p className='pb-1 text-lg'>{user?.username}</p>
                        <button
                            type="button"
                            className='text-[#2C448C] text-sm font-bold disabled:opacity-50'
                            onClick={() => fileInputRef.current.click()}
                            disabled={isUploading}
                        >
                            {isUploading ? 'Mengupload...' : 'Ubah foto profil'}
                        </button>
                    </div>
                </div>

                {/* Form fields sama seperti sebelumnya */}
                <form className='flex flex-col space-y-6'>
                    {/* Username field */}
                    <div>
                        <label htmlFor="userName">Nama Pengguna</label>
                        <div className={`flex w-[445px] h-[55px] border rounded-[15px] items-center p-[1rem] mt-2 bg-white ${touchedFields.username ? validUserName ? 'border-[#00C938]' : 'border-[#C90000]' : 'border-[#BCBCBC]'} focus-within:border-[#2C448C]`}>
                            <input
                                id='userName'
                                type="text"
                                name='username'
                                value={profileData.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='w-full focus:outline-none'
                            />
                        </div>
                        {touchedFields.username && (
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

                    {/* Email field */}
                    <div>
                        <label htmlFor="email">Email</label>
                        <div className={`flex w-[445px] h-[55px] border rounded-[15px] items-center p-[1rem] mt-2 bg-white ${touchedFields.email ? validEmail ? 'border-[#00C938]' : 'border-[#C90000]' : 'border-[#BCBCBC]'} focus-within:border-[#2C448C]`}>
                            <input
                                id='email'
                                type="email"
                                name='email'
                                value={profileData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='w-full focus:outline-none'
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

                    {/* Nama lengkap field */}
                    <div>
                        <label htmlFor="namaLengkap">Nama Lengkap</label>
                        <div className={`flex w-[445px] h-[55px] border border-[#BCBCBC] rounded-[15px] items-center p-[1rem] mt-2 bg-white focus-within:border-[#2C448C]`}>
                            <input
                                id='namaLengkap'
                                type="text"
                                name='nama_lengkap'
                                value={profileData.nama_lengkap}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='w-full focus:outline-none'
                            />
                        </div>
                    </div>

                    {/* Jurusan field */}
                    <div>
                        <label htmlFor="jurusan">Program Studi</label>
                        <div className={`flex w-[445px] h-[55px] border border-[#BCBCBC] rounded-[15px] items-center p-[1rem] mt-2 bg-white focus-within:border-[#2C448C]`}>
                            <input
                                id='jurusan'
                                type="text"
                                name='jurusan'
                                value={profileData.jurusan}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='w-full focus:outline-none'
                            />
                        </div>
                    </div>
                </form>
            </div>
            <button
                type='button'
                onClick={handleSubmit}
                disabled={isLoading || !validUserName || !validEmail}
                className={`
                    flex justify-center items-center space-x-4 text-xl w-fit h-[50px] px-4 border rounded-[15px] font-bold text-white 
                    ${validUserName && validEmail ? isLoading ? 'bg-[#2C448C] opacity-50 cursor-not-allowed' : 'bg-[#2C448C]' : 'bg-[#BCBCBC] cursor-not-allowed'}
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