import { Link } from "react-router-dom";

const PricingSection = () => {
  return (
    <div className="py-14 bg-white">
      <div className="landing-container">
        <h1 className="text-[#59C1FF] font-semibold text-2xl xl:text-5xl xl:leading-[60px] text-center">
          Check Our Valuable Price
        </h1>
        <p className="w-full max-w-[552px] text-center mx-auto mt-4 text-xs text-[#24272b]">
          Objectively market-driven intellectual capital rather than covalent
          best practices facilitate strategic information before innovation.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="text-[#1C2940] max-w-96 mx-auto bg-transparent min-h-full w-full p-6 border border-solid border-[#EBEDF0] rounded hover:bg-white  duration-150"
              style={{
                boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
              }}
            >
              <h3 className="text-base font-semibold">Yearly Amount</h3>
              <ul className="flex flex-col my-5 gap-y-2 text-xs list-disc translate-x-6">
                <li>Admin Login</li>
                <li>Accountant Login</li>
                <li>Unlimited Ticketing Staff Login</li>
                <li>Staff Training</li>
                <li>Call Back Support</li>
                <li>Technical Support</li>
                <li>Paid Virtual Accountant Service</li>
              </ul>
              <div className="flex items-center gap-x-2 text-[#59C1FF] mb-4">
                <p className="text-2xl leading-9 font-extrabold">$ 120.00</p>
                <p className="text-xs font-bold">/per yera (+GTS)</p>
              </div>
              <Link
                to="/"
                className="w-full block cursor-pointer text-center px-6 py-3 bg-[#59C1FF] rounded text-xs text-[#f8f9fb] hover:bg-[#4bb7f6] transition"
              >
                Subscribe
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
