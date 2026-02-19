import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getMovieDetails } from '../api/omdbApi'; // Or similar

const HeroBanner = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHero = async () => {
            // Fetch a specific premium movie for the hero, e.g., Dune: Part Two (tt15239678) or similar popular
            // Using "tt15398776" (Oppenheimer) or "tt15239678" (Dune 2)
            const data = await getMovieDetails("tt15239678");
            if (data && data.Response === "True") {
                setMovie(data);
            }
            setLoading(false);
        };
        fetchHero();
    }, []);

    if (loading) return <div className="h-[70vh] w-full bg-black animate-pulse"></div>;

    if (!movie) return null;

    return (
        <div className="relative w-full h-[80vh] flex items-center justify-start px-8 md:px-16 overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 -z-10">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/1920x1080"}
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-50 blur-sm scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl text-white space-y-4 z-10"
            >
                <p className="text-red-500 font-bold tracking-widest uppercase mb-2">Welcome to CINENOVA</p>
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    {movie.Title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300">
                    {movie.Year} • {movie.Genre} • {movie.Runtime}
                </p>
                <p className="text-gray-400 line-clamp-3 md:line-clamp-4 max-w-xl">
                    {movie.Plot}
                </p>
                <div className="flex space-x-4 pt-4">
                    <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-[0_0_15px_rgba(229,9,20,0.5)] transition-all transform hover:scale-105 active:scale-95">
                        Watch Now
                    </button>
                    <button className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95">
                        More Info
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default HeroBanner;
