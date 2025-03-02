import { Sparkles, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUsCard({
  whychooseusData,

  darkMode,
}: any) {
  return (
    <section
      className={`border-t md:border-t-[#3b4458]  py-16 ${
        darkMode ? "bg-[#0e1217]" : "bg-white border-t md:border-t-purple-500"
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Why Choose meme<span className="text-[#ffff00]">Verse</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whychooseusData.map((item: any) => (
            <motion.div
              key={item.id}
              className={`p-6 rounded-xl shadow-lg ${
                darkMode ? "bg-[#1c1f26]" : "bg-white"
              } bg-gradient-to-r from-purple-500 to-pink-500 border border-purple-500 p-4`}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                {item.iconName === "Sparkles" && (
                  <Sparkles size={24} className="text-white" />
                )}
                {item.iconName === "Zap" && (
                  <Zap size={24} className="text-white" />
                )}
                {item.iconName === "TrendingUp" && (
                  <TrendingUp size={24} className="text-white" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
