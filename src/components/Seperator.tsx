export const Seperator = () => {
  return (
    <section
      id="seperator"
      className="relative w-full    overflow-visible h-max  flex-col   flex justify-center items-center 
overflow-x-clip
      "
    >
      <div className="absolute top-0 left-0  z-1 w-full   h-full   blur-2xl  md:blur-3xl bg-evening-sea-950  "></div>

      <div className=" rounded-md    w-full px-4  md:py-18 py-12 justify-center z-2   items-center flex flex-col  "></div>
    </section>
  );
};
