import navLogo from '../assets/icons/navbar-logo.svg'
import notifIcon from '../assets/icons/notif-icon.svg'
import profilePhoto from '../assets/images/avatar-testi1.png'
import { useNavigate } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Search } from 'lucide-react';

export default function AfterLoginNav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("TOKEN");
        navigate("/login");
    };

    return (
        <nav className="flex items-center justify-between h-20 px-20">
            <img src={navLogo} alt="Navbar Logo" />
            <div className='flex items-center space-x-6'>
                <div className='flex items-center space-x-4 w-full h-[44px] sm:w-[340px] sm:h-[40px] bg-white rounded-2xl pl-6 pr-2'>
                    <input type="text" placeholder='Cari jawaban dari pertanyaanmu' className='flex-1 outline-none' />
                    <button className='w-[25px] h-[25px] sm:w-[25px] sm:h-[25px] bg-[#84ACF8] rounded-full flex items-center justify-center'>
                        <Search className="w-4 h-4 text-white" />
                    </button>
                </div>
                <img src={notifIcon} alt="notification icon" className='w-[40px] h-[40px] p-2' />
                <Popover className="relative w-[40px] h-[40px]">
                    <PopoverButton>
                        <img src={profilePhoto} alt="profile photo" />
                    </PopoverButton>
                    <PopoverPanel anchor="bottom" className="flex flex-col space-y-2 bg-white shadow-lg mt-3 w-36 rounded-2xl px-4 pb-4 pt-3 z-30">
                        <a href="/analytics" className='font-roboto'>View Profile</a>
                        <button onClick={handleLogout} className='font-roboto text-left'>Logout</button>
                    </PopoverPanel>
                </Popover>
            </div>
        </nav>
    )
}