import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import optionsIcon from '../assets/icons/options.svg'
import upvoteIcon from '../assets/icons/upvote.svg'
import downvoteIcon from '../assets/icons/downvote.svg'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'  // opsional kalau mau bahasa Indonesia
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import AfterLoginNav from '../components/AfterLoginNav'
import AddAnswerModal from '../components/AddAnswerModal'
import axios from 'axios'

export default function QuestionDetails() {
    const [user, setUser] = useState(null)
    const [questionDetail, setQuestionDetail] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const questionId = useParams()
    const closeModal = () => setIsOpen(false)
    // console.log(questionId)

    useEffect(() => {
        getMe()
    }, [])

    useEffect(() => {
        getQuestionDetail()
    }, [questionId.id]);

    const getMe = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await axios.get('http://localhost:3000/api/auth/user/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(response.data);
        } catch (err) {
            console.error("Gagal mengambil data user:", err);
            // Kamu juga bisa redirect ke /login jika token invalid
        }
    };

    const getQuestionDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/questions/${questionId.id}`)
            setQuestionDetail(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const upvoteQuestion = async () => {
        try {
            const token = localStorage.getItem('TOKEN')
            const response = await axios.post(`http://localhost:3000/api/questions/${questionId.id}/upvote`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            toast.success('Upvoted berhasil!', {
                position: 'top-center',
                autoClose: 2000
            })

            // ✅ Refresh data setelah vote
            getQuestionDetail()

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

    const downvoteQuestion = async () => {
        try {
            const token = localStorage.getItem('TOKEN')
            const response = await axios.post(`http://localhost:3000/api/questions/${questionId.id}/downvote`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            toast.success('Downvoted berhasil!', {
                position: 'top-center',
                autoClose: 2000
            })

            // ✅ Refresh data setelah vote
            getQuestionDetail()

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

    const upvoteAnswer = async (answerId) => {
        try {
            const token = localStorage.getItem('TOKEN')
            const response = await axios.post(`http://localhost:3000/api/answers/${answerId}/upvote`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            toast.success('Upvoted berhasil!', {
                position: 'top-center',
                autoClose: 2000
            })

            // ✅ Refresh data setelah vote
            getQuestionDetail()

            console.log(response);
        } catch (error) {
            // Handle error responses
            if (error.response?.status === 400) {
                toast.error('Kamu sudah memberikan upvote pada jawaban ini.', {
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

    const downvoteAnswer = async (answerId) => {
        try {
            const token = localStorage.getItem('TOKEN')
            const response = await axios.post(`http://localhost:3000/api/answers/${answerId}/downvote`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            toast.success('Downvoted berhasil!', {
                position: 'top-center',
                autoClose: 2000
            })

            // ✅ Refresh data setelah vote
            getQuestionDetail()

            console.log(response);
        } catch (error) {
            // Handle error responses
            if (error.response?.status === 400) {
                toast.error('Kamu sudah memberikan downvote pada jawaban ini.', {
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

    console.log(questionDetail)

    return (
        <section>
            <header className="fixed top-0 left-0 right-0 z-20 bg-[#F2F2F2] shadow">
                <AfterLoginNav
                    profileCapture={
                        user?.foto_profil
                            ? user?.foto_profil.startsWith('http')
                                ? user?.foto_profil
                                : `http://localhost:3000${user?.foto_profil}`
                            : '/default-avatar.png'
                    }
                />
            </header>

            <main className='flex flex-col fixed top-20 pt-8 items-center w-full h-[calc(100vh-80px)] overflow-y-auto'>
                <div className='w-[626px] pb-4 border-b-2'>
                    <header className='flex w-full space-x-4 items-center'>
                        <img
                            src={
                                questionDetail.User?.foto_profil
                                    ? questionDetail.User.foto_profil.startsWith('http')
                                        ? questionDetail.User.foto_profil
                                        : `http://localhost:3000${questionDetail.User.foto_profil}`
                                    : '/default-avatar.png'
                            }
                            alt="profile photo"
                            className='w-[55px] h-[55px] rounded-full object-cover'
                        />
                        <div className='flex-1'>
                            <p className='font-bold mb-1 text-[#2C448C]'>{questionDetail.User?.nama_lengkap || questionDetail.User?.username}</p>
                            <p className='text-xs text-[#84ACF8]'>{questionDetail.User?.jurusan || ''}</p>
                        </div>
                        <img src={optionsIcon} alt="options icon" />
                    </header>

                    <main className='flex w-full space-x-4 mt-6'>
                        {/* bagian untuk vote detail pertanyaan */}
                        <div className='w-[55px] flex flex-col px-4 py-2 space-y-4 items-center'>
                            <button onClick={upvoteQuestion}>
                                <img src={upvoteIcon} alt="upvote icon" />
                            </button>
                            <span>{questionDetail.vote}</span>
                            <button onClick={downvoteQuestion}>
                                <img src={downvoteIcon} alt="downvote icon" />
                            </button>
                        </div>

                        {/* bagian pertanyaan */}
                        <div className='flex-1'>
                            <p className='text-2xl font-bold mb-2 text-[#2C448C]'>
                                {questionDetail.title}
                            </p>

                            <p>{questionDetail.content}</p>

                            <div className='flex justify-between'>
                                <div className='mr-5'>
                                    <ul className='flex flex-wrap'>
                                        {
                                            questionDetail.categories?.map(category => {
                                                return <li key={category.id} className='rounded-xl text-xs text-white bg-[#BCBCBC] px-3 py-2 w-fit mr-2 mt-2'>{category.name}</li>
                                            })
                                        }
                                    </ul>

                                    {
                                        questionDetail.created_at &&
                                        <p className='text-sm text-[#BCBCBC] mt-2'>{formatDistanceToNow(new Date(questionDetail.created_at), { addSuffix: true, locale: id })}</p>
                                    }

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
                </div>

                {/* modal tambah jawaban */}
                <AddAnswerModal
                    questionId={questionId.id}
                    isOpen={isOpen}
                    closeModal={closeModal}
                    refreshQuestion={getQuestionDetail}
                />

                <div className="w-[626px] my-4 pl-11">
                    <p className="text-left font-bold">{questionDetail.Answers?.length} jawaban</p>
                </div>

                {/* daftar jawaban */}
                <div className='flex flex-col w-[626px] pl-11'>
                    {
                        questionDetail.Answers && questionDetail.Answers.map(answer => (
                            <div className='w-full border-b py-4'>
                                <header className='flex w-full space-x-4 items-center'>
                                    <img
                                        src={
                                            answer.User?.foto_profil
                                                ? answer.User.foto_profil.startsWith('http')
                                                    ? answer.User.foto_profil
                                                    : `http://localhost:3000${answer.User.foto_profil}`
                                                : '/default-avatar.png'
                                        }
                                        alt="profile photo"
                                        className='w-[55px] h-[55px] rounded-full object-cover'
                                    />
                                    <div className='flex-1'>
                                        <p className='font-bold mb-1 text-[#2C448C]'>{answer.User.nama_lengkap || answer.User.username}</p>
                                        <p className='text-xs text-[#84ACF8]'>{answer.User.jurusan || ''}</p>
                                    </div>
                                    {/* <img src={optionsIcon} alt="options icon" /> */}
                                </header>

                                <main className='flex w-full space-x-4 mt-6'>
                                    {/* bagian untuk vote */}
                                    <div className='w-[55px] flex flex-col px-4 py-2 space-y-4 items-center'>
                                        <button onClick={() => upvoteAnswer(answer.id)}>
                                            <img src={upvoteIcon} alt="upvote icon" />
                                        </button>
                                        <span>{answer.vote}</span>
                                        <button onClick={() => downvoteAnswer(answer.id)}>
                                            <img src={downvoteIcon} alt="downvote icon" />
                                        </button>
                                    </div>

                                    {/* bagian jawaban */}
                                    <div className='flex-1'>
                                        <p>{answer.content}</p>
                                    </div>
                                </main>
                            </div>
                        ))
                    }
                </div>
            </main>
        </section>
    )
}