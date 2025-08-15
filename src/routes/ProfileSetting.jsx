import { Outlet } from "react-router-dom"
import AfterLoginNav from "../components/AfterLoginNav"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { SquareChevronRight, SquareChevronLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom'

export default function ProfileSetting() {
    const [user, setUser] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        getMe(); // hanya ambil user dulu
    }, []);

    // useEffect(() => {
    //     if (user) {
    //         getMe(); // hanya jalan saat user sudah siap
    //     }
    // }, [user]);

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
        }
    };

    return (
        <section className="font-roboto h-screen overflow-hidden">
            <header className="fixed top-0 left-0 right-0 z-20 bg-[#F2F2F2] shadow">
                <AfterLoginNav
                    profileCapture={
                        user?.foto_profil
                            ? user.foto_profil.startsWith('http')
                                ? user.foto_profil
                                : `http://localhost:3000${user.foto_profil}`
                            : '/default-avatar.png'
                    }
                />
            </header>

            <main className="flex fixed top-20 h-[calc(100vh-80px)] w-full lg:px-24 lg:py-10 md:px-12 md:py-10 px-8 py-6 md:overflow-y-hidden overflow-y-auto">
                <nav
                    className={`
                        md:w-1/5 md:translate-x-0 md:block md:static md:p-0 md:bg-white md:h-full 
                        fixed top-20 left-0 w-[300px] h-[calc(100vh-80px)] bg-[#F2F2F2] z-10 p-6 overflow-y-auto transform transition-transform duration-300
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    <div className="border-b-2 p-2">Setelan</div>
                    <ul className="flex flex-col space-y-2 py-2">
                        <li className="px-2">
                            <NavLink
                                to='/profile/setting/edit-profile'
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    isActive ? 'text-[#2C448C]' : 'text-black'
                                }
                            >
                                Edit Profile
                            </NavLink>
                        </li>
                        <li className="px-2">
                            <NavLink
                                to='/profile/setting/change-password'
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    isActive ? 'text-[#2C448C]' : 'text-black'
                                }
                            >
                                Ubah Kata Sandi
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <button
                    onClick={() => setIsSidebarOpen(prev => !prev)}
                    className={`fixed md:hidden block top-24 left-0 z-20 p-3 rounded-r-lg bg-[#F2F2F2]
                        transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-72 ' : 'translate-x-0'}
                    `}
                >
                    {
                        isSidebarOpen ? (
                            <SquareChevronLeft size={24} strokeWidth={2} color="#2C448C" />
                        ) : (
                            <SquareChevronRight size={24} strokeWidth={2} color="#2C448C" />
                        )
                    }
                </button>

                <div className="flex-1 lg:px-20 md:px-12 md:overflow-y-auto">
                    <Outlet context={{ user, refreshUser: getMe }} />
                </div>
            </main>
        </section>
    )
}