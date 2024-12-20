import React from "react";

const Hero: React.FC = () => {
    return (
        <div className="text-center bg-gray-100 py-10">
            <h1 className="text-4xl font-bold mb-4">Unleash Your Inner Dancer</h1>
            <p className="text-lg mb-6">Learn from a professional dancer and transform your moves.</p>
            <div className="flex justify-center gap-4">
                <button className="bg-blue-500 text-white px-6 py-3 rounded">Book a Class</button>
                <button className="bg-gray-500 text-white px-6 py-3 rounded">Watch a Demo</button>
            </div>
        </div>
    );
};

export default Hero;
