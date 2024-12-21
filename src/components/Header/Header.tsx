import React, { useState } from "react";

const Header: React.FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
            <div className="text-lg font-bold">LOGO</div>
            <button
                onClick={() => setMenuOpen(!isMenuOpen)}
                className="md:hidden text-white"
            >
                ☰
            </button>
            <nav
                className={`${
                    isMenuOpen ? "block" : "hidden"
                } absolute top-12 right-4 bg-gray-900 text-white md:flex gap-4 md:static`}
            >
                <a href="#home" className="hover:underline">
                    Home
                </a>
                <a href="#classes" className="hover:underline">
                    Classes
                </a>
                <a href="#tutorials" className="hover:underline">
                    Tutorials
                </a>
                <a href="#rewards" className="hover:underline">
                    Rewards
                </a>
            </nav>
            <button className="hidden md:block bg-blue-500 px-4 py-2 rounded">
                Sign Up
            </button>
        </header>
    );
};

export default Header;
