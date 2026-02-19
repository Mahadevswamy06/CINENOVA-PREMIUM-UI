import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.imdbID}`}>
            <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-48 h-72 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-red-500/20 transition-all duration-300 bg-gray-900 border border-white/10"
            >
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                    alt={movie.Title}
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-sm truncate">{movie.Title}</h3>
                    <p className="text-gray-300 text-xs">{movie.Year}</p>
                </div>
            </motion.div>
        </Link>
    );
};

export default MovieCard;
