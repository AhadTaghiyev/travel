const GetInTouchSection = () => {
  return (
    <div
      id="landing-contact-section"
      className="landing-container text-[#1c2940] py-16"
    >
      <h1 className="text-2xl xl:text-5xl xl:leading-[60px] text-center">
        Get in Touch Today!
      </h1>
      <p className="w-full max-w-[552px] text-center mx-auto mt-4 text-xs text-[#24272b]">
        Proactively deliver seamless core competencies with scalable. Completely
        fabricate transparent paradigms.
      </p>
      <div className="w-full flex-col lg:flex-row bg-white mt-12 px-4 lg:px-16 xl:px-24 flex gap-6 pt-8 pb-16">
        <div className="lg:w-[360px]">
          <h3 className="text-xl font-bold">Contacts</h3>
          <div
            className="p-6 w-full"
            style={{
              boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
            }}
          >
            <h4 className="font-semibold">Call Us</h4>
            <p className="mt-5 mb-2 text-xs">
              Questions about our product or pricing? Call for support
            </p>
            <a href="tel:+994557777887" className="text-xs text-[#59C1FF]">
              +994 55 777 78 87
            </a>
          </div>
          <div
            className="mt-4 p-6 w-full"
            style={{
              boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
            }}
          >
            <h4 className="font-semibold">Chat Us</h4>
            <p className="mt-5 mb-2 text-xs">Our support will help you from</p>
            <a href="mailto:+994557777887" className="text-xs text-[#59C1FF]">
              travvacco@info.az
            </a>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="mb-5 text-xl font-bold">
            Fill out the form and we&apos;ll be in touch as soon as possible.
          </h3>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-4">
            <input
              type="text"
              placeholder="Contact Person"
              className="p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
              style={{
                boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
              }}
            />
            <input
              type="text"
              placeholder="Company name"
              className="p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
              style={{
                boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
              }}
            />
            <input
              type="text"
              placeholder="Mobile"
              className="p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
              style={{
                boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
              }}
            />
            <input
              type="text"
              placeholder="Email"
              className="p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
              style={{
                boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
              }}
            />
            <input
              type="text"
              placeholder="Country"
              className="p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
              style={{
                boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
              }}
            />
            <input
              type="text"
              placeholder="I want to buy"
              className="p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
              style={{
                boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
              }}
            />
            <textarea
              placeholder="Message..."
              className="min-h-[140px] resize-y xl:col-span-2 p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
              style={{
                boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
              }}
            />
            <button className="xl:col-span-2 px-6 py-3 bg-[#59C1FF] rounded text-xs text-[#f8f9fb] hover:bg-[#4bb7f6] transition">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouchSection;
