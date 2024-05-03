import { cn } from "@/lib/utils";
import { apiService } from "@/server/apiServer";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const FaqSection = () => {
  const { t } = useTranslation();
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/Question/getall/1`);

        setDatas(response?.data?.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [activeQuestion, setActiveQuestion] = useState(null);
  return (
    <div
      id="landing-faq-section"
      className="relative landing-container text-[#1c2940] py-16"
    >
      <h1 className="text-2xl xl:text-5xl xl:leading-[60px] text-center">
        Frequently Asked Questions (FAQ)
      </h1>
      <p className="w-full max-w-[552px] text-center mx-auto mt-4 text-xs text-[#24272b]">
        Discover what our customers tell us about their satisfaction.
      </p>

      <div className="flex flex-col gap-y-3 mt-9">
        {datas.map((q, i) => (
          <div
            key={i}
            className="flex flex-col py-3 px-6 bg-white rounded cursor-pointer hover:!shadow-sm"
            onClick={() => setActiveQuestion((prev) => (prev === i ? null : i))}
            style={{
              boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
            }}
          >
            <h1 className="font-semibold">
              {" "}
              {t("culture") == "en"
                ? q.titleEn
                : t("culture") == "ru"
                ? q.titleRu
                : q.titleAz}
            </h1>
            <p
              className={cn(
                "py-0 duration-200 h-0 overflow-hidden",
                activeQuestion === i && "py-5 h-fit"
              )}
            >
              {t("culture") == "en"
                ? q.descEn
                : t("culture") == "ru"
                ? q.descRu
                : q.descAz}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
