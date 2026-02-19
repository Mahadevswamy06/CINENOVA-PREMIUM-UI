import React, { useRef } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieCard from './MovieCard';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const MovieSection = ({ title, query }) => {
    const { movies, loading, error } = useMovies(query);
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    if (loading) return <div className="h-48 flex items-center justify-center text-white/50">Loading {title}...</div>;
    if (error || !movies || movies.length === 0) return null; // Don't show empty sections

    return (
        <div className="py-8 px-4 md:px-8 relative group">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 pl-4 border-l-4 border-red-600 text-white">
                {title}
            </h2>

            <div className="relative">
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-red-600/80 p-2 rounded-full hidden group-hover:flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow-xl"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <div
                    ref={scrollRef}
                    className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 px-4 snap-x snap-mandatory"
                    style={{ scrollBehavior: 'smooth' }} // Fallback
                >
                    {movies.map((movie) => (
                        <motion.div
                            key={movie.imdbID}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="snap-center shrink-0"
                        >
                            <MovieCard movie={movie} />
                        </motion.div>
                    ))}
                </div>

                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-red-600/80 p-2 rounded-full hidden group-hover:flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow-xl"
                >
                    <ChevronRight className="w-6 h-6 text-white" />
                </button>
            </div>
        </div>
    );
};

export default MovieSection;
