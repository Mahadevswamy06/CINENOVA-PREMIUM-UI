import React from 'react';
import HeroBanner from '../components/HeroBanner';
import MovieSection from '../components/MovieSection';
import AnimatedBackground from '../components/AnimatedBackground';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="relative min-h-screen text-white overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <AnimatedBackground />
            </div>

            <div className="relative z-10">
                <HeroBanner />

                <div className="mt-[-100px] relative z-20 pb-20 space-y-8">
                    <MovieSection title="Trending Now" query="Dune" />
                    <MovieSection title="Action Hits" query="Avengers" />
                    <MovieSection title="Comedy Favorites" query="Hangover" />
                    <MovieSection title="Critically Acclaimed Dramas" query="Godfather" />
                    <MovieSection title="Mind-Bending Thrillers" query="Inception" />
                </div>
            </div>
        </div>
    );
};

export default Home;
