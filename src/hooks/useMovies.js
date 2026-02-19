import { useState, useEffect } from 'react';
import { searchMovies } from '../api/omdbApi';
import toast from 'react-hot-toast';

export const useMovies = (query) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await searchMovies(query);
                if (data.Response === 'True') {
                    setMovies(data.Search);
                } else {
                    setError(data.Error);
                    // Only show toast if it's a critical failure, OMDb returns 'Movie not found!' often for weird terms
                    if (data.Error !== 'Movie not found!') {
                        toast.error(data.Error);
                    }
                }
            } catch (err) {
                setError(err.message);
                toast.error('Failed to fetch movies');
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchMovies();
        }
    }, [query]);

    return { movies, loading, error };
};
