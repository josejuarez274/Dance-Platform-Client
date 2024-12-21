import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white text-center p-4">
            <p>&copy; 2024 Dance Platform. All Rights Reserved.</p>
            <nav className="flex justify-center gap-4 mt-2">
                <a href="#" className="hover:underline">
                    Privacy Policy
                </a>
                <a href="#" className="hover:underline">
                    Terms of Service
                </a>
            </nav>
        </footer>
    );
};

export default Footer;
