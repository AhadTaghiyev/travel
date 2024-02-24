import PlaceholderImage from "@/assets/placeholder.png";

const data = [
  {
    image: PlaceholderImage,
    title: "Easy-to-Use Dashboard",
    description:
      "From the dashboard, you can understand Cash in Hand, Cash in Bank, Recipient List, Supplier Bible List, Passenger Details, and Customer Passport Validity in the next few days.",
  },
  {
    image: PlaceholderImage,
    title: "Report generation",
    description:
      "You can easily get cash book reports, profit reports, customer details, supplier details, and other reports for the day. Staff Productivity and Family Report can be generated hassle-free.",
  },
];

const AboutSection = () => {
  return (
    <div id="landing-about-section" className="landing-container py-16">
      <h1 className="text-[#1c2940] text-2xl xl:text-5xl xl:leading-[60px] text-center">
        About Travacco
      </h1>
      <p className="w-full max-w-[552px] text-center mx-auto mt-4 text-xs text-[#24272b]">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form travacco.
      </p>
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
              alt={`Feature ${feature.title}`}
              className="w-full h-[196px] object-contain rounded"
            />

            <h2 className="text-base mt-6 mb-4 font-bold">{feature.title}</h2>
            <p className="text-xs">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
