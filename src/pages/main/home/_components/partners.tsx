import Partner1 from "@/assets/partners/1.png";
import Partner2 from "@/assets/partners/2.png";
import Partner3 from "@/assets/partners/3.png";
import Partner4 from "@/assets/partners/4.png";
import Partner5 from "@/assets/partners/5.png";
import Partner6 from "@/assets/partners/6.png";
import { useMemo, useState } from "react";

const partners = [
  {
    logo: Partner1,
    url: "#",
  },
  {
    logo: Partner2,
    url: "#",
  },
  {
    logo: Partner3,
    url: "#",
  },
  {
    logo: Partner4,
    url: "#",
  },
  {
    logo: Partner5,
    url: "#",
  },
  {
    logo: Partner6,
    url: "#",
  },
  {
    logo: Partner1,
    url: "#",
  },
  {
    logo: Partner2,
    url: "#",
  },
  {
    logo: Partner3,
    url: "#",
  },
  {
    logo: Partner4,
    url: "#",
  },
  {
    logo: Partner5,
    url: "#",
  },
  {
    logo: Partner6,
    url: "#",
  },
  {
    logo: Partner1,
    url: "#",
  },
  {
    logo: Partner2,
    url: "#",
  },
  {
    logo: Partner3,
    url: "#",
  },
  {
    logo: Partner4,
    url: "#",
  },
  {
    logo: Partner5,
    url: "#",
  },
  {
    logo: Partner6,
    url: "#",
  },
];

const PartnersSection = () => {
  const [showAll, setShowAll] = useState(false);

  const visiblePartners = useMemo(
    () => partners.slice(0, showAll ? partners.length : 6),
    [showAll]
  );

  return (
    <div className="relative landing-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-y border-solid border-[#EBEDF0] py-[40px] gap-y-4 md:gap-y-8 lg:gap-y-16">
      {visiblePartners.map((partner, index) => (
        <a
          key={index}
          href={partner.url}
          className="flex justify-center items-center p-4"
        >
          <img src={partner.logo} alt="Partner" />
        </a>
      ))}
      <button
        onClick={() => setShowAll((prev) => !prev)}
        className="absolute bottom-0 -translate-x-[50%] translate-y-[50%] left-[50%] p-2 bg-white text-xs text-[#59c1ff] border-none hover:bg-[#59c1ff] hover:text-white transition-all duration-300 ease-in-out"
        style={{
          boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
        }}
      >
        {showAll ? "Hide" : "View all"}
      </button>
    </div>
  );
};

export default PartnersSection;
