import optionsIcon from '../assets/icons/options.svg'
import upvoteIcon from '../assets/icons/upvote.svg'
import downvoteIcon from '../assets/icons/downvote.svg'
// import profilePhoto from '../assets/images/avatar-testi1.png'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'  // opsional kalau mau bahasa Indonesia
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify';
import AddAnswerModal from './AddAnswerModal'
import axios from 'axios'

export default function Question(props) {
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => setIsOpen(false)
    // console.log(props);

    const upvote = async () => {
        try {
            const token = localStorage.getItem('TOKEN')
            const response = await axios.post(`http://localhost:3000/api/questions/${props.data.id}/upvote`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            toast.success('Upvoted berhasil!', {
                position: 'top-center',
                autoClose: 2000
            })

            console.log(response);
        } catch (error) {
            // Handle error responses
            if (error.response?.status === 400) {
                toast.error('Kamu sudah memberikan upvote pada pertanyaan ini.', {
                    position: 'top-center',
                    autoClose: 2000
                })
            } else if (error.response?.status === 401) {
                toast.error('Silakan login terlebih dahulu untuk memberikan vote.', {
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
        }
    }

    const downvote = async () => {
        try {
            const token = localStorage.getItem('TOKEN')
            const response = await axios.post(`http://localhost:3000/api/questions/${props.data.id}/downvote`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            toast.success('Downvoted berhasil!', {
                position: 'top-center',
                autoClose: 2000
            })

            console.log(response);
        } catch (error) {
            // Handle error responses
            if (error.response?.status === 400) {
                toast.error('Kamu sudah memberikan downvote pada pertanyaan ini.', {
                    position: 'top-center',
                    autoClose: 2000
                })
            } else if (error.response?.status === 401) {
                toast.error('Silakan login terlebih dahulu untuk memberikan vote.', {
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
        }
    }

    return (
        <div className='w-[626px]'>
            <header className='flex w-full space-x-4 items-center'>
                <img
                    // src={props.data.User.foto_profil} 
                    src={
                        props.data.User?.foto_profil
                            ? props.data.User.foto_profil.startsWith('http')
                                ? props.data.User.foto_profil
                                : `http://localhost:3000${props.data.User.foto_profil}`
                            : '/default-avatar.png'
                    }
                    alt="profile photo"
                    className='w-[55px] h-[55px] rounded-full object-cover'
                />
                <div className='flex-1'>
                    <p className='font-bold mb-1 text-[#2C448C]'>{props.data.User.nama_lengkap || props.data.User.username}</p>
                    <p className='text-xs text-[#84ACF8]'>{props.data.User.jurusan || ''}</p>
                </div>
                <img src={optionsIcon} alt="options icon" />
            </header>

            <main className='flex w-full space-x-4 mt-6'>
                {/* bagian untuk vote */}
                <div className='w-[55px] flex flex-col px-4 py-2 space-y-4 items-center'>
                    <button onClick={upvote}>
                        <img src={upvoteIcon} alt="upvote icon" />
                    </button>
                    <span>{props.data.vote}</span>
                    <button onClick={downvote}>
                        <img src={downvoteIcon} alt="downvote icon" />
                    </button>
                </div>

                {/* bagian pertanyaan */}
                <div className='flex-1'>
                    <Link to={`/question/${props.data.id}`} className='text-2xl font-bold hover:text-[#2C448C]'>
                        {props.data.title}
                    </Link>

                    <div className='flex justify-between'>
                        <div className='mr-5'>
                            <ul className='flex flex-wrap'>
                                {
                                    props.data.categories.map(category => {
                                        return <li key={category.id} className='rounded-xl text-xs text-white bg-[#BCBCBC] px-3 py-2 w-fit mr-2 mt-2'>{category.name}</li>
                                    })
                                }
                                {/* <li className='rounded-xl text-xs text-white bg-[#BCBCBC] px-3 py-2 w-fit mr-2 mt-2'>Teknik Informatika</li>
                                <li className='rounded-xl text-xs text-white bg-[#BCBCBC] px-3 py-2 w-fit mr-2 mt-2'>Sistem Informasi</li>
                                <li className='rounded-xl text-xs text-white bg-[#BCBCBC] px-3 py-2 w-fit mr-2 mt-2'>Teknik</li> */}
                            </ul>

                            <p className='text-sm text-[#BCBCBC] mt-2'>{formatDistanceToNow(new Date(props.data.created_at), { addSuffix: true, locale: id })}</p>
                        </div>

                        <button
                            onClick={() => setIsOpen(prevValue => !prevValue)}
                            className='bg-[#2C448C] w-[80px] h-[30px] text-white rounded-xl'
                        >
                            Jawab
                        </button>
                    </div>
                </div>
            </main>

            {/* modal tambah jawaban */}
            <AddAnswerModal
                questionId={props.data.id}
                isOpen={isOpen}
                closeModal={closeModal}
            />
        </div>
    )
}