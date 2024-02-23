import Navbar from "@/components/layout/navbar";
import HeroSection from "./_components/hero";
import PartnersSection from "./_components/partners";
import SpecialFeaturesSection from "./_components/special-features";
import AccountingSoftwareSection from "./_components/accounting-software";
import AboutSection from "./_components/about";
import OtherServicesSection from "./_components/other-services";
import PricingSection from "./_components/pricing";

const Home = () => {
  return (
    <div className="w-full bg-[#F8F9FB] h-full pb-20">
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <SpecialFeaturesSection />
      <AccountingSoftwareSection />
      <AboutSection />
      <OtherServicesSection />
      <PricingSection />
    </div>
  );
};

export default Home;
