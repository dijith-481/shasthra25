export const Ambassador = () => {
  return (
    <section
      id="ambassador"
      className="relative w-full    overflow-visible h-3/4    md:min-h-dvh   flex-col  flex justify-center items-center 
overflow-x-clip
      "
    >
      <div className="absolute top-0 left-0  z-1 w-[200vw] translate-x-[-25%]  h-full   blur-2xl  md:blur-3xl bg-evening-sea-950  "></div>

      <div className=" rounded-md md:h-full h-3/4 md:w-3/4 w-full px-4  py-18 justify-center z-2   items-center flex flex-col  ">
        <h2 className="text-6xl font-bold py-8 tracking-tighter text-center">
          Elevate Shasthra
        </h2>

        <p className="md:text-xl text-sm  text-center text-evening-sea-100">
          Become the face of Shasthra'25 in your college and invite your friends
          to join us. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Tempore laborum neque dolores reprehenderit, reiciendis saepe error
          minus, ad deleniti earum ducimus minima. Ut sint nulla quaerat error.
        </p>
        <a
          href={`/legacy/Elevate`}
          style={{
            opacity: 0.5,
          }}
          className="text-xs md:text-sm shadow text-evening-sea-50 hover:bg-evening-sea-50 hover:text-evening-sea-950 z-10 mix-blend-difference hover:opacity-100  mt-2 rounded-full backdrop-blur-2xl px-6 md:px-10 py-1 border border-evening-sea-50  decoration-2  decoration-white/50 hover:decoration-white transition-all "
        >
          visit
        </a>
      </div>
    </section>
  );
};
