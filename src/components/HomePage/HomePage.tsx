import React from "react";

import ScrollSection from "../shared/ScrollSection/ScrollSection";
import Footer from "./Footer/Footer";
import CardGrid from "./CardGrid/CardGrid";
import Calendly from "components/Calendly/Calendly";
import AboutSection from "components/HomePage/AboutSection/AboutSection";
import ServicesSection from "components/HomePage/ServicesSection/ServicesSection";
import FAQSection from "components/HomePage/FAQSection/FAQSection";
import TestimonialSection from "components/HomePage/TestimonialSection/TestimonialSection";
import GoogleReviewsCarousel from "components/HomePage/GoogleReviews/GoogleReviews";

const HomePage: React.FC = () => {
    return (
        <div>
            <ScrollSection
                videoPath="https://customer-hrqnmg2uazt18n7t.cloudflarestream.com/798589b71671900a76990f06a86b67d3/manifest/video.m3u8"
                title="Captivate Your Guests.\n Elevate Your Space."
                description="Lalo brings Veladura — a new style of Latin movement fused with elegance, structure, and emotional energy — designed to awaken attention and create an unforgettable vibe."
                buttonText="Book a Free Demo"
                buttonHref="https://calendly.com/ascendstudios-art/30min"
                isFirst={true}
                posterImage="/assets/supercard.jpg"
            />
          <ServicesSection/>
            <ScrollSection
                videoPath="https://customer-hrqnmg2uazt18n7t.cloudflarestream.com/c8a850f955d0e8aea872b17dd653678c/manifest/video.m3u8"
                title="Benefits of a Private"
                description="Fastest way to grow as a dancer!"
                buttonText="Book a Private"
                buttonHref="https://calendly.com/ascendstudios-art/private-1-on-1-sessions"
                posterImage="/assets/privates.jpg"
            />
            <AboutSection />
            <FAQSection />
          <TestimonialSection />
          <GoogleReviewsCarousel />
            <Footer />
        </div>
    );
};

export default HomePage;
