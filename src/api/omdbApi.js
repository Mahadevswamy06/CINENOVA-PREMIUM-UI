import axios from 'axios';

const API_KEY = '7befb981';
const BASE_URL = 'https://www.omdbapi.com/';

const api = axios.create({
    baseURL: BASE_URL,
});

export const searchMovies = async (query) => {
    try {
        const response = await api.get('', {
            params: {
                apikey: API_KEY,
                s: query,
                type: 'movie',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error searching movies:", error);
        return { Response: "False", Error: error.message };
    }
};

export const getMovieDetails = async (imdbID) => {
    try {
        const response = await api.get('', {
            params: {
                apikey: API_KEY,
                i: imdbID,
                plot: 'full',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting movie details:", error);
        return { Response: "False", Error: error.message };
    }
};
