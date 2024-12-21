import React from "react";
import "./hero.css";

const Hero: React.FC = () => {
    return (
        <div className="hero">
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                className="hero-video"
            >
                <source src="/assets/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay for Better Readability */}
            <div className="hero-overlay"></div>

            {/* Hero Content */}
            <div className="hero-content">
                <h1 className="hero-title">Unleash Your Inner Dancer</h1>
                <p className="hero-text">
                    Learn from a professional dancer and transform your moves.
                </p>
                <div className="hero-buttons">
                    <button className="hero-button hero-button-primary">
                        Book a Class
                    </button>
                    <button className="hero-button hero-button-secondary">
                        Watch a Demo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
