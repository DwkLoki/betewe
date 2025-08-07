import { Outlet } from "react-router-dom"
import AfterLoginNav from "../components/AfterLoginNav"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export default function ProfileSetting() {
    const [user, setUser] = useState(null)

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

            <main className="flex fixed top-20 h-[calc(100vh-80px)] w-full px-32 py-10">
                <nav className="w-1/5">
                    <div className="border-b-2 p-2">Setelan</div>
                    <ul className="flex flex-col space-y-2 py-2">
                        <li className="px-2">
                            <NavLink 
                                to='/profile/setting/edit-profile'
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
                                className={({ isActive }) =>
                                    isActive ? 'text-[#2C448C]' : 'text-black'
                                }
                            >
                                Ubah Kata Sandi
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="flex-1 px-20 overflow-y-auto">
                    <Outlet context={{ user, refreshUser: getMe }}/>
                </div>
            </main>
        </section>
    )
}