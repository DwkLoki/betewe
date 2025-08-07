import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Pencil } from 'lucide-react';
import upvoteIcon from '../assets/icons/upvote.svg'
import downvoteIcon from '../assets/icons/downvote.svg'
import Question from "../components/Question"
import AfterLoginNav from "../components/AfterLoginNav"
import notFoundImg from "../assets/images/not-found.png"
import axios from "axios"

export default function Profile() {
    const [user, setUser] = useState(null)
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([]);
    const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'answers'

    // console.log(user)

    useEffect(() => {
        getMe(); // hanya ambil user dulu
    }, []);

    useEffect(() => {
        if (user) {
            getQuestionsByUser(); // hanya jalan saat user sudah siap
            getAnswersByUser();
        }
    }, [user]);

    // perbarui questions tiap 10 detik
    // useEffect(() => {
    //     getQuestions(); // panggil pertama kali

    //     const interval = setInterval(() => {
    //         getQuestions(); // polling tiap 10 detik
    //     }, 10000);

    //     return () => clearInterval(interval); // bersihkan interval saat komponen unmount
    // }, []);
    
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


    const getQuestionsByUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/questions?userId=${user.id}`)
            setQuestions(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const getAnswersByUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/answers?userId=${user.id}`)
            setAnswers(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="h-screen overflow-hidden">
            <header className="fixed top-0 left-0 right-0 z-20 bg-[#F2F2F2] shadow">
                <AfterLoginNav 
                    profileCapture={user?.foto_profil
                    ? user.foto_profil.startsWith('http')
                        ? user.foto_profil
                        : `http://localhost:3000${user.foto_profil}`
                    : '/default-avatar.png'} 
                />
            </header>

            <main className="flex ml-[400px] pt-24 h-screen">
                <aside className="fixed flex flex-col space-y-6 top-20 left-0 w-[390px] h-[calc(100vh-80px)] bg-white border-r z-10 p-6 overflow-y-auto">
                    <Link to='/profile/setting' className='relative group flex justify-end' >
                        <Pencil color="#2C448C" size={20} strokeWidth={1.75}/>
                        <span className="absolute top-full mt-3 hidden group-hover:block bg-[#2C448C] text-white text-xs px-2 py-1 rounded">
                            Edit Profil
                        </span>
                    </Link>
                    <div className="flex justify-center">
                        <img 
                            src={
                                user?.foto_profil
                                ? user.foto_profil.startsWith('http')
                                    ? user.foto_profil
                                    : `http://localhost:3000${user.foto_profil}`
                                : '/default-avatar.png'
                            } 
                            alt="profile photo" 
                            className="rounded-full w-28 h-28 object-cover text-center"
                        />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <div className="flex">
                            <p className="text-[#BCBCBC] w-2/5">Nama Pengguna</p>
                            <p className="text-end flex-1">{user?.username}</p>
                        </div>
                        <div className="flex">
                            <p className="text-[#BCBCBC] w-2/5">Email</p>
                            <p className="text-end flex-1">{user?.email}</p>
                        </div>
                        <div className="flex">
                            <p className="text-[#BCBCBC] w-2/5">Nama Lengkap</p>
                            <p className="text-end flex-1">{user?.nama_lengkap ? user.nama_lengkap : '-'}</p>
                        </div>
                        <div className="flex">
                            <p className="text-[#BCBCBC] w-2/5">Jurusan</p>
                            <p className="text-end flex-1">{user?.jurusan ? user.jurusan : '-'}</p>
                        </div>
                    </div>
                    {/* <button 
                        onClick={() => setIsOpen(prevValue => !prevValue)}
                        className="mb-4 border rounded-xl bg-[#2C448C] w-fit py-2 px-3 text-center text-white font-bold"
                    >
                        Tambah Pertanyaan
                    </button>
                    <Filter /> */}
                </aside>

                <div className="flex flex-col flex-1 h-full space-y-16 pl-10 pb-2 overflow-y-auto bg-white">
                    <div className="sticky top-0 z-10 flex justify-between items-center bg-white mr-10">
                        <nav className="flex">
                            <button
                                className={`border-r border-r-[#BCBCBC] pr-6 ${activeTab === 'questions' ? 'text-[#2C448C]' : 'text-[#BCBCBC]'}`}
                                onClick={() => setActiveTab('questions')}
                            >
                                {`${questions.length} Pertanyaan`}
                            </button>
                            <button
                                className={`border-l border-l-[#BCBCBC] pl-6 ${activeTab === 'answers' ? 'text-[#2C448C]' : 'text-[#BCBCBC]'}`}
                                onClick={() => setActiveTab('answers')}
                            >
                                {`${answers.length} Jawaban`}
                            </button>
                        </nav>

                        <button
                            // onClick={() => setIsOpen(prevValue => !prevValue)}
                            className="rounded-xl bg-[#2C448C] w-fit py-2 px-3 text-center text-white font-bold"
                        >
                            Tambah Pertanyaan
                        </button>
                    </div>
                    
                    {activeTab === 'questions' && (
                        questions.length === 0 ?
                            (
                                <div className='flex flex-col justify-center items-center'>
                                    <img className="w-[200px] mb-4" src={notFoundImg} alt="content not found" />
                                    <p className='font-bold text-[#2C448C]'>Ups, kamu belum memiliki satupun pertanyaan.</p>
                                    <p className='text-[#2C448C]'>Kamu dapat membuat pertanyaan baru dengan klik tombol Tambah di atas.</p>
                                </div>
                            )
                            : questions.map(question => (
                                <Question key={question.id} data={question} />
                            ))
                    )}

                    {activeTab === 'answers' && (
                        answers.length === 0 ? 
                            (
                                <div className='flex flex-col justify-center items-center'>
                                    <img className="w-[200px] mb-4" src={notFoundImg} alt="content not found" />
                                    <p className='font-bold text-[#2C448C]'>Ups, kamu belum memiliki satupun jawaban.</p>
                                    <p className='text-[#2C448C]'>Cari pertanyaan dan berikan jawabanmu terlebih dahulu.</p>
                                </div>
                            )
                            : answers.map(answer => (
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
                                            <img src={upvoteIcon} alt="upvote icon" />
                                            <span>{answer.vote}</span>
                                            <img src={downvoteIcon} alt="upvote icon" />
                                        </div>

                                        {/* bagian pertanyaan dan jawaban */}
                                        <div className='flex-1 space-y-3'>
                                            <Link to={`/question/${answer.Question.id}`} className='text-2xl font-bold hover:text-[#2C448C]'>
                                                {answer.Question.title}
                                            </Link>
                                            <p>{answer.content}</p>
                                        </div>
                                    </main>
                                </div>
                            ))
                    )}
                </div>

                {/* modal tambah pertanyaan */}
                {/* <AddQuestionModal 
                    categories={categories}
                    isOpen={isOpen}
                    closeModal={closeModal}
                /> */}
            </main>
        </section>
    )
}