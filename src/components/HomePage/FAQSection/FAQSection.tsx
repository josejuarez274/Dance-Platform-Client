import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How far in advance should I book?",
    answer:
      "For events, I recommend reaching out 2–3 weeks ahead to reserve your date. For private lessons, 48–72 hours notice works best to ensure availability.",
  },
  {
    question: "Do you travel for events?",
    answer:
      "Yes — I’m based in Denver, Colorado, but open to traveling for special events depending on timing and scope. Let’s talk.",
  },
  {
    question: "What kind of music do you dance to?",
    answer:
      "Primarily Latin, with a focus on Bachata. My signature style, Veladura, blends Bachata with the romantic structure of ballet, tango, and ballroom. The vibe and song can always be tailored to your event or energy.",
  },
  {
    question: "I’m a complete beginner. Can I still take privates?",
    answer:
      "Absolutely. Privates are designed to meet you where you are — whether it’s your first time dancing or you're returning after a break. I’ll guide you every step of the way.",
  },
  {
    question: "Can I bring a partner to my private lesson?",
    answer:
      "Yes, you're welcome to bring a partner. Whether solo or paired, my focus is on helping you build authentic connection, emotional rhythm, and confidence on the dance floor.",
  },
  {
    question: "Do you offer group classes?",
    answer:
      "Yes — group classes are currently in the works. I’m in the process of partnering with local studios and gyms to bring Veladura to more people. Stay tuned for updates and announcements.",
  },
  {
    question: "What is Veladura?",
    answer:
      "Veladura is a new style of Bachata created by Lalo — fusing the sensual expression of Bachata with the structure, grace, and storytelling of ballet, tango, and ballroom. It's a layered style focused on elegance, emotional connection, and poetic movement. Each dance becomes a moment — light, layered, unforgettable.",
  },
];


const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-yellow-500 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-700 pb-4 cursor-pointer"
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-semibold">
                  {faq.question}
                </h3>
                <span className="text-yellow-500 text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400 mt-4"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
