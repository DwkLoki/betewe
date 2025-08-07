import navLogo from '../assets/icons/navbar-logo.svg'
import notifIcon from '../assets/icons/notif-icon.svg'
// import profilePhoto from '../assets/images/avatar-testi1.png'
import { useNavigate, useSearchParams } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function AfterLoginNav(props) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');

    // Ambil search query dari URL saat komponen dimuat
    useEffect(() => {
        const currentSearch = searchParams.get('search') || '';
        setSearchQuery(currentSearch);
    }, [searchParams]);

    const handleLogout = () => {
        localStorage.removeItem("TOKEN");
        navigate("/login");
    };

    const processSearchQuery = (query) => {
        // Bersihkan query dan pisahkan menjadi kata-kata
        const cleanQuery = query.trim().toLowerCase();
        if (!cleanQuery) return '';

        // Pisahkan berdasarkan spasi dan filter kata yang kosong
        const keywords = cleanQuery
            .split(/\s+/)
            .filter(word => word.length > 0)
            .filter(word => word.length >= 2); // Filter kata yang terlalu pendek

        // Gabungkan kembali dengan spasi untuk dikirim ke backend
        return keywords.join(' ');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const newSearchParams = new URLSearchParams(searchParams);

        const processedQuery = processSearchQuery(searchQuery);

        if (processedQuery) {
            newSearchParams.set('search', processedQuery);
        } else {
            newSearchParams.delete('search');
        }

        console.log('Original query:', searchQuery);
        console.log('Processed query:', processedQuery);
        console.log('New params:', newSearchParams.toString());
        setSearchParams(newSearchParams);
    };

    const clearSearch = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('search');
        setSearchQuery('');
        setSearchParams(newSearchParams);
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <nav className="flex items-center justify-between h-20 px-20">
            <Link to='/dashboard'>
                <img src={navLogo} alt="Navbar Logo" />
            </Link>
            <div className='flex items-center space-x-6'>
                <form onSubmit={handleSearch} className='flex items-center space-x-4 w-full h-[44px] sm:w-[340px] sm:h-[40px] bg-white rounded-2xl pl-6 pr-2'>
                    <input
                        type="text"
                        placeholder='Temukan jawaban dari pertanyaanmu'
                        className='flex-1 outline-none text-sm'
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        title="Masukkan kata kunci untuk mencari pertanyaan. Sistem akan mencari pertanyaan yang mengandung kata-kata yang Anda masukkan."
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className='w-[20px] h-[20px] text-gray-400 hover:text-gray-600 flex items-center justify-center'
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        type="submit"
                        className='w-[25px] h-[25px] sm:w-[25px] sm:h-[25px] bg-[#84ACF8] rounded-full flex items-center justify-center hover:bg-[#6B9BF7] transition-colors'
                    >
                        <Search className="w-4 h-4 text-white" />
                    </button>
                </form>
                <img src={notifIcon} alt="notification icon" className='w-[40px] h-[40px] p-2' />
                <Popover>
                    <PopoverButton className="flex">
                        <img src={props.profileCapture} alt="profile photo" className="w-10 h-10 object-cover rounded-full" />
                    </PopoverButton>
                    <PopoverPanel anchor="bottom" className="flex flex-col space-y-2 bg-white shadow-lg mt-3 w-36 rounded-2xl px-4 pb-4 pt-3 z-30">
                        <Link to='/profile' className='font-roboto'>View Profile</Link>
                        {/* <a href="/analytics" className='font-roboto'>View Profile</a> */}
                        <button onClick={handleLogout} className='font-roboto text-left'>Logout</button>
                    </PopoverPanel>
                </Popover>
            </div>
        </nav>
    )
}