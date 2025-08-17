import navLogo from '../assets/icons/navbar-logo.svg'
import { NavLink } from 'react-router-dom'
import { X, AlignJustify } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function NavBar(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navLinkClass = ({ isActive }) => isActive ? 'text-[#2C448C]' : 'hover:text-[#2C448C]'

    // Lock scroll ketika menu terbuka
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // cleanup ketika komponen unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <nav>
            <div className={`flex h-20 justify-between items-center lg:px-20 md:px-10 px-5 ${props.color}`}>
                <img src={navLogo} alt="Navbar Logo" />
                <ul className='md:flex hidden items-center lg:space-x-12 md:space-x-6 text-lg'>
                    <li>
                        <NavLink to='/' className={navLinkClass}>
                            Beranda
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/about-us' className={navLinkClass}>
                            Tentang Kami
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/login' className={navLinkClass}>
                            Masuk
                        </NavLink>
                    </li>
                    <li className='border rounded-xl bg-[#2C448C] w-28 py-1 text-center text-white font-bold'>
                        <NavLink to='/register'>
                            Daftar
                        </NavLink>
                    </li>
                </ul>
                <button
                    // ref={props.toggleButtonRef} // pasang ref
                    // onClick={(e) => {
                    //     e.stopPropagation(); // cegah bubbling
                    //     props.sidebarToggle();
                    // }}
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className='md:hidden relative w-8 h-8 flex items-center justify-center'
                >
                    {/* Icon Menu */}
                    <span
                        className={`absolute transition-all duration-200 ease-in-out ${isMenuOpen ? 'opacity-0 scale-75 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}
                    >
                        <AlignJustify size={24} strokeWidth={2} color="#2C448C" />
                    </span>

                    {/* Icon Close */}
                    <span
                        className={`absolute transition-all duration-200 ease-in-out ${isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-90'}`}
                    >
                        <X size={24} strokeWidth={2} color="#2C448C" />
                    </span>
                </button>
            </div>

            {/* toggle menu pada tampilan mobile */}
            <div
                className={`
                    md:hidden w-screen overflow-hidden transition-all duration-500 ease-in-out
                    ${isMenuOpen ? 'h-[calc(100vh-80px)] opacity-100' : 'h-0 opacity-0'}
                `}
            >
                <ul className='flex flex-col gap-4 h-full justify-center items-center text-lg'>
                    <li>
                        <NavLink to='/' className={navLinkClass}>
                            Beranda
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/about-us' className={navLinkClass}>
                            Tentang Kami
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/login' className={navLinkClass}>
                            Masuk
                        </NavLink>
                    </li>
                    <li className='border rounded-xl bg-[#2C448C] w-28 py-1 text-center text-white font-bold'>
                        <NavLink to='/register'>
                            Daftar
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}