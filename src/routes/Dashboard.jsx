import Filter from "../components/Filter";
import Question from "../components/Question";
import AfterLoginNav from "../components/AfterLoginNav"
import AddQuestionModal from "../components/AddQuestionModal"
// import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
    const [user, setUser] = useState(null)
    const [questions, setQuestions] = useState([])
    const [categories, setCategories] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    // const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const handleSubmitQuestion = (data) => {
        console.log('submit pertanyaan');
        // console.log('Pertanyaan baru:', data)
        // Lanjutkan simpan ke backend atau state lokal
    }

    useEffect(() => {
        getMe()
        getQuestions()
        getCategories()
    }, []);

    // perbarui questions tiap 10 detik
    useEffect(() => {
        getQuestions(); // panggil pertama kali

        const interval = setInterval(() => {
            getQuestions(); // polling tiap 10 detik
        }, 10000);

        return () => clearInterval(interval); // bersihkan interval saat komponen unmount
    }, []);
    
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
            const response = await axios.get('http://localhost:3000/api/questions')
            setQuestions(response.data);
        } catch (err) {
            console.log(err);
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

    return (
        <section className="h-screen overflow-hidden">
            <header className="fixed top-0 left-0 right-0 z-20 bg-[#F2F2F2] shadow">
                <AfterLoginNav profileCapture={user?.foto_profil}/>
            </header>

            <main className="flex ml-[350px] pt-24 h-screen">
                <aside className="fixed top-20 left-0 w-[300px] h-[calc(100vh-80px)] bg-white border-r z-10 p-6 overflow-y-auto">
                    <button 
                        onClick={() => setIsOpen(prevValue => !prevValue)}
                        className="mb-4 border rounded-xl bg-[#2C448C] w-fit py-2 px-3 text-center text-white font-bold"
                    >
                        Tambah Pertanyaan
                    </button>
                    <Filter />
                </aside>
                {/* <div className="h-full w-[265px] mr-20">
                    <button>Tambah</button>
                    <Filter />
                </div> */}
                <div className="flex flex-col flex-1 h-full space-y-16 overflow-y-auto">
                    {
                        questions.length === 0 ? <p className="mt-10">Belum ada pertanyaan.</p> : 
                        questions.map(question => {
                            return <Question key={question.id} data={question} />
                        })
                    }
                    {/* {
                        questions ? questions.map(question => {
                            return <Question key={question.id} data={question}/>
                        })
                    } */}
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