import React from 'react';
import { motion } from "framer-motion";
//import Image from "next/image"; // or regular <img> if not using Next.js
//import profilePic from "/assets/lalo-about.JPG"; // rename your image to this or adjust path

const AboutSection: React.FC = () => {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
      >
        {/* IMAGE */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src="/assets/lalo-about.JPG" // or use public URL if not importing
            alt="Lalo smiling"
            className="rounded-2xl shadow-xl object-cover w-full h-auto"
          />
        </div>

        {/* TEXT */}
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-500">
            From the Streets to the Stage
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-300">
            I’m Lalo — a performer, teacher, and artist driven by movement.
            <br /><br />
            What began as a personal passion has evolved into Veladura — a new Latin dance style that fuses bachata with elements of ballet, tango, and ballroom. This blend elevates spaces with structure and soul, guiding others toward presence, confidence, and artistic power.
            <br /><br />
            Ascend Studios was born from this mission:
            To fuse emotion, elegance, and movement into moments people never forget.
            <br /><br />
            Whether I’m performing live or teaching a private, my goal is simple:
            <br />
            <span className="italic text-white font-semibold">Make them feel something real.</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
