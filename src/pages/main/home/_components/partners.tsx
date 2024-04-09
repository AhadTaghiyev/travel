import { apiService } from "@/server/apiServer";
import { useEffect, useMemo, useState } from "react";





const PartnersSection = () => {
const [data, setData] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await apiService.get(`/Partner/getall/1`);

      setData(response?.data?.items);
   
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);
  const [showAll, setShowAll] = useState(false);

  const visiblePartners = useMemo(
    () => data?.slice(0, showAll ? data?.length : 6),
    [showAll]
  );


  return (
    <div className="relative landing-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-y border-solid border-[#EBEDF0] py-[40px] gap-y-4 md:gap-y-8 lg:gap-y-16">
      {visiblePartners.map((partner, index) => (

        <a
          key={index}
          href={partner.image}
          className="flex justify-center items-center p-4"
        >
          <img src={partner.image} alt="Partner" />
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
