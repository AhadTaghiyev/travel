import { Link } from "react-router-dom";
import HeroImg from "@/assets/hero.png";

const HeroSection = () => {
  return (
    <div
      id="landing-hero-section"
      className="py-10 md:py-[80px] landing-container flex flex-col md:flex-row justify-between items-center"
    >
      <div className="text-[#24272B] md:w-[609px]">
        <h1 className="text-2xl md:text-5xl md:leading-[60px] font-extrabold">
          Best Accounting Software for Travel Agency
        </h1>
        <p className="my-6 text-xs leading-5">
          Introducing simple and easy to use accounting software specially
          designed for travel agencies
        </p>
        <Link
          to="/auth/login"
          className="px-6 py-3 bg-gray-950   rounded text-xs text-[#f8f9fb] hover:bg-gray-500 transition"
        >
          Try free
        </Link>
      </div>
      <img
        src={HeroImg}
        alt="Hero"
        className="w-[362px] h-[306px] object-contain"
      />
    </div>
  );
};

export default HeroSection;
