import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const images = [
  "gallery1.jpg",
  "gallery2.jpg",
  "gallery3.jpg",
  "gallery4.jpg",
  "gallery5.png",
];
const INTERVAL = 1000;

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    intervalIdRef.current = setInterval(() => {
      nextImg(true);
    }, 4 * INTERVAL);
  };

  const nextImg = (isAutoplay = false) => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    if (!isAutoplay) {
      startAutoplay();
    }
  };

  const prevImg = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    startAutoplay();
  };

  useEffect(() => {
    startAutoplay();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return (
    <section
      id="gallery"
      className="relative  h-3/4 md:min-h-dvh flex flex-col justify-center items-center w-full"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={images[currentIndex]}
          initial={{ filter: "blur(80px)", opacity: 0 }}
          animate={{ filter: "blur(20px)", opacity: 1 }}
          exit={{ filter: "blur(80px)", opacity: 0 }}
          transition={{ duration: 1, ease: "linear" }}
          className="absolute inset-0 z-0 md:h-[100dvh] w-full "
        >
          <img
            src={images[currentIndex]}
            alt="Blurred background"
            className="w-full h-full  object-cover  opacity-50  "
          />
        </motion.div>
      </AnimatePresence>

      <div className="  w-full  px-4 py-20   h-full flex flex-col justify-center items-center ">
        <div className="relative aspect-video md:w-[60%]  w-[90%]  flex flex-row gap-2 items-center justify-center">
          {images.map((image, index) => {
            const isCenter = index === currentIndex;
            const isRight = index === (currentIndex + 1) % images.length;
            const isLeft =
              index === (currentIndex + images.length - 1) % images.length;
            const isFarRight = index == (currentIndex + 2) % images.length;
            const isFarLeft =
              index == (currentIndex + images.length - 2) % images.length;

            let newLeft = "";
            let newWidth = "0";

            if (isLeft) {
              newLeft = "0";
              newWidth = "11.5%";
            } else if (isRight) {
              newLeft = "88.5%";
              newWidth = "11.5%";
            } else if (isCenter) {
              newLeft = "13.5%";
              newWidth = "73%";
            } else if (isFarRight) {
              newLeft = "100%";
              newWidth = "0";
            } else if (isFarLeft) {
              newLeft = "0";
              newWidth = "0";
            }
            return (
              <motion.div
                key={index}
                onClick={isLeft ? () => prevImg() : () => nextImg()}
                className={`h-full    absolute top-0 left-0  overflow-hidden rounded-md flex flex-col justify-center items-center `}
                animate={{
                  left: newLeft,
                  width: newWidth,
                }}
                transition={{
                  duration: 1,
                  ease: "linear",
                }}
              >
                <div className=" h-full aspect-video">
                  <img
                    src={image}
                    className="object-cover h-full w-full"
                    alt=""
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
