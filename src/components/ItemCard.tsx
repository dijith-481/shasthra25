import Link from "next/link";
import { useColorContext } from "@/context/color";

export interface ItemType {
  id: string;
  name: string;
  image: string;
  short_desc: string;
  color: string;
  tags?: string[];
  type: string;
  prize?: string;
  time: string;
}

interface ItemCardProps {
  item: ItemType;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
  buttonText?: string;
  name: string;
}

export default function ItemCard({
  item,
  setActive,
  buttonText = "Learn More",
  name,
}: ItemCardProps) {
  const localTime = new Date(item.time).toLocaleString();
  const { setColor } = useColorContext();

  return (
    <Link
      href={`/${name.toLowerCase()}/${item.id}`}
      onMouseEnter={() => {
        setActive(item.id);
        setColor(item.color);
      }}
      onMouseLeave={() => setActive(null)}
      className="relative group block outline-none w-68 p-2 h-86 rounded-3xl backdrop-blur-3xl bg-white/75 hover:bg-white/30 duration-500 transition-all   "
      tabIndex={0}
    >
      <div className="absolute top-4 right-4   leading-none font-black text-sm text-black">
        SHASTHRA&apos;25
      </div>
      <div className="relative w-full h-full overflow-hidden rounded-2xl   ">
        {item.prize && (
          <div className="absolute top-2 left-2 z-6 mix-blend-difference text-white">
            ₹{item.prize}
          </div>
        )}
        <div
          className="absolute bottom-0 left-0 z-1 w-128 blur-2xl translate-x-[-25%] h-5/6 translate-y-[30%] saturate-70 group-hover:saturate-100 transition-all duration-500 ease-linear "
          style={{
            backgroundColor: item.color,
          }}
        ></div>
        <div
          className="absolute top-0 left-0 w-64 h-56 "
          style={{
            clipPath: "url(#myClipPath)",
            WebkitClipPath: "url(#myClipPath)",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover saturate-40 group-hover:saturate-100 transition-all duration-500 ease-linear "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            className="absolute inset-0 saturate-70 group-hover:saturate-100 transition-all duration-500 ease-linear"
            style={{
              backgroundColor: item.color,
              mixBlendMode: "luminosity",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          ></div>
        </div>
        <div className="absolute bottom-0 left-0 z-3 h-64 w-96 translate-y-[50%] translate-x-[-15%] blur-2xl bg-evening-sea-950/37 group-hover:bg-evening-sea-950/80 transition-all duration-500 ease-linear "></div>

        <div className="absolute bottom-0 left-0 z-3 px-3 gap-0.5 flex items-start justify-center w-full flex-col">
          <h3 className="text-2xl font-bold text-white">{item.name}</h3>
          <p className="text-sm text-white/70 mix-blend-difference font-inter">
            {item.type}
          </p>
          <p className="text-xs text-white font-inter">{item.short_desc}</p>
          <p className="text-xs text-white font-inter h-0 opacity-0 group-hover:h-4 group-hover:opacity-100 transition-all ease-in-out duration-500 ">
            {localTime}{" "}
          </p>
          <div className="flex flex-row gap-x-0.5 pb-2 items-start">
            {item.tags?.map((tag, index) => (
              <div
                key={index}
                className="relative flex h-4 min-w-8 items-center justify-center rounded-full bg-evening-sea-50/20 px-1 py-0.5 text-[0.6rem] text-white backdrop-blur-sm"
              >
                <span>{tag}</span>
              </div>
            ))}
          </div>

          <button
            className={`w-full mb-3 rounded-3xl backdrop-blur-sm bg-white/50 h-10 text-black z-6 ${buttonText ? "" : "hidden"}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Link>
  );
}
