import React from 'react';
import { motion } from "framer-motion";
import { FaGlassCheers, FaUserFriends } from "react-icons/fa";
const UserIcon = FaUserFriends as unknown as React.FC<{ className?: string }>;
const GlassIcon = FaGlassCheers as unknown as React.FC<{ className?: string }>;



const ServicesSection: React.FC = () => {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-yellow-500">
          What I Offer
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Event Performances */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-8 rounded-2xl shadow-xl text-left"
          >
            <GlassIcon className="text-yellow-500 text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-3">Event Performances</h3>
            <p className="text-gray-300 mb-4">
              Captivate your guests with Veladura, a Latin fusion style that blends precision, rhythm, and emotion.
            </p>
            <p className="text-sm text-gray-400 italic mb-4">
              Ideal for restaurants, lounges, VIP events.
            </p>
            <button>
            <a
              href="https://calendly.com/ascendstudios-art/30min"
              target="_blank"
              className="inline-block bg-yellow-500 text-black font-semibold py-2 px-5 rounded hover:bg-yellow-400 transition"
            >
              Book a Free Demo
            </a>
            </button>
          </motion.div>

          {/* Private Lessons */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-8 rounded-2xl shadow-xl text-left"
          >
            <UserIcon className="text-yellow-500 text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-3">Private Lessons</h3>
            <p className="text-gray-300 mb-4">
              Accelerate your growth through 1-on-1 guidance focused on confidence, connection, and emotional rhythm.
            </p>
            <p className="text-sm text-gray-400 italic mb-4">
              Perfect for individuals, couples, or beginners.
            </p>
            <button>
            <a
              href="https://calendly.com/ascendstudios-art/private-1-on-1-sessions"
              target="_blank"
              className="inline-block bg-yellow-500 text-black font-semibold py-2 px-5 rounded hover:bg-yellow-400 transition"
            >
              Book a Private
            </a>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
