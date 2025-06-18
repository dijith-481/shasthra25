import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useColorContext } from "@/context/color";
import Image from "next/image";

const images = [
  { url: "/gallery1.jpg", color: "#87B0C0" },
  { url: "/gallery2.jpg", color: "#261D55" },
  { url: "/gallery3.jpg", color: "#95999D" },
  { url: "/gallery4.jpg", color: "#B3C7C9" },
  { url: "/gallery5.png", color: "#B28880" },
];
const INTERVAL = 1000;
const ANIMATION_DURATION = 1;

export function ImageCarousel() {
  const { setColor } = useColorContext();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const advanceImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const startAutoplay = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    intervalIdRef.current = setInterval(() => {
      advanceImage();
    }, 4 * INTERVAL);
  }, [advanceImage]);

  const nextImg = useCallback(() => {
    if (isAnimating) return;
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setColor(images[nextIndex].color);
    startAutoplay();
  }, [currentIndex, setColor, startAutoplay, isAnimating]);

  const prevImg = useCallback(() => {
    if (isAnimating) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setColor(images[prevIndex].color);
    startAutoplay();
  }, [currentIndex, setColor, startAutoplay, isAnimating]);

  useEffect(() => {
    setIsAnimating(true);
  }, [currentIndex]);

  useEffect(() => {
    startAutoplay();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [startAutoplay]);

  return (
    <section
      id="gallery"
      className="relative  h-3/4 md:min-h-dvh flex flex-col justify-center items-center w-full"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={images[currentIndex].url}
          initial={{ filter: "blur(80px)", opacity: 0 }}
          animate={{ filter: "blur(20px)", opacity: 1 }}
          exit={{ filter: "blur(80px)", opacity: 0 }}
          transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
          className="absolute inset-0 z-0 md:h-[100dvh] w-full "
        >
          <Image
            src={images[currentIndex].url}
            width={1920}
            height={1080}
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
                onClick={isLeft ? prevImg : nextImg}
                className={`h-full    absolute top-0 left-0  overflow-hidden rounded-md flex flex-col justify-center items-center `}
                animate={{
                  left: newLeft,
                  width: newWidth,
                }}
                onAnimationComplete={() => setIsAnimating(false)}
                transition={{
                  duration: ANIMATION_DURATION,
                  ease: "linear",
                }}
              >
                <div className=" h-full aspect-video">
                  <Image
                    src={image.url}
                    width={1920}
                    height={1080}
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
