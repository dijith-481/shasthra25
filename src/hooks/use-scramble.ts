import { useRef, useState } from "react";

const CHARS = "!@#$%^&*():{};|,.<>/?";

export const useScramble = (text: string) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (pos / 2 > index) {
            return char;
          }
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          return randomChar;
        })
        .join("");
      setDisplayText(scrambled);
      pos++;
      if (pos >= text.length * 2) {
        clearInterval(intervalRef.current!);
        setDisplayText(text);
      }
    }, 15);
  };

  const stopScramble = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      setDisplayText(text);
    }
  };

  return { displayText, scramble, stopScramble };
};
