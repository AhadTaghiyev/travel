
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const [country,setCountry]=useState(null)
useEffect(()=>{
  fetch("https://jsonip.com/")
  .then(res=>res.json())
  .then(data=>{
    fetch(`https://api.iplocation.net/?ip=${data.ip}`)
    .then(resIp=>resIp.json())
    .then(dataIp=>{ setCountry(dataIp.country_code2)})
  })
},[])

  return (
    <div id="landing-pricing-section" className="py-16 bg-white">
      <div className="landing-container">
        <h1 className="text-[#1976d2] font-semibold text-2xl xl:text-5xl xl:leading-[60px] text-center">
          Check Our Valuable Price
        </h1>
        <p className="w-full max-w-[552px] text-center mx-auto mt-4 text-xs text-[#24272b]">
          Objectively market-driven intellectual capital rather than covalent
          best practices facilitate strategic information before innovation.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {[1].map((_, index) => (
            <div
              key={index}
              className="text-[#1C2940] max-w-96 mx-auto bg-transparent min-h-full w-full p-6 border border-solid border-[#EBEDF0] rounded hover:bg-white  duration-150"
              style={{
                boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
              }}
            >
              <h3 className="text-base font-semibold">{index==0?"Monthly Subscription":index==1?"Yearly Amount":"GSA Conditions"}</h3>
              <ul className="flex flex-col my-5 gap-y-2 text-xs list-disc translate-x-6">
              <li>Admin Login</li>
              <li>Accountant Login</li>
              <li>Staff Login</li>
              <li>Staff Training</li>
              <li>All Accounting Functions</li>
              <li>Technical Suppor</li>
              <li>Paid Virtual Accountant Service</li>
              </ul>
              <div className="flex items-center gap-x-2 text-[#1976d2] mb-4">
                <p className="text-2xl leading-9 font-extrabold"> {country=="AZ"?"AZN 90":"$90"}</p>
                {/* <p className="text-xs font-bold">/per yera (+GTS)</p> */}
              </div>
              <Link
                to="/auth/register"
                className="w-full block cursor-pointer text-center px-6 py-3 bg-[#1976d2] rounded text-xs text-[#f8f9fb] hover:bg-[#4bb7f6] transition"
              >
                {index==2?"Contact Us":"Subscribe"}
                
              </Link>
            </div>
          ))}
           <div
          
              className="text-[#1C2940] max-w-96 mx-auto bg-transparent min-h-full w-full p-6 border border-solid border-[#EBEDF0] rounded hover:bg-white  duration-150"
              style={{
                boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
              }}
            >
              <h3 className="text-base font-semibold">GSA Conditions</h3>
              <ul className="flex flex-col my-5 gap-y-2 text-xs list-disc translate-x-6">
              <li>Admin Login</li>
              <li>Accountant Login</li>
              <li>Staff Login</li>
              <li>Your Own Language </li>
              <li>Your Domain</li>
              <li>Commissions From Your Sales</li>
              <li>Promote The Portal As Your Product</li>
              </ul>
              <div className="flex items-center gap-x-2 text-[#1976d2] mb-4">
                <p className="text-2xl leading-9 font-extrabold"> {"Agreement"}</p>
                {/* <p className="text-xs font-bold">/per yera (+GTS)</p> */}
              </div>
              <a
                href="/#landing-contact-section"
                className="w-full block cursor-pointer text-center px-6 py-3 bg-[#1976d2] rounded text-xs text-[#f8f9fb] hover:bg-[#4bb7f6] transition"
              >
                {"Contact Us"}
                
              </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
