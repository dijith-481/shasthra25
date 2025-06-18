"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, PanInfo, useAnimationControls } from "framer-motion";
import ItemCard, { ItemType } from "@/components/ItemCard";
import DropDown from "@/components/Ui/Dropdown";
import { ContactCard } from "@/components/ContactCard";
import { CalendarIcon, FeeIcon, VenueIcon } from "@/components/Ui/Icons";
import { mixColors, getContrastColor } from "@/utils/colorUtils";
import { ItemDetailsType } from "@/utils/types";
import { useColorContext } from "@/context/color";
import { useWindowSize } from "@/hooks/useWindowSize";

const pages = ["about", "rules", "format", "contact"];

interface ItemPageProps {
  name: string;
  loading: boolean;
  itemDetails: ItemDetailsType | null;
  itemBase: ItemType | null;
  error: string | null;
}

export default function ItemPage({
  name,
  loading,
  itemDetails,
  itemBase,
  error,
}: ItemPageProps) {
  const { color } = useColorContext();
  const [page, setPage] = useState(0);
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(0);

  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const navDropdownRef = useRef<HTMLButtonElement>(null);
  const toggleNavDropdown = () => setIsNavDropdownOpen((prev) => !prev);
  const { width } = useWindowSize();

  useEffect(() => {
    if (containerRef.current) {
      setPageWidth(containerRef.current.offsetWidth + 64);

      const newX = -page * pageWidth;
      controls.start({
        x: newX,
        transition: { type: "spring", stiffness: 400, damping: 40 },
      });
    }
  }, [page, controls, pageWidth, width]);

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const { offset, velocity } = info;

    const swipeConfidenceThreshold = pageWidth * 0.1;

    let newPage = page;

    if (offset.x < -swipeConfidenceThreshold || velocity.x < -500) {
      newPage = Math.min(page + 1, pages.length - 1);
    } else if (offset.x > swipeConfidenceThreshold || velocity.x > 500) {
      newPage = Math.max(page - 1, 0);
    }

    const newX = -newPage * pageWidth;

    controls.start({
      x: newX,
      transition: {
        type: "spring",
        velocity: info.velocity.x,
        stiffness: 400,
        damping: 40,
        restDelta: 0.01,
      },
    });

    setPage(newPage);
  };

  const renderContentForPage = (pageName: string) => {
    if (!itemDetails) return null;

    switch (pageName) {
      case "rules":
        return itemDetails.rules
          .split("\n")
          .map((line, index) => <p key={index}>{line}</p>);
      case "format":
        return <p>{itemDetails.format}</p>;
      case "contact":
        return <ContactCard contacts={itemDetails.contact} color={color} />;
      case "about":
      default:
        return <p>{itemDetails.about}</p>;
    }
  };

  if (loading) {
    return (
      <main className="bg-gradient-to-b from-evening-sea-950 to-evening-sea-930 min-h-dvh flex items-center justify-center">
        <div className="text-center text-evening-sea-300">
          Loading {name.toLowerCase()}...
        </div>
      </main>
    );
  }
  if (error || !itemBase) {
    return (
      <main className="bg-gradient-to-b from-evening-sea-950 to-evening-sea-930 min-h-dvh flex items-center justify-center">
        <div className="text-center text-red-400">
          <h2>Error</h2>
          <p>{error || "Could not load the" + name.toLowerCase() + "."}</p>
          <Link
            href={`/${name.toLowerCase()}`}
            className="mt-4 inline-block px-4 py-2 bg-evening-sea-700 rounded-lg"
          >
            Back to {name}
          </Link>
        </div>
      </main>
    );
  }

  const textColor = getContrastColor(color);
  const activeTab = pages[page];

  return (
    <main className="bg-gradient-to-b md:pt-18 h-dvh   pt-10 from-evening-sea-950 to-evening-sea-930">
      <section className="relative       h-full flex flex-col  items-center w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed top-0 left-0 h-screen w-screen pointer-events-none"
        >
          <img
            src={itemBase.image}
            alt="Blurred background"
            className="w-screen h-screen object-cover z-0 blur-md opacity-70 "
          />
        </motion.div>

        <div
          className="relative h-full   max-w-11/12 md:max-w-4xl z-2 overflow-hidden   px-4 w-full flex flex-wrap gap-4  mt-8 mb-4 justify-center items-center  rounded-3xl bg-white/50"
          style={{
            backgroundColor: mixColors(color, "#ffffff", 0.4, 0.7),
          }}
        >
          <div className="absolute top-0 backdrop-blur-lg rounded-b-2xl   w-7/8 flex  items-center justify-center  py-2 z-50">
            <div
              className="w-12 rounded-full  h-1 "
              style={{
                backgroundColor: mixColors(color, "#ffffff", 0.8, 0.7),
              }}
            ></div>
          </div>

          <div className=" h-full   max-w-full md:max-w-4xl z-2 overflow-auto py-5   w-full flex flex-wrap gap-4   justify-center items-center  rounded-3xl ">
            <div className="flex w-full  flex-col md:flex-row items-center justify-center    md:pb-4 rounded-2xl  border-b border-white/20 flex-shrink-0">
              <div className="pointer-events-none select-none md:self-start transform translate-x-[-32px] md:translate-x-[-24px] scale-50 w-34 h-43 md:w-51 md:h-65 md:scale-75 origin-top">
                <ItemCard
                  name={name}
                  item={itemBase}
                  setActive={() => {}}
                  buttonText="SHASTHRA'25"
                />
              </div>
              <div className="flex flex-col z-0 items-center md:items-start w-full md:px-4">
                <h1
                  className="  z-30  text-4xl md:text-6xl font-bold mix-blend-difference tracking-tighter text-center md:text-left"
                  style={{
                    color: mixColors(color, "#000000", 0.8, 0.7),
                  }}
                >
                  {itemBase.name}
                </h1>
                <div className="flex flex-wrap z-10 w-full gap-2 mb-4 mt-2 justify-center md:justify-start">
                  <div
                    className="flex items-center rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: mixColors(color, "#ffffff", 0.2, 0.9),
                      color: textColor,
                    }}
                  >
                    <CalendarIcon />{" "}
                    {new Date(itemBase.time).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    at{" "}
                    {new Date(itemBase.time).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div
                    className="flex items-center rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: mixColors(color, "#ffffff", 0.2, 0.8),
                      color: textColor,
                    }}
                  >
                    <FeeIcon /> Fee: ₹{itemDetails?.fee}
                  </div>
                  <div
                    className="flex items-center rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: mixColors(color, "#ffffff", 0.1, 0.9),
                      color: textColor,
                    }}
                  >
                    <VenueIcon /> {itemDetails?.venue}
                  </div>
                  {itemBase.prize && (
                    <div
                      className="flex items-center text-white rounded-full px-3 py-1 font-semibold text-xs "
                      style={{
                        backgroundColor: mixColors(color, "#000000", 0.3, 0.8),
                        color: getContrastColor(
                          mixColors(color, "#000000", 0.3, 0.8),
                        ),
                      }}
                    >
                      <FeeIcon /> Prize: ₹{itemBase.prize}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              ref={containerRef}
              className="flex-grow w-full overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <motion.div
                className="flex h-full w-full space-x-16"
                drag="x"
                dragConstraints={{
                  right: 0,
                  left: -(pageWidth * (pages.length - 1)),
                }}
                onDragEnd={handleDragEnd}
                animate={controls}
              >
                {pages.map((pageName) => (
                  <div
                    key={pageName}
                    className="w-full flex-shrink-0 text-black text-sm text-justify"
                  >
                    <h2 className="text-center text-2xl font-bold text-black">
                      {pageName}
                    </h2>
                    {renderContentForPage(pageName)}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0  backdrop-blur-md    w-full flex  items-center justify-center  py-2 z-50">
            <div className="  w-full  flex justify-center items-center gap-1 mb-2 flex-shrink-0">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ease-in-out ${page === i ? "w-6" : "w-2"}`}
                  style={{
                    backgroundColor:
                      page === i
                        ? mixColors(color, "#000000", 0.1, 0.9)
                        : mixColors(color, "#ffffff", 0.7, 0.5),
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className=" z-10 mb-4  h-12 flex gap-2 flex-row justify-center items-center">
          <div
            className="hidden md:flex overflow-hidden h-full backdrop-blur-md text-black  rounded-full bg-white/70 items-center justify-center"
            style={{
              backgroundColor: mixColors(color, "#ffffff", 0.95, 0.6),
            }}
          >
            {pages.map((item, index) => (
              <button
                key={item}
                onClick={() => setPage(index)}
                className={`text-sm capitalize ease-in-out duration-500 px-6 py-1.5 h-full min-w-24 hover:text-black transition-all ${page === index ? "bg-evening-sea-400/70 rounded-none z-15" : " z-14 hover:opacity-100 opacity-75 "}`}
                style={{
                  backgroundColor: page === index ? color + "c0" : color + "80",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="relative h-full flex w-48 md:hidden">
            <button
              ref={navDropdownRef}
              onClick={toggleNavDropdown}
              className="w-full h-full rounded-4xl bg-white/70 backdrop-blur-md px-4 flex items-center justify-between text-black"
              style={{
                backgroundColor: mixColors(color, "#ffffff", 0.6, 0.7),
              }}
            >
              <span className="font-semibold capitalize">{activeTab}</span>
              <span className="text-xs">▼</span>
            </button>
            <DropDown
              options={{
                about: "About",
                rules: "Rules",
                format: "Format",
                contact: "Contact",
              }}
              color={color}
              selectedOption={activeTab}
              onSelect={(option: string) => {
                const newIndex = pages.findIndex((p) => p === option);
                if (newIndex !== -1) setPage(newIndex);
                toggleNavDropdown();
              }}
              triggerRef={navDropdownRef}
              onClose={toggleNavDropdown}
              isOpen={isNavDropdownOpen}
            />
          </div>

          {itemDetails?.isClosed ? (
            <button
              disabled
              className="h-12 text-sm rounded-4xl bg-red-400/80 text-white px-6 min-w-24 cursor-not-allowed"
            >
              Closed
            </button>
          ) : (
            <Link
              href={`/legacy/${itemBase?.name.replaceAll(" ", "-")}`}
              className="h-12 flex items-center justify-center backdrop-blur-sm text-sm rounded-4xl 80 text-white font-bold px-6 min-w-24 transition-colors"
              style={{ backgroundColor: color + "c0" }}
            >
              Register
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
