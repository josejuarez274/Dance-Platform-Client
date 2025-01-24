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
                <div className="navbar-logo">
                    <a href="/">Ascend Studios</a>
                </div>

                {/* Hamburger Menu */}
                <div className="navbar-toggle" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                {/* Links */}
                <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/classes">Bookings</Link></li>
                    <li><Link to="/rewards">Rewards</Link></li>
                    <li><Link to="/events">Events</Link></li>

                    {/* Buttons in dropdown for smaller screens */}
                    {isMenuOpen && (
                        <div className="navbar-cta">
                            {user ? (
                                <div className="user-info">
                                    <h2>Welcome</h2>
                                    <h3>{user.firstName}</h3>
                                    <button onClick={() => {
                                        setUser(null);
                                        setToken(null);
                                    }} className="btn">Logout</button>
                                </div>
                            ) : (
                                <>
                                    <button onClick={toggleLogin} className="btn">Login</button>
                                    <a href="#signup" className="btn btn-primary" onClick={toggleRegister}>Register</a>
                                </>
                            )}
                        </div>
                    )}
                </ul>

                {/* Buttons for wider screens */}
                {!isMenuOpen && (
                    <div className="navbar-cta">
                        {user ? (
                            <div className="user-info">
                                <h2>Welcome</h2>
                                <h3>{user.firstName}</h3>
                                <button onClick={() => {
                                    setUser(null);
                                    setToken(null);
                                }} className="btn">Logout</button>
                            </div>
                        ) : (
                            <>
                                <button onClick={toggleLogin} className="btn">Login</button>
                                <a href="#signup" className="btn btn-primary" onClick={toggleRegister}>Register</a>
                            </>
                        )}
                    </div>
                )}
            </nav>

            {/* Render Login Modal */}
            {isLoginOpen && <Login onClose={toggleLogin} onCreateAccount={toggleRegister} />}
            {/* Render Register Modal */}
            {isRegisterOpen && <Register onClose={toggleRegister} onLogin={toggleLogin} />}
        </>
    );
};

export default Navbar;
