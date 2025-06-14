import { Suspense } from "react";
import { motion } from "framer-motion";
import { TechParticles } from "./TechParticles";

export const About = () => {
  return (
    <section
      id="about"
      className="relative w-full py-64  z-4  min-h-[80svh] h-auto  flex justify-center items-center   translate-y-[-80px]   "
    >
      <div className="absolute top-0 left-0 w-[200%] translate-x-[-25%] h-full blur-[80px] bg-evening-sea-950"></div>

      <div className="absolute container      rounded-md h-full w-3/4 justify-center items-center flex flex-col  ">
        <motion.h2
          initial={{ opacity: 0, y: 80, scaleY: 0.5 }}
          whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          // viewport={{ once: true }}
          className="text-6xl font-bold py-8 tracking-tighter"
        >
          About
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 80, scaleY: 0.5 }}
          whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl text-center text-evening-sea-100"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          laborum neque dolores reprehenderit, reiciendis saepe error minus, ad
          impedit odio eligendi, deleniti earum ducimus minima. Ut sint nulla
          quaerat error. Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Tempore laborum neque dolores reprehenderit, reiciendis saepe
          error minus, ad impedit odio eligendi, deleniti earum ducimus minima.
          Ut sint nulla quaerat error. elit. Tempore laborum neque dolores
          reprehenderit, reiciendis saepe error minus, ad impedit odio eligendi,
          deleniti earum ducimus minima. Ut sint nulla quaerat error.
        </motion.p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <Suspense fallback={null}>
          <TechParticles />
        </Suspense>
      </div>
    </section>
  );
};
