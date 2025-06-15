export const About = () => {
  return (
    <section
      id="about"
      className="relative w-full    overflow-visible h-3/4    md:min-h-dvh   flex-col  flex justify-center items-center 
overflow-x-clip
      "
    >
      <div className="absolute top-0 left-0  z-1 w-[200vw] translate-x-[-25%]  h-full   blur-2xl  md:blur-3xl bg-evening-sea-950  "></div>

      <div className=" rounded-md md:h-full h-3/4 md:w-3/4 w-full px-4  py-18 justify-center z-2   items-center flex flex-col  ">
        <h2 className="text-6xl font-bold py-8 tracking-tighter">About</h2>

        <p className="md:text-xl text-sm pb-8 text-center text-evening-sea-100">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          laborum neque dolores reprehenderit, reiciendis saepe error minus, ad
          impedit odio eligendi, deleniti earum ducimus minima. Ut sint nulla
          quaerat error. Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Tempore laborum neque dolores reprehenderit, reiciendis saepe
          error minus, ad impedit odio eligendi, deleniti earum ducimus minima.
          Ut sint nulla quaerat error. elit. Tempore laborum neque dolores
          reprehenderit, reiciendis saepe error minus, ad impedit odio eligendi,
          deleniti earum ducimus minima. Ut sint nulla quaerat error.
        </p>
      </div>
    </section>
  );
};
