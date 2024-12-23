import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo">
                <a href="/">Ascend Studios</a>
            </div>

            {/* Menu for larger screens */}
            <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
                <li><a href="#classes">Classes</a></li>
                <li><a href="#privates">Privates</a></li>
                <li><a href="#rewards">Rewards</a></li>
                <li><a href="#events">Events</a></li>
            </ul>

            {/* Call-to-Actions */}
            <div className="navbar-cta">
                <a href="#login" className="btn">Login</a>
                <a href="#signup" className="btn btn-primary">Sign Up</a>
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="navbar-toggle" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;
