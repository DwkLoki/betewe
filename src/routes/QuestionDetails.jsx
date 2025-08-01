import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import optionsIcon from '../assets/icons/options.svg'
import upvoteIcon from '../assets/icons/upvote.svg'
import downvoteIcon from '../assets/icons/downvote.svg'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'  // opsional kalau mau bahasa Indonesia
import { Link } from 'react-router-dom'
import AfterLoginNav from '../components/AfterLoginNav'
import axios from 'axios'

export default function QuestionDetails() {
    const [user, setUser] = useState(null)
    const [questionDetail, setQuestionDetail] = useState({})
    const questionId = useParams()
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
    
    console.log(questionDetail)

    return (
        <section>
            <header className="fixed top-0 left-0 right-0 z-20 bg-[#F2F2F2] shadow">
                <AfterLoginNav profileCapture={user?.foto_profil}/>
            </header>

            <main className='flex flex-col fixed top-20 pt-8 items-center w-full h-[calc(100vh-80px)] overflow-y-auto'>
                <div className='w-[626px] pb-4 border-b-2'>
                    <header className='flex w-full space-x-4 items-center'>
                        <img src={questionDetail.User?.foto_profil} alt="profile photo" className='w-[55px] h-[55px] rounded-full' />
                        <div className='flex-1'>
                            <p className='font-bold mb-1 text-[#2C448C]'>{questionDetail.User?.nama_lengkap || questionDetail.User?.username}</p>
                            <p className='text-xs text-[#84ACF8]'>{questionDetail.User?.jurusan || ''}</p>
                        </div>
                        <img src={optionsIcon} alt="options icon" />
                    </header>

                    <main className='flex w-full space-x-4 mt-6'>
                        {/* bagian untuk vote */}
                        <div className='w-[55px] flex flex-col px-4 py-2 space-y-4 items-center'>
                            <img src={upvoteIcon} alt="upvote icon" />
                            <span>{questionDetail.vote}</span>
                            <img src={downvoteIcon} alt="upvote icon" />
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

                                <button className='bg-[#2C448C] w-[80px] h-[30px] text-white rounded-xl'>Jawab</button>
                            </div>
                        </div>
                    </main>
                </div>

                <div className="w-[626px] my-4 pl-11">
                    <p className="text-left font-bold">{questionDetail.Answers?.length} jawaban</p>
                </div>

                {/* daftar jawaban */}
                <div className='flex flex-col w-[626px] pl-11'>
                    {
                        questionDetail.Answers && questionDetail.Answers.map(answer => (
                            <div className='w-full border-b py-4'>
                                <header className='flex w-full space-x-4 items-center'>
                                    <img src={answer.User.foto_profil} alt="profile photo" className='w-[55px] h-[55px] rounded-full' />
                                    <div className='flex-1'>
                                        <p className='font-bold mb-1 text-[#2C448C]'>{answer.User.nama_lengkap || answer.User.username}</p>
                                        <p className='text-xs text-[#84ACF8]'>{answer.User.jurusan || ''}</p>
                                    </div>
                                    {/* <img src={optionsIcon} alt="options icon" /> */}
                                </header>

                                <main className='flex w-full space-x-4 mt-6'>
                                    {/* bagian untuk vote */}
                                    <div className='w-[55px] flex flex-col px-4 py-2 space-y-4 items-center'>
                                        <img src={upvoteIcon} alt="upvote icon" />
                                        <span>{answer.vote}</span>
                                        <img src={downvoteIcon} alt="upvote icon" />
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