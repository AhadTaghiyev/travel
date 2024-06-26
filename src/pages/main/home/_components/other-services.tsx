import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { apiService } from "@/server/apiServer";



const OtherServicesSection = () => {


  const { t } = useTranslation();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/otherServiceSite/getall/1`);
  
        setData(response?.data?.items);
     
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="landing-container py-16">
      <h1 className="text-[#1c2940] text-2xl xl:text-5xl xl:leading-[60px] text-center">
        Other Services
      </h1>
      <p className="w-full max-w-[552px] text-center mx-auto mt-4 text-xs text-[#24272b]">
        In just five years, we have over 1500 customer in India, UAE, Saudi
        Arabia, Qatar, Oman, Nepal and Egypt
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {data.map((feature, index) => (
          <div
            key={index}
            className="text-[#1C2940] max-w-96 mx-auto bg-transparent min-h-full w-full p-4 border border-solid border-[#EBEDF0] rounded hover:bg-white hover:scale-105 duration-150"
            style={{
              boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
            }}
          >
            <div className="w-fit px-6 py-[22px] text-[#1c2940] bg-[rgba(89,193,255,0.10)] rounded">
              <img src={feature.image} alt={`Feature ${feature.title}`} />
            </div>
            <h2 className="text-base mt-6 mb-4 font-bold">
                {t("culture") == "en"
                  ? feature.titleEn
                  : t("culture") == "ru"
                  ? feature.titleRu
                  : feature.titleAz}
              </h2>
              <p className="text-xs">
                {t("culture") == "en"
                  ? feature.descEn
                  : t("culture") == "ru"
                  ? feature.descRu
                  : feature.descAz}
              </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherServicesSection;
