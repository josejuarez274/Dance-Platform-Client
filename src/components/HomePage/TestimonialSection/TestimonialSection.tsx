import React from 'react';
import { motion } from "framer-motion";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6">
          Real Moments. Real Reactions.
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-8">
          We’re gathering the best testimonials from dancers, clients, and event hosts. <br />
          <span className="text-white font-semibold">Stay tuned — your story could be next.</span>
        </p>
        <p className="text-sm font-bold text-gray-500 italic">
          Want to be featured early? DM us your feedback on Instagram or email us directly.
        </p>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
