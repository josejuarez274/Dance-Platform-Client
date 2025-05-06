import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Hls from "hls.js";
import "./scrollSection.css";

interface ScrollSectionProps {
  videoPath: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  isFirst?: boolean; // Optional prop to identify the first section
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
                                                       videoPath,
                                                       title,
                                                       description,
                                                       buttonText,
                                                       buttonHref,
                                                       isFirst = false
                                                     }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;

        if (isFirst) {
          const firstSectionProgress = Math.min(
            Math.max(0, window.scrollY) / sectionHeight,
            1
          );
          setScrollProgress(firstSectionProgress);
        } else {
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const normalizedProgress = Math.min(
              Math.max(0, window.innerHeight - rect.top) / sectionHeight,
              1
            );
            setScrollProgress(normalizedProgress);
          } else {
            setScrollProgress(0);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFirst]);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoPath);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = videoPath;
      }
    }
  }, [videoPath]);

  return (
    <div className="scroll-section" ref={sectionRef}>
      <motion.video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="scroll-video"
        style={{
          transform: `scale(${1 - 0.5 * scrollProgress})`,
          opacity: Math.max(1 - 0.6 * scrollProgress, 0.4),
        }}
      />

      <div className="scroll-overlay"></div>

      <motion.div
        className="scroll-content"
        initial={{ opacity: 0, y: 50 }}
        whileHover={{ scale: 1.1, rotate: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3 className="scroll-title">
          {title.split("\\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h3>

        <p className="scroll-description">{description}</p>
        <button className="scroll-button">
          <a href={buttonHref} target="_blank">
            {buttonText}
          </a>
        </button>
      </motion.div>
    </div>
  );
};

export default ScrollSection;
