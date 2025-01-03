import { Link } from "react-router-dom";
import HeroImg from "@/assets/hero.png";
import { useTranslation } from "react-i18next";
// const { t } = useTranslation();
const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <div
      id="landing-hero-section"
      className="py-10 md:py-[80px] landing-container flex flex-col md:flex-row justify-between items-center"
    >
      <div className="text-[#24272B] md:w-[609px]">
        <h1 className="text-2xl md:text-5xl md:leading-[60px] font-extrabold">
          {t("Best Accounting Software for Travel Agency")}
        </h1>
        <p className="my-6 text-xs leading-5">
          {t("Introducing simple and easy to use accounting software specially designed for travel agencies")}
        </p>
        <Link
          to="/auth/register"
          className="px-6 py-3 bg-gray-950   rounded text-xs text-[#f8f9fb] hover:bg-gray-500 transition"
        >
          {t("Register")}
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
