import RocketImage from "@/assets/icons/rocket.png";
import TimeImage from "@/assets/icons/time.png";
import SettingsImage from "@/assets/icons/settings.png";

const features = [
  {
    image: RocketImage,
    title: "Cloud Based ERP",
    description: "Cloud Based ERP system that can be used anywhere",
  },
  {
    image: TimeImage,
    title: "Easy to Use",
    description: "Easy to use even for the newbies in accounts",
  },
  {
    image: SettingsImage,
    title: "Multi Branch",
    description: "Easy to manage multiple branches in single admin",
  },
];

const SpecialFeaturesSection = () => {
  return (
    <div className="landing-container my-14">
      <h1 className="text-[#1c2940] text-2xl xl:text-5xl xl:leading-[60px] text-center">
        Our Special Features
      </h1>
      <p className="w-full max-w-[552px] text-center mx-auto mt-4 text-xs text-[#24272b]">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form travacco.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-[#1C2940] max-w-96 mx-auto bg-transparent min-h-full w-full p-6 border border-solid border-[#EBEDF0] rounded hover:bg-white hover:scale-105 duration-150"
            style={{
              boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
            }}
          >
            <div className="w-fit px-6 py-[22px] text-[#1c2940] bg-[rgba(89,193,255,0.10)] rounded">
              <img src={feature.image} alt={`Feature ${feature.title}`} />
            </div>
            <h2 className="text-2xl mt-9 mb-4">{feature.title}</h2>
            <p className="text-xs mb-6">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialFeaturesSection;
