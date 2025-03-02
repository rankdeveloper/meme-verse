import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { fetchMemes } from "../store/memeSlice";
import { whychooseusData } from "../utils/rowData";
import "../style.css";
import WhyChooseUsCard from "../components/ui/whychoose-us-card";
import { heroVariants, imgVariants, itemVariants } from "../utils/variants";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { darkMode } = useAppSelector((state) => state.ui);
  const [memeUrl, setMemeUrl] = useState("");

  const fetchMeme = async () => {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      if (data.success) {
        const memes = data.data.memes;
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        setMemeUrl(randomMeme.url);
      }
    } catch (error) {
      console.error("Error fetching meme:", error);
    }
  };
  useEffect(() => {
    fetchMeme();
    const interval = setInterval(fetchMeme, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(fetchMemes());
  }, [dispatch]);

  return (
    <div className="min-h-screen scrollbar-hidden">
      <motion.section
        className={`py-16 md:py-24 ${
          darkMode
            ? "bg-[#0e1217]"
            : "bg-gradient-to-br from-purple-50 to-pink-50"
        }`}
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                Welcome to our meme
                <span className="text-[#ffff00]">Verse</span>
              </motion.h1>
              <motion.p
                className={`text-lg md:text-xl mb-8  ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }  mt-auto md:mt-4`}
                variants={itemVariants}
              >
                Create, share, and laugh with our easy-to-use meme generator.
                Unleash your creativity, craft hilarious memes, and share them
                instantly. Let's make the internet a happier place, one meme at
                a time!
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <Link
                  to="/explore"
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity flex items-center"
                >
                  Explore Memes <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link
                  to="/upload"
                  className={`w-full md:w-auto px-6 py-3 font-medium rounded-full border-2 border-purple-500 flex items-center ${
                    darkMode ? "text-white" : "text-purple-500"
                  } hover:bg-purple-500 hover:text-white transition-colors`}
                >
                  Create Your Own
                </Link>
              </motion.div>
            </div>
            <motion.div
              className="md:w-1/2  flex justify-center gap-5"
              variants={itemVariants}
            >
              <motion.div
                variants={imgVariants}
                initial="initial"
                animate="animate"
                transition={{
                  times: [0, 0.5, 1],
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
                className="flex items-center"
              >
                <img
                  src="https://mememakerr.netlify.app/img/cat.jpg"
                  alt="Random Meme"
                  className="rounded-lg shadow-xl max-w-full h-auto"
                />
              </motion.div>

              <div className="flex flex-col justify-center gap-5">
                <motion.div
                  variants={imgVariants}
                  initial="initial"
                  animate="animate"
                  transition={{
                    times: [0, 0.5, 1],
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className=""
                >
                  <img
                    src="https://mememakerr.netlify.app/img/smile.jpg"
                    alt="Random Meme"
                    className="rounded-lg shadow-xl max-w-full h-auto"
                  />
                </motion.div>

                <motion.div
                  variants={imgVariants}
                  initial="initial"
                  animate="animate"
                  transition={{
                    times: [0, 0.5, 1],
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className=""
                >
                  <img
                    src="https://mememakerr.netlify.app/img/meme13.jpg"
                    alt="Random Meme"
                    className="rounded-lg shadow-xl max-w-full h-auto"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <WhyChooseUsCard whychooseusData={whychooseusData} darkMode={darkMode} />

      <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Own Memes?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of creators and share your humor with the world. It's
            free and takes just a minute to get started.
          </p>
          <Link
            to="/upload"
            className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-colors inline-block"
          >
            Start Creating Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
