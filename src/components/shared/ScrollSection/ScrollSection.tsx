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
  isFirst?: boolean;
  posterImage?: string;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
                                                       videoPath,
                                                       title,
                                                       description,
                                                       buttonText,
                                                       buttonHref,
                                                       isFirst = false,
                                                       posterImage
                                                     }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll progress effect
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

  // Lazy load + autoplay when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoPath);
            hls.attachMedia(videoRef.current);
          } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
            videoRef.current.src = videoPath;
          }
          videoRef.current.play().catch(() => {});
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [videoPath]);

  // Toggle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      const newMuteState = !isMuted;
      videoRef.current.muted = newMuteState;
      videoRef.current.play().catch(() => {});
      setIsMuted(newMuteState);
    }
  };

  return (
    <div className="scroll-section" ref={sectionRef}>
      <motion.video
        ref={videoRef}
        muted={isMuted}
        loop
        playsInline
        preload="none"
        poster={posterImage}
        className="scroll-video"
        style={{
          transform: `scale(${1 - 0.5 * scrollProgress})`,
          opacity: Math.max(1 - 0.6 * scrollProgress, 0.4),
        }}
      />

      <button className="unmute-button" onClick={toggleMute}>
        {isMuted ? "🔊 Tap for Sound" : "🔇 Mute"}
      </button>

      <div className="scroll-overlay" />

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
          <a href={buttonHref} target="_blank" rel="noopener noreferrer">
            {buttonText}
          </a>
        </button>
      </motion.div>
    </div>
  );
};

export default ScrollSection;
