import React from "react";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import Footer from "./components/Footer.tsx";

const HomePage: React.FC = () => {
    return (
        <>
            <Header />
            <Hero />
            <Footer />
        </>
    );
};

export default HomePage;
