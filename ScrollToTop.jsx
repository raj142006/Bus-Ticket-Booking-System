import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled down 300px
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Calculate scroll progress
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
            <svg className="scroll-progress-ring" width="50" height="50">
                <circle
                    className="scroll-progress-ring-circle"
                    stroke="rgba(102, 126, 234, 0.2)"
                    strokeWidth="3"
                    fill="transparent"
                    r="20"
                    cx="25"
                    cy="25"
                />
                <circle
                    className="scroll-progress-ring-circle"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    fill="transparent"
                    r="20"
                    cx="25"
                    cy="25"
                    style={{
                        strokeDasharray: `${2 * Math.PI * 20}`,
                        strokeDashoffset: `${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`
                    }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                </defs>
            </svg>
            <span className="scroll-arrow">↑</span>
        </div>
    );
};

export default ScrollToTop;
