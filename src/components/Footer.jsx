import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    const [clicked, setClicked] = useState(false);
    const credit = "Mahadev swamy";
    const words = credit.split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const letterVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        animate: {
            y: [0, -10, 0],
            scale: [1, 1.2, 1],
            color: ["#9ca3af", "#ef4444", "#9ca3af"], // gray-400 to red-500 to gray-400
            transition: { duration: 0.5 }
        }
    };

    return (
        <footer className="w-full py-8 mt-12 border-t border-white/10 bg-gradient-to-t from-red-900/10 to-black/80 backdrop-blur-md">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <div className="mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} CINENOVA. All rights reserved.
                </div>

                <div className="flex items-center gap-1 cursor-pointer group" onClick={() => setClicked(true)}>
                    <span>Designed & Developed by</span>
                    <motion.div
                        className="flex gap-1 font-bold ml-1"
                        variants={containerVariants}
                        initial="hidden"
                        animate={clicked ? "animate" : "visible"}
                    >
                        {words.map((word, wordIndex) => (
                            <div key={wordIndex} className="flex">
                                {word.split("").map((char, charIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${charIndex}`}
                                        variants={letterVariants}
                                        animate={clicked ? "animate" : "visible"}
                                        whileHover={{ scale: 1.5, color: "#E50914", rotate: 10 }}
                                        className="inline-block cursor-none"
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 10,
                                            delay: clicked ? (wordIndex * word.length + charIndex) * 0.05 : 0
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                {/* Add space unless it's the last word */}
                                {wordIndex !== words.length - 1 && <span>&nbsp;</span>}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
