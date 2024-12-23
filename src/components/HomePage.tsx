import React from "react";
import ScrollSection from "./ScrollSection/ScrollSection.tsx";
import Footer from "./Footer/Footer.tsx";
import CardGrid from "./CardGrid/CardGrid.tsx";
import Navbar from "./Navbar/Navbar.tsx";

const HomePage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <ScrollSection
                videoPath="/assets/demo.mp4"
                title="Learn Sensual Bachata"
                description="Master the art of bachata with our wide range of classes."
                buttonText="Get Started"
                isFirst={true}
            />
            <CardGrid />
            <ScrollSection
                videoPath="/assets/lalo_combo.mp4"
                title="Need more 1-1 time?"
                description="Sign up for a private!"
                buttonText="Sign Up Now"
            />
            <ScrollSection
                videoPath="/assets/favorite_combo.mp4"
                title="Rewards and Benefits"
                description="Take your skills to the next level and sign up for our premium membership"
                buttonText="Register for Premium"
            />
            <Footer />
        </div>
    );
};

export default HomePage;
