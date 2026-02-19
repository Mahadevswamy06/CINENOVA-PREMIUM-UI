import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../api/omdbApi';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Calendar, User, Film } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            const data = await getMovieDetails(id);
            if (data.Response === "True") {
                setMovie(data);
            }
            setLoading(false);
        };
        fetchDetails();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div></div>;

    if (!movie) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Movie not found</div>;

    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden">
            <AnimatedBackground />

            <div className="absolute inset-0 z-0">
                <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover blur-3xl opacity-20 scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                </motion.button>

                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="w-full md:w-1/3 max-w-[400px] shrink-0 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/10"
                    >
                        <img src={movie.Poster} alt={movie.Title} className="w-full h-auto object-cover" />
                    </motion.div>

                    <div className="flex-1 space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-6xl font-bold leading-tight"
                        >
                            {movie.Title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300"
                        >
                            <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/30">
                                <Star className="w-4 h-4 fill-current" /> {movie.imdbRating}
                            </span>
                            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                                <Calendar className="w-4 h-4" /> {movie.Year}
                            </span>
                            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                                <Film className="w-4 h-4" /> {movie.Runtime}
                            </span>
                            <span className="uppercase tracking-widest text-xs font-semibold border border-white/20 px-2 py-1 rounded">
                                {movie.Rated}
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-2 flex-wrap"
                        >
                            {movie.Genre.split(', ').map(g => (
                                <span key={g} className="text-red-400 font-medium hover:text-red-300 transition-colors cursor-default">
                                    #{g}
                                </span>
                            ))}
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-lg text-gray-300 leading-relaxed max-w-3xl font-light"
                        >
                            {movie.Plot}
                        </motion.p>

                        <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent my-8"></div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <div>
                                <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-1">Director</h3>
                                <p className="text-white text-lg font-medium">{movie.Director}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-1">Writers</h3>
                                <p className="text-white text-lg font-medium">{movie.Writer}</p>
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-1">Starring</h3>
                                <p className="text-white text-lg font-medium">{movie.Actors}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
