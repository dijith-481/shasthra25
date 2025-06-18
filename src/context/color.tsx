"use client";
import { createContext, useContext, useState } from "react";

interface ColorContextType {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}
export const ColorContext = createContext<ColorContextType>({
  color: "#ffffff",
  setColor: () => {},
});

export const useColorContext = (): ColorContextType => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error(
      "useColorContext must be used within a ColorContextProvider",
    );
  }
  return context;
};

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [color, setColor] = useState("#ffffff");

  const contextValue = {
    color,
    setColor,
  };
  return (
    <ColorContext.Provider value={contextValue}>
      {children}
    </ColorContext.Provider>
  );
};
