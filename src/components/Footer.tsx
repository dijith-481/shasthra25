import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
export const Footer = () => {
  return (
    <section
      id="footer"
      className="relative w-full    overflow-visible h-full     flex flex-col justify-center items-center overflow-x-clip"
    >
      <div className="absolute top-0 left-0  z-1 w-[200vw] translate-x-[-25%]  h-full   blur-2xl  md:blur-3xl bg-evening-sea-950  "></div>
      <div className="relative flex items-center flex-col z-4 justify-center  gap-y-4 mb-8  ">
        <div className=" relative flex items-center  h-full mt-20 justify-center gap-0   ">
          <div className="absolute inset-8 -z-2  bg-evening-sea-930"></div>
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
              className="md:w-24 md:h-24 w-12 h-12 flex items-center justify-center  hover:bg-evening-sea-920 hover:scale-105 rounded-full bg-evening-sea-930  transition-all duration-300"
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
        <p className=" text-sm text-gray-500">
          © {new Date().getFullYear()} SHASTHRA'25. All Rights Reserved.
        </p>
      </div>
    </section>
  );
};
