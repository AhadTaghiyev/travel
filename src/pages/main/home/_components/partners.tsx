import { apiService } from "@/server/apiServer";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const PartnersSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/Partner/getall/1?isPaginated=false`);
        setData(response?.data?.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative landing-container py-[40px]">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {data.map((partner, index) => (
          <SwiperSlide key={index}>
            <a
              href={partner.image}
              className="flex justify-center items-center p-4"
            >
              <img src={partner.image} alt="Partner" />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PartnersSection;
