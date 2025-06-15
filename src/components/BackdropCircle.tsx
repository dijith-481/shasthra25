import { useState } from "react";

interface Props {
  top: number;
  left: number;
  rotation: number;
  size: number;
  colorClass: string;
}

export const BackdropCircle = ({
  top,
  left,
  rotation,
  size,
  colorClass,
}: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const handleMouseEnter = () => setIsVisible(false);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className={`absolute rounded-full backdrop-blur-sm transition-opacity duration-700 ease-in-out blur-md  ${isVisible ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"}`}
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
