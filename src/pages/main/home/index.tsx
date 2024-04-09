import Navbar from "@/components/layout/navbar";
import HeroSection from "./_components/hero";
import PartnersSection from "./_components/partners";
import SpecialFeaturesSection from "./_components/special-features";
import AccountingSoftwareSection from "./_components/accounting-software";
import AboutSection from "./_components/about";
import OtherServicesSection from "./_components/other-services";
import PricingSection from "./_components/pricing";
import GetInTouchSection from "./_components/get-in-touch";
import FaqSection from "./_components/faq";
import FooterSection from "./_components/footer";
import { useContext, useEffect } from "react";
import { UserContext } from "@/store/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user?.role !== "Admin") {
      navigate("/panel");
    }
  }, [user]);

  return (
    <div className="w-full bg-[#F8F9FB] h-full">
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <SpecialFeaturesSection />
      <AccountingSoftwareSection />
      <AboutSection />
      <OtherServicesSection />
      <PricingSection />
      <GetInTouchSection />
      {/* <FeedbacksSection /> */}
      <FaqSection />
      <FooterSection />
    </div>
  );
};

export default Home;
