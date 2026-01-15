"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  title: string;
  message: string;
};

const MotivationCard = ({ title, message }: Props) => {
  const [text, setText] = useState(message);
  const [buttonText, setButtonText] = useState("Let’s Train 💪");

  const handleClick = () => {
    setText("You showed up today. Respect 👊");
    setButtonText("Keep Going 🔥");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto text-center"
    >
      <h2 className="text-2xl font-bold mb-3">{title}</h2>

      <p className="text-gray-600 mb-4">{text}</p>

      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {buttonText}
      </button>
    </motion.div>
  );
};

export default MotivationCard;
