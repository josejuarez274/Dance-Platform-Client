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
                videoPath="https://customer-hrqnmg2uazt18n7t.cloudflarestream.com/a358220c8f568323a515c49cc1d9505b/manifest/video.m3u8"
                title="Captivate Your Guests.\n Elevate Your Space."
                description="Lalo brings Veladura — a new style of Latin movement fused with elegance, structure, and emotional energy — designed to awaken attention and create an unforgettable vibe."
                buttonText="Book a Free Demo"
                buttonHref="https://calendly.com/ascendstudios-art/30min"
                isFirst={true}
            />
          <ServicesSection/>
            <ScrollSection
                videoPath="https://customer-hrqnmg2uazt18n7t.cloudflarestream.com/608c28d7ec7c03143bbd3853ec444b13/manifest/video.m3u8"
                title="Benefits of a Private"
                description="Fastest way to grow as a dancer!"
                buttonText="Book a Private"
                buttonHref="https://calendly.com/ascendstudios-art/private-1-on-1-sessions"
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
