import navLogo from '../assets/icons/navbar-logo.svg'
import { NavLink } from 'react-router-dom'

export default function NavBar(props) {
    const navLinkClass = ({ isActive }) => isActive ? 'text-[#2C448C]' : 'hover:text-[#2C448C]'
    
    return (
        <nav className={`flex h-20 justify-between items-center px-20 ${props.color}`}>
            <img src={navLogo} alt="Navbar Logo" />
            <ul className='flex items-center space-x-12 text-lg'>
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
        </nav> 
    )
}