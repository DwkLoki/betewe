import Filter from "../components/Filter";
import Question from "../components/Question";
import AfterLoginNav from "../components/AfterLoginNav"
import AddQuestionModal from "../components/AddQuestionModal"
// import { jwtDecode } from "jwt-decode";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom"
import { toast } from 'react-toastify';
import axios from "axios";
import NavBar from "../components/NavBar";

export default function QuestionsListWithoutLogin() {
    const [user, setUser] = useState(null)
    const [questions, setQuestions] = useState([])
    const [categories, setCategories] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [searchParams] = useSearchParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const sidebarRef = useRef(null); // ref untuk sidebar
    const toggleButtonRef = useRef(null); // ref untuk tombol toggle

    // console.log(searchParams);

    // const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    const sidebarToggle = () => setIsSidebarOpen(prev => !prev)

    useEffect(() => {
        getMe()
        // getQuestions()
        getCategories()
    }, []);

    // Gabungkan polling dan filter-based fetching dalam satu useEffect
    useEffect(() => {
        getQuestions(); // panggil pertama kali

        // Set up polling interval
        const interval = setInterval(() => {
            getQuestions(); // polling tiap 10 detik
        }, 10000);

        return () => clearInterval(interval); // bersihkan interval saat komponen unmount
    }, [searchParams]); // akan refetch jika filter berubah DAN setup polling baru

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

    const getQuestions = async () => {
        try {
            const query = searchParams.toString(); // Convert jadi string query param
            const url = `http://localhost:3000/api/questions${query ? `?${query}` : ''}`;
            console.log('Fetching questions with URL:', url);

            const response = await axios.get(url);
            console.log('Questions received:', response.data.length, 'questions');
            setQuestions(response.data);
        } catch (err) {
            console.error('Error fetching questions:', err);
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/categories')
            setCategories(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    // Auto-close jika klik di luar sidebar & tombol toggle
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target) &&
                toggleButtonRef.current &&
                !toggleButtonRef.current.contains(e.target)
            ) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

    // console.log('data user', user);

    return (
        <section className="h-screen overflow-hidden">
            <header className="fixed top-0 left-0 right-0 z-20 bg-[#F2F2F2] shadow">
                <NavBar />
            </header>

            <main className="flex lg:ml-[350px] pt-24 h-screen">
                <aside
                    ref={sidebarRef}
                    className={`
                        lg:translate-x-0 fixed top-20 left-0 w-[300px] h-[calc(100vh-80px)] bg-white border-r z-10 p-6 overflow-y-auto 
                        transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    <button
                        onClick={() => {
                            const token = localStorage.getItem('TOKEN')
                            if (!token) {
                                toast.error('Silakan login terlebih dahulu untuk tambah pertanyaan.', {
                                    position: 'top-center',
                                    autoClose: 2000
                                })
                                return
                            }
                            setIsOpen(prevValue => !prevValue)
                        }}
                        className="mb-4 border rounded-xl bg-[#2C448C] w-fit py-2 px-3 text-center text-white font-bold"
                    >
                        Tambah Pertanyaan
                    </button>
                    <Filter />
                </aside>
                <div className="flex flex-col flex-1 h-full space-y-16 lg:items-start items-center overflow-y-auto">
                    {
                        questions.length === 0 ? <p className="mt-10">Belum ada pertanyaan.</p> :
                            questions.map(question => {
                                return <Question key={question.id} data={question} />
                            })
                    }
                </div>

                {/* modal tambah pertanyaan */}
                <AddQuestionModal
                    categories={categories}
                    isOpen={isOpen}
                    closeModal={closeModal}
                />
            </main>
        </section>
    )
}