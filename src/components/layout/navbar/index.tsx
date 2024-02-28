import { Link } from "react-router-dom";
import LogoImg from "@/assets/logo.png";
import { HashLink } from "react-router-hash-link";

const navigations = [
  {
    label: "Home",
    to: "/#landing-hero-section",
  },
  {
    label: "About",
    to: "/#landing-about-section",
  },
  {
    label: "Contact us",
    to: "/#landing-contact-section",
  },
  {
    label: "Blog",
    to: "#",
  },
  {
    label: "Pricing",
    to: "/#landing-pricing-section",
  },
  {
    label: "FAQ",
    to: "/#landing-faq-section",
  },
];

const Navbar = () => {
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
        </div>
        <div className="flex items-center gap-x-3">
          <Link
            to="/auth/login"
            className="px-6 py-3 bg-gray-950  rounded text-xs text-[#f8f9fb] hover:bg-gray-500 transition"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
