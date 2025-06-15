import { useState, useEffect } from "react";

const phrases = ["INSPIRE", "INNOVATE", "ENGINEER"];

export const GlitchText = () => {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [displayPhrase, setDisplayPhrase] = useState(phrases[0]);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhrase(
        (prev) => phrases[(phrases.indexOf(prev) + 1) % phrases.length],
      );
    }, 2000);

    let glitchInterval: NodeJS.Timeout;
    glitchInterval = setInterval(() => {
      let text = currentPhrase;
      let newText = "";
      for (let i = 0; i < text.length; i++) {
        newText += Math.random() > 0.85 ? "█" : text[i];
      }
      setDisplayPhrase(newText);
    }, 50);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(glitchInterval);
    };
  }, [currentPhrase]);

  return (
    <a
      href="legacy/college"
      rel="noopener noreferrer"
      className="font-mono text-lg md:text-xl text-center text-evening-sea-300 tracking-widest uppercase
                 hover:text-white hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.6)] transition-all duration-300"
    >
      {displayPhrase}
    </a>
  );
};
