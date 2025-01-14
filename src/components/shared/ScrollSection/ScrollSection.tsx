import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./scrollSection.css";

interface ScrollSectionProps {
    videoPath: string;
    title: string;
    description: string;
    buttonText: string;
    isFirst?: boolean; // Optional prop to identify the first section
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ videoPath, title, description, buttonText, isFirst = false }) => {
    const [scrollProgress, setScrollProgress] = useState(0); // Tracks progress within the section
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const sectionHeight = rect.height;

                if (isFirst) {
                    // For the first section, start progress only when scrolling down
                    const firstSectionProgress = Math.min(
                        Math.max(0, window.scrollY) / sectionHeight,
                        1
                    );
                    setScrollProgress(firstSectionProgress);
                } else {
                    // For other sections, calculate progress based on viewport visibility
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const normalizedProgress = Math.min(
                            Math.max(0, window.innerHeight - rect.top) / sectionHeight,
                            1
                        );
                        setScrollProgress(normalizedProgress);
                    } else {
                        setScrollProgress(0); // Reset when out of view
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isFirst]);

    return (
        <div className="scroll-section" ref={sectionRef}>
            {/* Video */}
            <motion.video
                autoPlay
                muted
                loop
                playsInline
                className="scroll-video"
                style={{
                    transform: `scale(${1 - 0.5 * scrollProgress})`, // Shrinks gradually from scale(1) to scale(0.5)
                    opacity: Math.max(1 - 0.6 * scrollProgress, 0.4), // Gradually fades to 40% opacity
                }}
            >
                <source src={videoPath} type="video/mp4" />
                <p>Your browser does not support the video tag.</p>
            </motion.video>

            {/* Overlay */}
            <div className="scroll-overlay"></div>

            {/* Content */}
            <motion.div
                className="scroll-content"
                initial={{ opacity: 0, y: 50 }}
                whileHover={{ scale: 1.1, rotate: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h3 className="scroll-title">{title}</h3>
                <p className="scroll-description">{description}</p>
                <button className="scroll-button">{buttonText}</button>
            </motion.div>
        </div>
    );
};

export default ScrollSection;
