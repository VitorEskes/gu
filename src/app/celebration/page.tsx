"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const CelebrationPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  const celebrationContent = [
    {
      text: "Parabéns! 🎉",
      images: ["/imagem1.png", "/imagem2.jpg", "/imagem3.jpg"],
    },
    {
      text: "Você é incrível! ⭐",
      images: ["/imagem4.jpg", "/imagem5.jpg", "/imagem6.jpg"],
    },
    {
      text: "Continue brilhando! 💫",
      images: ["/imagem7.jpg", "/imagem8.jpg", "/imagem9.jpg"],
    },
    {
      text: "Sua energia é contagiante! ✨",
      images: ["/imagem10.jpg", "/imagem11.jpg", "/imagem12.jpg"],
    },
    {
      text: "Você faz a diferença! 🌟",
      images: ["/imagem13.jpg", "/imagem14.jpg", "/imagem15.jpg"],
    },
  ];

  // Atualiza o índice automaticamente a cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < celebrationContent.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (!showFinal) {
        setShowFinal(true);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, showFinal]);

  // Gera posições aleatórias no cliente
  useEffect(() => {
    const generateRandomPositions = () => {
      if (typeof window !== "undefined") {
        return celebrationContent[currentIndex].images.map(() => {
          const maxWidth = window.innerWidth - 256; // Ajuste para o tamanho da imagem
          const maxHeight = window.innerHeight - 256;
          return {
            x: Math.random() * maxWidth,
            y: Math.random() * maxHeight,
          };
        });
      }
      return [];
    };

    setPositions(generateRandomPositions());
  }, [currentIndex]);

  const imageVariants = {
    enter: { opacity: 0, scale: 0.5, rotate: -10 },
    center: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 1.5, rotate: 10 },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950 overflow-hidden">
      <AnimatePresence mode="wait">
        {!showFinal ? (
          <motion.div
            key={currentIndex}
            className="absolute flex flex-col items-center justify-center w-full h-full"
          >
            {/* Texto centralizado */}
            <motion.h2
              className="text-6xl md:text-8xl text-white font-bold text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              {celebrationContent[currentIndex].text}
            </motion.h2>

            {/* Imagens aleatórias */}
            {positions.map((position, index) => (
              <motion.div
                key={index}
                className="absolute w-64 h-64 rounded-lg overflow-hidden"
                initial="enter"
                animate="center"
                exit="exit"
                variants={imageVariants}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute",
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                }}
              >
                <Image
                  src={celebrationContent[currentIndex].images[index]}
                  alt={`Celebration ${index + 1}`}
                  width={256}
                  height={256}
                  className="object-cover"
                  priority
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center px-4"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-8"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🎂 Feliz Aniversário! 🎂
            </motion.h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
              Que seu dia seja tão especial quanto você é. Que cada momento seja
              repleto de sorrisos, amor e muitas realizações. Continue sendo
              essa pessoa incrível que ilumina a vida de todos ao seu redor!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CelebrationPage;
