import SlideImg from "@/assets/slide.png";
import { useState } from "react";

const slides = [
  {
    img: SlideImg,
    message:
      "1. Çox rahat proqram təminatıdır. Əməkdaşlarımız da rahatlıqla mənimsdilər. Mobil telefondan işlərə nəzarət imkanı isə bir rəhbər kimi mənim işimi çox yüngülləşdirdi.",
    author: "Saleh Mammadov",
    authorTitle: "Director, CO Founder Travacco",
  },
  {
    img: SlideImg,
    message:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, eveniet.",
    author: "John Doe",
    authorTitle: "CTO  Travacco",
  },
  {
    img: SlideImg,
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis voluptatum possimus modi, laboriosam molestias quo suscipit expedita corrupti id sapiente quidem maiores eum consequatur dolor debitis magni impedit. Magni aliquid sequi optio, voluptatibus eum vel laborum nesciunt ipsa facilis quo hic, voluptatum at dolore dignissimos quasi reiciendis eveniet sit autem! Repudiandae dignissimos similique architecto accusamus minus rerum quidem aperiam illo, tenetur odio. Ipsum culpa aut deserunt voluptatem a repellendus tenetur. Aliquam pariatur officia iure quidem tempore dolore consequuntur repellendus perferendis.",
    author: "Jenny Doe",
    authorTitle: "Director, CO Founder Travacco",
  },
];

const FeedbacksSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slide = slides[activeSlide % slides.length];
  return (
    <div className="relative landing-container text-[#1c2940] my-14">
      <h1 className="text-2xl xl:text-5xl xl:leading-[60px] text-center">
        Feedbacks
      </h1>
      <p className="w-full max-w-[552px] text-center mx-auto mt-4 text-xs text-[#24272b]">
        Discover what our customers tell us about their satisfaction.
      </p>
      <div
        className="w-full relative flex-col-reverse items-center lg:items-start lg:flex-row border justify-between border-solid border-[#EBEDF0] mt-12 px-4 lg:px-16 xl:px-24 flex gap-6 py-14"
        style={{
          boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
        }}
      >
        <div>
          <p className="max-w-[480px] max-h-[180px] mb-2 lg:h-[180px] overflow-y-auto z-10 relative">
            {slide.message}
          </p>
          <p className="font-bold">{slide.author}</p>
          <p className="text-xs text-[#B6C0D0]">{slide.authorTitle}</p>
        </div>

        <img
          src={slide.img}
          alt="Slide photo"
          className="w-[344px] h-[316px] object-cover rounded"
        />
        <div className="absolute bottom-[36px] lg:bottom-[60px] right-5 lg:left-[96px]">
          <button
            onClick={() => setActiveSlide((prev) => prev - 1)}
            className="p-3 bg-white hover:bg-[#f5f5f5] mr-3"
            style={{
              boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
            }}
          >
            <svg
              width="9"
              height="13"
              viewBox="0 0 9 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13C6.71875 13 6.46875 12.9062 6.28125 12.7188L1.28125 7.71875C0.875 7.34375 0.875 6.6875 1.28125 6.3125L6.28125 1.3125C6.65625 0.90625 7.3125 0.90625 7.6875 1.3125C8.09375 1.6875 8.09375 2.34375 7.6875 2.71875L3.40625 7L7.6875 11.3125C8.09375 11.6875 8.09375 12.3438 7.6875 12.7188C7.5 12.9062 7.25 13 7 13Z"
                fill="#1C2940"
              />
            </svg>
          </button>
          <button
            onClick={() => setActiveSlide((prev) => prev + 1)}
            className="p-3 bg-white hover:bg-[#f5f5f5] mr-3"
            style={{
              boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
            }}
          >
            <svg
              width="9"
              height="13"
              viewBox="0 0 9 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 13C1.71875 13 1.46875 12.9062 1.28125 12.7188C0.875 12.3438 0.875 11.6875 1.28125 11.3125L5.5625 7L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7.6875 6.3125C8.09375 6.6875 8.09375 7.34375 7.6875 7.71875L2.6875 12.7188C2.5 12.9062 2.25 13 2 13Z"
                fill="#1C2940"
              />
            </svg>
          </button>
        </div>
        <span className="hidden lg:block absolute top-[30px] left-[74px]">
          <svg
            width="48"
            height="43"
            viewBox="0 0 48 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.1016 0.21875L16.4297 42.6719H0.789062L10.2422 0.21875H22.1016ZM47.1094 0.21875L41.3516 42.6719H25.7969L35.3359 0.21875H47.1094Z"
              fill="#EBEDF0"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default FeedbacksSection;
