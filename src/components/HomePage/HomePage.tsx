import React from "react";

import ScrollSection from "../shared/ScrollSection/ScrollSection";
import Footer from "./Footer/Footer";
import CardGrid from "./CardGrid/CardGrid";
import Calendly from "components/Calendly/Calendly";
import AboutSection from "components/HomePage/AboutSection/AboutSection";
import ServicesSection from "components/HomePage/ServicesSection/ServicesSection";
import FAQSection from "components/HomePage/FAQSection/FAQSection";
import TestimonialSection from "components/HomePage/TestimonialSection/TestimonialSection";

const HomePage: React.FC = () => {
    return (
        <div>
            <ScrollSection
                videoPath="/assets/demo.mp4"
                title="Captivate Your Guests.\n Elevate Your Space."
                description="Lalo brings Veladura — a new style of Latin movement fused with elegance, structure, and emotional energy — designed to awaken attention and create an unforgettable vibe."
                buttonText="Book a Free Demo"
                buttonHref="https://calendly.com/ascendstudios-art/30min"
                isFirst={true}
            />
          <ServicesSection/>
            <ScrollSection
                videoPath="/assets/lalo_combo.mp4"
                title="Benefits of a Private"
                description="Fastest way to grow as a dancer!"
                buttonText="Book a Private"
                buttonHref="https://calendly.com/ascendstudios-art/private-1-on-1-sessions"
            />
            <AboutSection />
            <FAQSection />
          <TestimonialSection />
            <Footer />
        </div>
    );
};

export default HomePage;
