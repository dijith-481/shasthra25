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

  useEffect(() => {
    if (!isOpen) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setActiveFest(null);
      }, 4000);
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
      className="relative  h-3/4 md:min-h-dvh flex flex-col justify-center items-center w-full"
    >
      <AnimatePresence initial={false} mode="sync">
        {activeFest && (
          <motion.div
            key={activeFest.year}
            initial={{ opacity: 0, scale: 1.0, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(40px)" }}
            exit={{ opacity: 0, scale: 1.0, filter: "blur(20px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0 md:h-[100dvh] w-full "
          >
            <img
              src={activeFest.imageUrl}
              alt="Blurred background"
              className="w-full h-full  object-cover   saturate-80 "
            />
            <div
              className="absolute inset-0 saturate-50"
              style={{
                backgroundColor: activeFest.color,
                mixBlendMode: "difference",
                opacity: 0.15,
              }}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-5  mx-auto px-4 py-20  grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-8 items-center w-full">
        <div className="flex flex-row md:flex-col items-center justify-around md:justify-start gap-4 z-6">
          {leftLogos.map((fest) => (
            <div
              key={fest.year}
              onMouseEnter={() => {
                setActiveFest(fest);
                setIsOpen(true);
              }}
              // onClick={() => {
              //   router.push(`/legacy/${fest.year}`);
              // }}
              onMouseLeave={setFestToNull}
              className="cursor-pointer"
            >
              <img
                src={fest.imageUrl}
                alt={fest.name}
                style={{
                  borderColor: fest.color,
                }}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-0 hover:border-2 border-r-evening-sea-100/10  hover:scale-105 backdrop-blur-2xl transition-all duration-300"
              />
            </div>
          ))}
        </div>

        <div className="text-center h-48 flex flex-col justify-center items-center w-full ">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFest ? activeFest.year : "default"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {activeFest ? (
                <div className="justify-center items-center flex flex-col w-full  ">
                  <h3
                    className="text-4xl md:text-6xl font-bold "
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
                      opacity: 0.5,
                    }}
                    className="text-xs md:text-sm shadow text-evening-sea-50 hover:bg-evening-sea-50 hover:text-evening-sea-950 z-10 mix-blend-difference hover:opacity-100  mt-2 rounded-full backdrop-blur-2xl px-6 py-1 border border-evening-sea-50  decoration-2  decoration-white/50 hover:decoration-white transition-all "
                  >
                    visit
                  </a>
                </div>
              ) : (
                <div className="justify-center items-center flex flex-col  w-full">
                  <h2 className=" text-4xl md:text-6xl font-bold md:py-8 py-4 tracking-tighter">
                    The Legacy of Innovation
                  </h2>

                  <p className=" text-xs md:text-xl  text-center text-evening-sea-100 ">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Tempore laborum neque dolores reprehenderit, reiciendis
                    saepe error minus, ad impedit odio eligendi, deleniti earum
                    ducimus minima. Ut sint nulla quaerat error. Lorem ipsum
                    laborum neque dolores reprehenderit, reiciendis saepe error
                    sint nulla quaerat error.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-row md:flex-col items-center justify-around md:justify-start gap-8">
          {rightLogos.map((fest) => (
            <div
              key={fest.year}
              // onClick={() => {
              //   router.push(`/legacy/${fest.year}`);
              // }}
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
