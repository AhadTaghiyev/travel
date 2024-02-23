import { Link } from "react-router-dom";
import LogoImg from "@/assets/logo.png";

const navigations = [
  {
    label: "Home",
    to: "#",
  },
  {
    label: "About",
    to: "#",
  },
  {
    label: "Contact us",
    to: "#",
  },
  {
    label: "Blog",
    to: "#",
  },
  {
    label: "Pricing",
    to: "#",
  },
  {
    label: "Products",
    to: "#",
  },
];

const Navbar = () => {
  return (
    <div className="landing-container pt-[14px] pb-2.5 flex justify-between items-center border-b border-solid border-[rgba(28,41,64,0.06)]">
      <Link to="/" className="text-2xl font-bold">
        <img src={LogoImg} alt="Travacco Logo" />
      </Link>
      <div className="gap-x-5 md:flex hidden">
        {navigations.map((nav, index) => (
          <Link
            key={index}
            to={nav.to}
            className="text-[#1A202C] font-medium text-sm hover:text-blue-400 transition"
          >
            {nav.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-x-3">
        <Link
          to="/auth"
          className="px-6 py-3 bg-[#59C1FF] rounded text-xs text-[#f8f9fb] hover:bg-[#4bb7f6] transition"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
