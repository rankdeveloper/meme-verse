import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram } from "lucide-react";
import { useAppSelector } from "../../hooks/useRedux";
import { ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  const { darkMode } = useAppSelector((state) => state.ui);

  return (
    <footer
      className={`py-8 ${
        darkMode ? "bg-[#0e1217] text-white" : "bg-gray-100 text-gray-800"
      } transition-colors duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-between items-center">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              meme<span className="text-[#ffff00]">Verse</span>
            </h3>
            <p className="mb-4">
              Let's make the internet a happier place, one meme at a time!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-500 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="flex">
            <div className="w-auto md:w-[200px]">
              <Link
                to="/upload"
                className={` px-6 py-3 font-medium rounded-full border-2 border-purple-500 flex items-center ${
                  darkMode ? "text-white" : "text-purple-500"
                } hover:bg-purple-500 hover:text-white transition-colors`}
              >
                Create Your Own
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="mb-2">Have questions or feedback?</p>
            <a
              href="mailto:info@memeverse.com"
              className="text-purple-500 hover:underline"
            >
              info@memeverse.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p>
            &copy; {new Date().getFullYear()} memeVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
