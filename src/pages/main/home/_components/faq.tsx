import { cn } from "@/lib/utils";
import { useState } from "react";

const questions = [
  {
    question: "How can I us app?",
    answer:
      "You can easily get cash book reports, profit reports, customer details, supplier details, and other reports for the day. Staff Productivity and Family Report can be generated hassle-free.",
  },
  {
    question: "How can I us app?",
    answer:
      "You can easily get cash book reports, profit reports, customer details, supplier details, and other reports for the day. Staff Productivity and Family Report can be generated hassle-free.",
  },
  {
    question: "How can I us app?",
    answer:
      "You can easily get cash book reports, profit reports, customer details, supplier details, and other reports for the day. Staff Productivity and Family Report can be generated hassle-free.",
  },
  {
    question: "How can I us app?",
    answer:
      "You can easily get cash book reports, profit reports, customer details, supplier details, and other reports for the day. Staff Productivity and Family Report can be generated hassle-free.",
  },
];
const FaqSection = () => {
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
        {questions.map((q, i) => (
          <div
            key={i}
            className="flex flex-col py-3 px-6 bg-white rounded cursor-pointer hover:!shadow-sm"
            onClick={() => setActiveQuestion((prev) => (prev === i ? null : i))}
            style={{
              boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
            }}
          >
            <h1 className="font-semibold">{q.question}</h1>
            <p
              className={cn(
                "py-0 duration-200 h-0 overflow-hidden",
                activeQuestion === i && "py-5 h-fit"
              )}
            >
              {q.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
