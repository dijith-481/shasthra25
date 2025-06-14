import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const festLogos = [
  {
    year: 2024,
    name: "Shasthra '24",
    imageUrl: "excel2024.png",
    color: "#674671",
  },
  {
    year: 2023,
    name: "Shasthra '23",
    imageUrl: "excel2023.png",
    color: "#cd1167",
  },
  {
    year: 2022,
    name: "Shasthra '22",
    imageUrl: "excel2022.png",
    color: "#25b5c9",
  },
  {
    year: 2021,
    name: "Shasthra '21",
    imageUrl: "excel2021.png",
    color: "#ea56f1",
  },
  {
    year: 2020,
    name: "Shasthra '20",
    imageUrl: "excel2020.png",
    color: "#2890ab",
  },
  {
    year: 2019,
    name: "Shasthra '19",
    imageUrl: "excel2019.png",
    color: "#da4b1d",
  },
  {
    year: 2018,
    name: "Shasthra '18",
    imageUrl: "excel2018.png",
    color: "#1bae89",
  },
  {
    year: 2017,
    name: "Shasthra '17",
    imageUrl: "excel2017.png",
    color: "#913f46",
  },
];

const leftLogos = festLogos.slice(0, 4);
const rightLogos = festLogos.slice(4, 8);

export const PastFests = () => {
  const [activeFest, setActiveFest] = useState<{
    year: number;
    name: string;
    imageUrl: string;
    color: string;
  } | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setActiveFest(null);
      }, 1000);
    } else if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]);

  const setFestToNull = () => {
    setIsOpen(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <section
      id="past-fests"
      className="relative py-24 md:py-32 z-0 h-auto min-h-svh    translate-y-[-20vh] bg-background overflow-hidden backdrop-blur-[100px]"
    >
      <AnimatePresence initial={false}>
        {activeFest && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: "blur(0px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(100px)" }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(40px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={activeFest.imageUrl}
              alt="Blurred background"
              className="w-full h-full object-cover filter  saturate-80 scale-110"
            />
            <div
              className="absolute inset-0 "
              style={{
                backgroundColor: activeFest.color,
                opacity: 0.15,
              }}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-11 container mx-auto px-4  grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-8 items-center">
        <div className="flex flex-row md:flex-col items-center justify-around md:justify-start gap-8 z-11">
          {leftLogos.map((fest) => (
            <div
              key={fest.year}
              onMouseEnter={() => {
                setActiveFest(fest);
                setIsOpen(true);
              }}
              onClick={() => {
                router.push(`/legacy/${fest.year}`);
              }}
              onMouseLeave={setFestToNull}
              className="cursor-pointer"
            >
              <img
                src={fest.imageUrl}
                alt={fest.name}
                style={{
                  borderColor: fest.color,
                }}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-0 hover:border-2 border-white/10  hover:scale-105 backdrop-blur-2xl transition-all duration-300"
              />
            </div>
          ))}
        </div>

        <div className="text-center h-48 flex flex-col justify-center items-center ">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFest ? activeFest.year : "default"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {activeFest ? (
                <>
                  <h3
                    className="text-5xl md:text-7xl font-bold "
                    style={{
                      color: activeFest.color,
                    }}
                  >
                    {activeFest.year}
                  </h3>
                  <p className="text-xl md:text-2xl mt-2 ">{activeFest.name}</p>
                  <a
                    href={`/legacy/${activeFest.year}`}
                    style={{
                      color: activeFest.color,
                      opacity: 0.5,
                    }}
                    className="text-xl hover:opacity-100 md:text-2xl mt-2 underline decoration-2  decoration-white/50 hover:decoration-white transition-all "
                  >
                    visit
                  </a>
                </>
              ) : (
                <div className="justify-center items-center flex flex-col  ">
                  <motion.h2
                    initial={{ opacity: 0, y: 80, scaleY: 0.5 }}
                    whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    // viewport={{ once: true }}
                    className="text-6xl font-bold py-8 tracking-tighter"
                  >
                    The Legacy of Innovation
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2.8, delay: 1.2, ease: "easeOut" }}
                    className="text-xl text-center text-evening-sea-100 opacity-0"
                  >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Tempore laborum neque dolores reprehenderit, reiciendis
                    saepe error minus, ad impedit odio eligendi, deleniti earum
                    ducimus minima. Ut sint nulla quaerat error. Lorem ipsum
                    dolor sit amet consectetur, adipisicing elit. Tempore
                    laborum neque dolores reprehenderit, reiciendis saepe error
                    ad impedit odio eligendi, deleniti earum ducimus minima. Ut
                    sint nulla quaerat error.
                  </motion.p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-row md:flex-col items-center justify-around md:justify-start gap-8">
          {rightLogos.map((fest) => (
            <div
              key={fest.year}
              onClick={() => {
                router.push(`/legacy/${fest.year}`);
              }}
              onMouseEnter={() => {
                setActiveFest(fest);
                setIsOpen(true);
              }}
              onMouseLeave={setFestToNull}
              className="cursor-pointer"
            >
              <img
                src={fest.imageUrl}
                alt={fest.name}
                style={{
                  borderColor: fest.color,
                }}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-0 border-white/10 hover:border-2 backdrop-blur-2xl hover:scale-105 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
