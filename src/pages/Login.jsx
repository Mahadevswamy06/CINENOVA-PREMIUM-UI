import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API delay for aesthetic loading effect
        await new Promise(resolve => setTimeout(resolve, 1500));

        const success = login(email, password);
        setLoading(false);

        if (success) {
            toast.success("Welcome back!", { duration: 3000 });
            navigate('/');
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <AnimatedBackground />

            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(229,9,20,0.1)] hover:shadow-[0_0_60px_rgba(229,9,20,0.2)] transition-shadow duration-500"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-t-2xl"></div>

                <h2 className="text-3xl font-bold text-center mb-8 text-white tracking-wider">
                    Sign In
                </h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative group">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="peer w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                            placeholder="Email"
                            id="email"
                        />
                        <label htmlFor="email" className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-red-500">
                            Email Address
                        </label>
                        <div className="absolute right-3 top-3 opacity-0 peer-focus:opacity-100 transition-opacity duration-300">
                            {email.includes('@') ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : null}
                        </div>
                    </div>

                    <div className="relative group">
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="peer w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                            placeholder="Password"
                            id="password"
                        />
                        <label htmlFor="password" className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-red-500">
                            Password
                        </label>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-red-500/30 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
                    </motion.button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    New to CINENOVA?{' '}
                    <Link to="/signup" className="text-white hover:text-red-500 font-semibold transition-colors">
                        Sign up now
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
