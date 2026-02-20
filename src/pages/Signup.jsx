import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, ShieldCheck, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'password') {
            if (!PASSWORD_REGEX.test(e.target.value)) {
                setPasswordError('Password must meet complexity requirements.');
            } else {
                setPasswordError('');
            }
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!PASSWORD_REGEX.test(formData.password)) {
            toast.error("Password too weak");
            return;
        }

        setLoading(true);
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 2000));

        const success = signup(formData.name, formData.email, formData.password);
        setLoading(false);

        if (success) {
            toast.success("Account created! Please login.");
            navigate('/login');
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-10">
            <AnimatedBackground />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-lg p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(229,9,20,0.15)] hover:shadow-red-500/20 transition-all duration-300"
            >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>

                <h2 className="text-4xl font-black text-center mb-8 text-white tracking-tight leading-tight">
                    Join <span className="text-red-600">CINENOVA</span>
                </h2>

                <form onSubmit={handleSignup} className="space-y-5">
                    <div className="group relative">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="peer w-full px-4 py-4 bg-black/50 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 transform -translate-y-7 scale-90 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-7 peer-focus:text-red-500 pointer-events-none"
                        >
                            Full Name
                        </label>
                    </div>

                    <div className="group relative">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="peer w-full px-4 py-4 bg-black/50 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 transform -translate-y-7 scale-90 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-7 peer-focus:text-red-500 pointer-events-none"
                        >
                            Email Address
                        </label>
                    </div>

                    <div className="group relative">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`peer w-full px-4 py-4 bg-black/50 border rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-1 transition-all ${passwordError ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-green-500 focus:ring-green-500'}`}
                        />
                        <label
                            htmlFor="password"
                            className={`absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 transform -translate-y-7 scale-90 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-7 pointer-events-none ${passwordError ? 'peer-focus:text-red-500' : 'peer-focus:text-green-500'}`}
                        >
                            Password
                        </label>
                        <div className="text-xs text-gray-400 mt-2 space-y-1 pl-1">
                            <p className={formData.password.length >= 8 ? "text-green-500" : ""}>• At least 8 characters</p>
                            <p className={/[A-Z]/.test(formData.password) ? "text-green-500" : ""}>• One uppercase letter</p>
                            <p className={/[a-z]/.test(formData.password) ? "text-green-500" : ""}>• One lowercase letter</p>
                            <p className={/[0-9]/.test(formData.password) ? "text-green-500" : ""}>• One number</p>
                            <p className={/[@$!%*?&]/.test(formData.password) ? "text-green-500" : ""}>• One special character</p>
                        </div>
                    </div>

                    <div className="group relative">
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`peer w-full px-4 py-4 bg-black/50 border rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-1 transition-all ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-green-500 focus:ring-green-500'}`}
                        />
                        <label
                            htmlFor="confirmPassword"
                            className={`absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 transform -translate-y-7 scale-90 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-7 pointer-events-none ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'peer-focus:text-red-500' : 'peer-focus:text-green-500'}`}
                        >
                            Confirm Password
                        </label>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading || !!passwordError || formData.password !== formData.confirmPassword}
                        type="submit"
                        className="w-full py-4 bg-gradient-to-br from-red-600 to-red-800 text-white font-bold rounded-lg shadow-lg hover:shadow-red-600/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><ShieldCheck size={20} /> Create Account</>}
                    </motion.button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-white hover:text-red-500 font-semibold transition-colors">
                        Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
