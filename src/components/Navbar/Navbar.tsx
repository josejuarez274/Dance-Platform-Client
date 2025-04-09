import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";

import Login from "components/Navbar/AuthModal/Login/Login";
import Register from "components/Navbar/AuthModal/Register/Register";

import AuthContext from "providers/Auth/AuthContext";
import UserContext from "providers/User/UserContext";

import "./Navbar.css";

const Navbar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleLogin = () => {
        setIsLoginOpen(!isLoginOpen);
        setIsRegisterOpen(false);
    };
    const toggleRegister = () => {
        setIsRegisterOpen(!isRegisterOpen);
        setIsLoginOpen(false);
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const { user, setUser } = useContext(UserContext);
    const { token, setToken } = useContext(AuthContext);

    return (
        <>
            <nav className="navbar">
                {/* Logo */}
                <nav className="navbar">
                    <div className="navbar-center">
                        <a href="/" className="navbar-logo-text">ASCEND STUDIOS</a>
                        <p className="navbar-subtext">Light. Layered. Unforgettable.</p>
                    </div>
                </nav>

                {/* Hamburger Menu */}
                { /* <div className="navbar-toggle" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div> */}

                {/* Links */}
                { /* }
                <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/classes">Bookings</Link></li>
                </ul> */}
            </nav>
        </>
    );
};

export default Navbar;
