import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, User, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!currentUser) return null;

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 shadow-xl border-b border-white/5' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="text-3xl font-black text-red-600 tracking-tighter hover:scale-105 transition-transform">
                    CINENOVA
                </Link>

                <div className="flex items-center space-x-6">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <div className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors cursor-default">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center font-bold text-white shadow-lg">
                            {currentUser.name ? currentUser.name[0].toUpperCase() : <User size={16} />}
                        </div>
                        <span className="hidden md:block font-medium">{currentUser.name || 'User'}</span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 text-sm backdrop-blur-md border border-white/10"
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
