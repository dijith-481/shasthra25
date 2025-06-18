import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

interface DropDownProps {
  options: Record<string, string>;
  selectedOption?: string;
  onSelect: (option: string) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClose: () => void;
  color?: string;
}

const MIN_WIDTH_PX = 96;

export default function DropDown({
  options,
  selectedOption,
  onSelect,
  triggerRef,
  isOpen,
  onClose,
  color,
}: DropDownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    translateX: 0,
  });
  const [hasPositionBeenCalculated, setHasPositionBeenCalculated] =
    useState(false);
  const [shouldDropUp, setShouldDropUp] = useState(false);

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) {
      setHasPositionBeenCalculated(false);
      return;
    }

    const updatePosition = () => {
      if (!triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current?.scrollHeight || 0;
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      const verticalOffset = 8;

      const shouldDropUpCalc =
        spaceBelow < dropdownHeight + verticalOffset &&
        spaceAbove > spaceBelow + verticalOffset;

      const finalWidth = Math.max(triggerRect.width, MIN_WIDTH_PX);
      const translateX = (triggerRect.width - finalWidth) / 2;

      setShouldDropUp(shouldDropUpCalc);

      setPosition({
        top: shouldDropUpCalc
          ? triggerRect.top - dropdownHeight - verticalOffset
          : triggerRect.bottom + verticalOffset,
        left: triggerRect.left,
        width: finalWidth,
        translateX: translateX,
      });

      if (!hasPositionBeenCalculated) {
        setHasPositionBeenCalculated(true);
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, triggerRef, hasPositionBeenCalculated]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const dropdownContent = (
    <div
      ref={dropdownRef}
      id="dropdown"
      className="fixed bg-white/70 flex  min-w-fit flex-col backdrop-blur-lg rounded-3xl overflow-hidden z-[9999] transform-3d"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        maxHeight: "30vh",
        overflowY: "auto",
        height: hasPositionBeenCalculated ? "auto" : "0px",
        transformOrigin: shouldDropUp ? "bottom" : "top",

        transform: `translateX(${position.translateX}px) ${
          hasPositionBeenCalculated ? "scaleY(1)" : "scaleY(0.9)"
        }`,
        transition: "transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {Object.keys(options).map((optionKey) => (
        <button
          key={optionKey}
          onClick={() => {
            onSelect(optionKey);
          }}
          style={{
            backgroundColor:
              selectedOption === optionKey ? color + "a0" : color + "80",
          }}
          className={`w-full text-center px-4 py-2 text-sm whitespace-nowrap ${
            selectedOption === optionKey
              ? "bg-evening-sea-300/50 text-white font-semibold"
              : "text-black opacity-70 hover:opacity-100 hover:text-black"
          }`}
        >
          {options[optionKey]}
        </button>
      ))}
    </div>
  );

  return createPortal(dropdownContent, document.body);
}
