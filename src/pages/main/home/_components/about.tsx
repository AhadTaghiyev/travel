import { apiService } from "@/server/apiServer";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosCloseCircleOutline } from "react-icons/io";

const AboutSection = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/About/getall/1`);

        setData(response?.data?.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="w-screen h-screen fixed top-0 left-0 bg-black/40 z-50 grid place-items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[80%] bg-white rounded shadow-lg p-3 relative"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="border-none rounded-full absolute -right-3 -top-3 bg-white hover:bg-[#efefef] transition"
            >
              <IoIosCloseCircleOutline size={32} />
            </button>
            <img src={selectedImage} className="w-full" />
          </div>
        </div>
      )}
      <div id="landing-about-section" className="landing-container py-16">
        <h1 className="text-[#1c2940] text-2xl xl:text-5xl xl:leading-[60px] text-center">
          Travacco {t("About")}
        </h1>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.map((feature, index) => (
            <div
              key={index}
              className="text-[#1C2940] mx-auto bg-transparent min-h-full w-full p-4 border border-solid border-[#EBEDF0] rounded hover:bg-white hover:scale-105 duration-150"
              style={{
                boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
              }}
            >
              <img
                src={feature.image}
                onClick={() => setSelectedImage(feature.image)}
                alt={`Feature ${feature.titleEn}`}
                className="w-full h-[196px] object-contain rounded cursor-pointer"
              />

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
    </>
  );
};

export default AboutSection;
