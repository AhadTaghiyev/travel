import { Link, useNavigate } from "react-router-dom";
import LogoImg from "@/assets/logo.png";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";
import { RxHamburgerMenu } from "react-icons/rx";
import i18n from "i18next";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    i18n: { language },
    t,
  } = useTranslation();
  const navigate = useNavigate();
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
      label: t("Contact Us"),
      to: "/#landing-contact-section",
    },
    {
      label: t("Blog"),
      to: "/blogs",
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
      className="sticky top-0 z-50"
      style={{
        backdropFilter: "blur(15px)",
      }}
    >
      <div className="landing-container pt-[14px] pb-2.5 flex justify-between items-center border-b border-solid border-[rgba(28,41,64,0.06)]">
        <Link to="/" className="text-2xl font-bold">
          <img src={LogoImg} alt="Travacco Logo" />
        </Link>
        <div className="gap-x-5 lg:flex hidden">
          {navigations.map((nav, index) => (
            <HashLink
              key={index}
              to={nav.to}
              className="text-[#1A202C] font-medium text-sm hover:text-blue-400 transition"
            >
              {nav.label}
            </HashLink>
          ))}
        </div>
        <div className="flex items-center gap-x-3">
          <HashLink
            className={cn(
              "px-1 hidden lg:block",
              language === "en" && "bg-black/30 text-white"
            )}
            onClick={() => {
              navigate("/en");
              changeLanguage("en");
            }}
          >
            EN
          </HashLink>
          <HashLink
            className={cn(
              "px-1 hidden lg:block",
              language === "az" && "bg-black/30 text-white"
            )}
            onClick={() => {
              navigate("/");
              changeLanguage("az");
            }}
          >
            AZ
          </HashLink>
          <HashLink
            className={cn(
              "px-1 hidden lg:block",
              language === "ru" && "bg-black/30 text-white"
            )}
            onClick={() => {
              navigate("/ru");
              changeLanguage("ru");
            }}
          >
            RU
          </HashLink>
          <Link
            to="/auth/login"
            className="px-6 py-3 bg-gray-950  rounded text-xs text-[#f8f9fb] hover:bg-gray-500 transition"
          >
            {t("Sign in")}
          </Link>

          <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <PopoverTrigger asChild className=" lg:hidden">
              <Button variant={"outline"}>
                <RxHamburgerMenu size={28} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[164px] mr-4 px-2 py-4 lg:hidden">
              <div className="flex flex-col gap-y-3">
                {navigations.map((nav, index) => (
                  <HashLink
                    key={index}
                    to={nav.to}
                    className="text-[#1A202C] font-bold py-1 text-center text-sm hover:text-blue-400 transition"
                  >
                    {nav.label}
                  </HashLink>
                ))}
                <div className="flex items-center justify-center gap-x-1 mt-1">
                  <HashLink
                    className={cn(
                      "px-1",
                      language === "en" && "bg-black/30 text-white"
                    )}
                    onClick={() => {
                      navigate("/en");
                      changeLanguage("en");
                    }}
                  >
                    EN
                  </HashLink>
                  <HashLink
                    className={cn(
                      "px-1",
                      language === "az" && "bg-black/30 text-white"
                    )}
                    onClick={() => {
                      navigate("/");
                      changeLanguage("az");
                    }}
                  >
                    AZ
                  </HashLink>
                  <HashLink
                    className={cn(
                      "px-1",
                      language === "ru" && "bg-black/30 text-white"
                    )}
                    onClick={() => {
                      navigate("/ru");
                      changeLanguage("ru");
                    }}
                  >
                    RU
                  </HashLink>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
