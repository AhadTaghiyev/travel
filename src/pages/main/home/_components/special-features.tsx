import { DownloadCloud, GitBranchPlus, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { apiService } from "@/server/apiServer";
import { useTranslation } from "react-i18next";
// const { t } = useTranslation();
const icons = [<DownloadCloud color="#fff" />, <UserCheck color="#fff" />, <GitBranchPlus color="#fff" />];
const colors = ["#655F59", "#C4A153", "#6E7971"];

// const features = [
//   {
//     image:<DownloadCloud  color="#fff"  />,
//     color:"#655F59",
//     title: "Cloud Based ERP",
//     description: "Cloud Based ERP system that can be used anywhere",
//   },
//   {
//     image: <UserCheck  color="#fff"  />,
//     color:"#C4A153",
//     title: "Easy to Use",
//     description: "Easy to use even for the newbies in accounts",
//   },
//   {
//     image: <GitBranchPlus color="#fff" />,
//     color:"#6E7971",
//     title: "Multi Branch",
//     description: "Easy to manage multiple branches in single admin",
//   },
// ];

const SpecialFeaturesSection = () => {
  const { t } = useTranslation();
  const[features,setFeatures]=useState([])
  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(
          `/Feature/getall/1`
        );
        
        setFeatures(response?.data?.items)
       
      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  return (

    <div className="landing-container my-14">
        
      <h1 className="text-[#1c2940] text-2xl xl:text-5xl xl:leading-[60px] text-center">
       {t("Our Special Features")}
      </h1>
      {/* <p className="w-full max-w-[552px] text-center mx-auto mt-4 text-xs text-[#24272b]">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form travacco.
      </p> */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="text-[#1C2940] max-w-96 mx-auto bg-transparent min-h-full w-full p-6 border border-solid border-[#EBEDF0] rounded hover:bg-white hover:scale-105 duration-150"
          style={{
            boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
          }}>
          <div className="w-fit px-6 py-[22px] text-[#1c2940] rounded"
           style={{
            backgroundColor: colors[index % colors.length] // Renk seçimi
          }}>
            {icons[index % icons.length]} {/* İkon seçimi */}
          </div>
          <h2 className="text-2xl mt-9 mb-4">{t('culture')=="en"?feature.titleEn:t('culture')=="ru"?feature.titleRu:feature.titleAz}</h2>
          <p className="text-xs mb-6">{t('culture')=="en"?feature.descEn:t('culture')=="ru"?feature.descRu:feature.descAz}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default SpecialFeaturesSection;
