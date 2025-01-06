"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const questions = [
  { question: "Seu nome é gustavo?", canClickNo: true },
  { question: "Tem certeza?", canClickNo: true },
  { question: "Absuluta?", canClickNo: true },
  { question: "Você é pretinho?", canClickNo: false },
  { question: "Você é feinho?", canClickNo: false },
  { question: "Você é podre de nojento?", canClickNo: false },
  { question: "Você faz mal para todos a sua volta?", canClickNo: false }
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const handleMouseMove = (e) => {
    if (!questions[currentQuestion].canClickNo) {
      const noButton = document.getElementById('noButton');
      if (noButton) {
        const rect = noButton.getBoundingClientRect();
        if (Math.abs(e.clientX - rect.left) < 100 && Math.abs(e.clientY - rect.top) < 100) {
          setMousePos({
            x: Math.random() * (window.innerWidth - 100),
            y: Math.random() * (window.innerHeight - 100)
          });
        }
      }
    }
  };

  const handleAnswer = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      router.push('/celebration');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-950" 
         onMouseMove={handleMouseMove}>
      <motion.h1 
        key={currentQuestion}
        className="text-5xl md:text-7xl font-bold text-center text-white mb-16 tracking-wider"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {questions[currentQuestion].question}
      </motion.h1>

      <motion.button
        className="bg-gray-800 text-white font-bold py-4 px-10 rounded-full mb-8 
                   border-2 border-white/10 shadow-xl hover:bg-gray-700"
        onClick={handleAnswer}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sim
      </motion.button>
      
      <motion.button
        id="noButton"
        onClick={questions[currentQuestion].canClickNo ? handleAnswer : undefined}
        className={`bg-gray-800 text-white font-bold py-4 px-10 rounded-full
                   border-2 border-white/10 shadow-xl hover:bg-gray-700
                   ${!questions[currentQuestion].canClickNo ? 'cursor-default absolute' : ''}`}
        style={!questions[currentQuestion].canClickNo ? {
          left: mousePos.x,
          top: mousePos.y,
        } : {}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        Não
      </motion.button>
    </div>
  );
};

export default QuizPage;