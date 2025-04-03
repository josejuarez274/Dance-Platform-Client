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
      "I recommend reaching out at least 2–3 weeks in advance for events. For privates, 48–72 hours works best.",
  },
  {
    question: "Do you travel for events?",
    answer:
      "Yes. I’m based in Denver, Colorado but open to traveling for special events depending on availability and scope.",
  },
  {
    question: "What kind of music do you dance to?",
    answer:
      "Mostly Latin — Bachata is my specialty but I combine it with romance from ballet, tango, and ballroom — but I customize it to match your venue’s mood or your personal taste.",
  },
  {
    question: "I’m a complete beginner. Can I still take privates?",
    answer:
      "Absolutely. My privates are made to guide you from the ground up — no experience needed.",
  },
  {
    question: "Can I bring a partner to my private lesson?",
    answer:
      "Yes! You can come solo or bring a partner. I’ll help you both improve connection, technique, and flow.",
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
