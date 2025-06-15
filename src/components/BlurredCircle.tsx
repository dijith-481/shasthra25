import { useState } from "react";

interface Props {
  top: number;
  left: number;
  rotation: number;
  size: number;
  colorClass: string;
}

export const BlurredCircle = ({
  top,
  left,
  rotation,
  size,
  colorClass,
}: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleInteraction = () => {
    setIsVisible(false);
  };

  return (
    <div
      onMouseEnter={handleInteraction}
      className={`absolute rounded-full blur-2xl transition-opacity duration-700 ease-in-out ${colorClass} ${
        isVisible
          ? "opacity-60 cursor-pointer"
          : "opacity-0 pointer-events-none"
      }`}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    />
  );
};
