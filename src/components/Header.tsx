"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useScramble } from "@/hooks/use-scramble";
import { useColorContext } from "@/context/color";
import { mixColors } from "@/utils/colorUtils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Competitions", href: "/competitions" },
  { name: "Schedule", href: "/schedule" },
];

export function Header() {
  const { color } = useColorContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { displayText, scramble, stopScramble } = useScramble("SHASTHRA'25");

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setIsScrolled(isScrolled);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showHeader = !isHomePage || isScrolled;

  const menuVariants = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.1 },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (showHeader) {
      scramble();
    } else {
      stopScramble();
    }
  }, [showHeader, scramble, stopScramble, color]);

  return (
    <motion.section
      id="header"
      className={`top-0 left-0 z-50 w-full  fixed   md:h-18 h-10 transition-all ease-in-out duration-700 ${showHeader ? "opacity-100" : "opacity-0"} `}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
    >
      <div className="absolute top-0 left-0  z-2 w-[200vw] translate-x-[-25%] translate-y-[-50%] h-24 md:h-47   blur-xl   bg-black/80  "></div>
      <div className="absolute top-0 left-0  z-1 w-[200vw] translate-x-[-25%] translate-y-[-33%] h-14 md:h-27 backdrop-blur-md  md:backdrop-blur-xl"></div>
      <header
        className={` absolute text-white top-0 h-full z-3  w-full transition-colors duration-300 ease-in-out`}
        style={{
          color: color,
        }}
      >
        <nav className=" flex  items-center justify-between  px-4 py-1 md:py-4 ">
          <Link
            href="/"
            className={`md:text-2xl w-32 text-xl font-semibold md:font-black tracking-tighter  md:w-48 ${isOpen ? "opacity-0" : "opacity-100"}`}
          >
            {displayText}
          </Link>

          <div
            className="hidden md:flex items-center z-41 gap-x-8"
            style={{
              color: color + "c0",
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6  hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div
            className="hidden md:flex text-white border hover:font-black w-32  items-center justify-center  rounded-full text-xs md:text-sm     z-10      backdrop-blur-2xl   py-1       "
            style={{
              color: color + "c0",
              borderColor: color + "c0",
            }}
          >
            <Link href="/signup" className="">
              Sign Up
            </Link>
          </div>

          <div className="flex md:hidden px-4 ">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="relative h-5 w-6 text-white z-50"
              style={{
                color: color + "c0",
              }}
              aria-label="Open menu"
            >
              <motion.div
                className="absolute top-1/2 left-1/2 h-0.5 w-4 bg-current"
                animate={{
                  y: isOpen ? 0 : -6,
                  rotate: isOpen ? 45 : 0,
                  transformOrigin: "center",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 h-0.5 w-4 bg-current"
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.1 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 h-0.5 w-4 bg-current"
                animate={{
                  y: isOpen ? 0 : 6,
                  rotate: isOpen ? -45 : 0,
                  transformOrigin: "center",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
            </motion.button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => {
              setIsOpen(false);
              console.log("clicked");
            }}
            variants={menuVariants}
            className="fixed inset-0 z-2 flex flex-col items-center justify-center backdrop-blur-2xl   md:hidden"
            style={{
              backgroundColor: mixColors(color, "#ffffff", 0.5, 0.05),
            }}
          >
            <div
              className="flex flex-col items-center gap-y-8"
              style={{
                color: mixColors(color, "#000000", 0.5, 1),
              }}
            >
              {navItems.map((item) => (
                <motion.div key={item.name} variants={listItemVariants}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-bold   transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={listItemVariants}
                className="mt-8"
                style={{
                  color: mixColors(color, "#000000", 0.5, 1),
                }}
              >
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold rounded-full bg-white/10 px-6 py-3  hover:bg-white/20 transition-all"
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
