import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { useColorContext } from "@/context/color";
import { mixColors } from "@/utils/colorUtils";
export const Footer = () => {
  const { color } = useColorContext();
  return (
    <section
      id="footer"
      className="relative w-full    overflow-visible h-full     flex flex-col justify-center items-center overflow-x-clip"
    >
      <div className="absolute top-0 left-0  z-1 w-[200vw] translate-x-[-25%]  h-full   blur-2xl  md:blur-3xl bg-black  "></div>
      <div className="relative flex items-center flex-col z-4 justify-center  gap-y-4 mb-8  ">
        <div className=" relative flex items-center  h-full mt-20 justify-center gap-0   ">
          <div
            className="absolute inset-8 -z-2  "
            style={{
              backgroundColor: mixColors(color, "#FFFFFF", 0.5, 1),
            }}
          ></div>
          {[
            { href: "legacy/facebook", icon: FaFacebookF, label: "Facebook" },
            { href: "legacy/twitter", icon: FaTwitter, label: "Twitter" },
            { href: "legacy/instagram", icon: FaInstagram, label: "Instagram" },
            { href: "legacy/linkedin", icon: FaLinkedinIn, label: "LinkedIn" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="md:w-24 md:h-24 w-12 h-12 flex items-center justify-center mx-[-0.1rem]   hover:scale-105 rounded-full   transition-all duration-300"
              style={{
                backgroundColor: mixColors(color, "#FFFFFF", 0.5, 1),
              }}
            >
              <social.icon
                size={20}
                style={{
                  color: "#000",
                }}
              />
            </a>
          ))}
        </div>
        <p
          className=" text-sm "
          style={{
            color: mixColors(color, "#FFFFFF", 0.6, 0.7),
          }}
        >
          © {new Date().getFullYear()} SHASTHRA&apos;25. All Rights Reserved.
        </p>
      </div>
    </section>
  );
};
