import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* CTA */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
            Ready to Dance?
          </h2>
          <p className="text-gray-300 mb-6">
            Let’s create something unforgettable.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://calendly.com/ascendstudios-art/30min"
              className="bg-yellow-500 text-black font-semibold py-2 px-6 rounded hover:bg-yellow-400 transition"
            >
              Book a Demo
            </a>
            <a
              href="https://calendly.com/ascendstudios-art/private-1-on-1-sessions"
              className="bg-transparent border border-yellow-500 text-yellow-500 font-semibold py-2 px-6 rounded hover:bg-yellow-500 hover:text-black transition"
            >
              Sign Up for a Private
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm font-bold text-gray-500 gap-4">
            <div>
              © {new Date().getFullYear()} Ascend Studios. All Rights Reserved.
            </div>
            <div className="flex gap-4 font-bold">
              <a
                href="https://instagram.com/ascendwithlalo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-500"
              >
                Instagram
              </a>
              <a
                href="mailto:ascendstudios.art@gmail.com"
                className="hover:text-yellow-500"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
