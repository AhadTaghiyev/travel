import { Link } from "react-router-dom";
import LogoImg from "@/assets/logo.png";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { cn } from "@/lib/utils";


const Navbar = () => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const navigations = [
    {
      label: t("Home"),
      to: "/#landing-hero-section",
    },
    {
      label: t("About"),
      to: "/#landing-about-section",
    },
    {
      label:  t("Contact Us"),
      to: "/#landing-contact-section",
    },
    {
      label:  t("Blog"),
      to: "#",
    },
    {
      label: t("Pricing"),
      to: "/#landing-pricing-section",
    },
    {
      label: t("Faq"),
      to: "/#landing-faq-section",
    },
  ];
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };
  return (
    <div
      className="sticky top-0 F8F9FB] z-50"
      style={{
        backdropFilter: "blur(15px)",
      }}
    >
      
      <div className=" landing-container pt-[14px] pb-2.5 flex justify-between items-center border-b border-solid border-[rgba(28,41,64,0.06)]">
        <Link to="/" className="text-2xl font-bold">
          <img src={LogoImg} alt="Travacco Logo" />
        </Link>
        <div className="gap-x-5 md:flex hidden">
          {navigations.map((nav, index) => (
            <HashLink
              key={index}
              to={nav.to}
              className="text-[#1A202C] font-medium text-sm hover:text-blue-400 transition"
            >
              {nav.label}
            </HashLink>
          ))}
              <HashLink
                  className={cn(
                    "px-1",
                    language === "en" && "bg-black/30 text-white"
                  )}
                  onClick={() => changeLanguage("en")}
                >
                  EN
                </HashLink>
                <HashLink
                  className={cn(
                    "px-1",
                    language === "az" && "bg-black/30 text-white"
                  )}
                  onClick={() => changeLanguage("az")}
                >
                  AZ
                </HashLink>
                <HashLink
                  className={cn(
                    "px-1",
                    language === "ru" && "bg-black/30 text-white"
                  )}
                  onClick={() => changeLanguage("ru")}
                >
                  RU
                </HashLink>
       
        </div>
        <div className="flex items-center gap-x-3">
          <Link
            to="/auth/login"
            className="px-6 py-3 bg-gray-950  rounded text-xs text-[#f8f9fb] hover:bg-gray-500 transition"
          >
          {t("Sign in")}
          </Link>
        </div>
      </div>


    </div>
  );
};

export default Navbar;
