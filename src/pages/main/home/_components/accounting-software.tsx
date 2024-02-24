import TransferImage from "@/assets/icons/transfer.png";
import AgreementImage from "@/assets/icons/agreement.png";
import ConfirmationImage from "@/assets/icons/confirmation.png";
import LikeImage from "@/assets/icons/like.png";

const data = [
  {
    image: TransferImage,
    title: "Easy-to-Use Dashboard",
    description:
      "From the dashboard, you can understand Cash in Hand, Cash in Bank, Recipient List, Supplier Bible List, Passenger Details, and Customer Passport Validity in the next few days.",
  },
  {
    image: AgreementImage,
    title: "Report generation",
    description:
      "You can easily get cash book reports, profit reports, customer details, supplier details, and other reports for the day. Staff Productivity and Family Report can be generated hassle-free.",
  },
  {
    image: ConfirmationImage,
    title: "Branch Sorting Facility",
    description: "Easy to manage multiple branches in single admin",
  },
  {
    image: LikeImage,
    title: "Add-ons available",
    description:
      "Tour Plus, UMRA Plus, VISA Plus, Money transfer accounting, E-service accounting, SMS and Whatsapp integration",
  },
];

const AccountingSoftwareSection = () => {
  return (
    <div className="landing-container py-16">
      <h1 className="text-[#1c2940] text-2xl xl:text-5xl xl:leading-[60px] text-center">
        All-inclusive accounting software
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
            <h2 className="text-base mt-6 mb-4 font-bold">{feature.title}</h2>
            <p className="text-xs">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountingSoftwareSection;
