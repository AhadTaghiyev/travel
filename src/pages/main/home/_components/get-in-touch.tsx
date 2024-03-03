const GetInTouchSection = () => {

  function handleSubmit(event) {
    event.preventDefault();
  
    // Form elementlerinin doğru şekilde isimlendirildiğinden emin olun
    const form = event.target;
    console.log(form)
    const contactPerson = form.elements.contactPerson?.value;
    const companyName = form.elements.companyName?.value;
    const mobile = form.elements.mobile?.value;
    const email = form.elements.email?.value;
    const country = form.elements.country?.value;
    const product = form.elements.product?.value;
    const message = form.elements.message?.value;
  
    // Eğer herhangi bir değer undefined ise, işlemi durdur
    if (!contactPerson || !companyName || !mobile || !email || !country || !product || !message) {
      console.error('Form fields are missing!');
      return;
    }
  

    const mailtoLink = 'mailto:support@travacco.com?' +
    'subject=' + encodeURIComponent(product) +
    '&body=Message: ' + encodeURIComponent(message) 
    window.open(mailtoLink, '_blank')
  }

  return (
    <div
      id="landing-contact-section"
      className="landing-container text-[#1c2940] py-16"
    >
      <h1 className="text-2xl xl:text-5xl xl:leading-[60px] text-center">
        Get in Touch Today!
      </h1>
      {/* <p className="w-full max-w-[552px] text-center mx-auto mt-4 text-xs text-[#24272b]">
        Proactively deliver seamless core competencies with scalable. Completely
        fabricate transparent paradigms.
      </p> */}
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
            <a href="tel:+994557777887" className="text-xs text-[#1876D1]">
              +994 50 516 26 66
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
            <a href="mailto:+994557777887" className="text-xs text-[#1876D1]">
              support@travacco.com
            </a>
          </div>
          <div
            className="mt-4 p-6 w-full"
            style={{
              boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
            }}
          >
            <h4 className="font-semibold">Locations</h4>
            <p className="mt-5 mb-2 text-xs">Adress</p>
            <a href="mailto:+994557777887" className="text-xs text-[#1876D1]">
            Fatali Khan Khoyski 166B, Narimanov, Baku, Azerbaijan
            </a>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="mb-5 text-xl font-bold">
            Fill out the form and we&apos;ll be in touch as soon as possible.
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-4">
  <input
    type="text"
    name="contactPerson" // name özelliği eklendi
    placeholder="Contact Person"
    className="p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
    style={{
      boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
    }}
  />
  <input
    type="text"
    name="companyName" // name özelliği eklendi
    placeholder="Company name"
    className="p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
    style={{
      boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
    }}
  />
  <input
    type="text"
    name="mobile" // name özelliği eklendi
    placeholder="Mobile"
    className="p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
    style={{
      boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
    }}
  />
  <input
    type="text"
    name="email" // name özelliği eklendi
    placeholder="Email"
    className="p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
    style={{
      boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
    }}
  />
  <input
    type="text"
    name="country" // name özelliği eklendi
    placeholder="Country"
    className="p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
    style={{
      boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
    }}
  />
  <input
    type="text"
    name="product" // name özelliği eklendi
    placeholder="I want to buy"
    className="p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
    style={{
      boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
    }}
  />
  <textarea
    name="message" // name özelliği eklendi
    placeholder="Message..."
    className="min-h-[140px] resize-y xl:col-span-2 p-3 text-xs bg-[#F8F9FB] rounded border border-solid border-[#EBEDF0] hover:border-[#dedfe1]"
    style={{
      boxShadow: "0px 16px 40px -12px rgba(171, 186, 201, 0.20)",
    }}
  />
  <button type="submit" className="xl:col-span-2 px-6 py-3 bg-[#1876D1] rounded text-xs text-[#f8f9fb] hover:bg-[#4bb7f6] transition">
    Send
  </button>
</form>

        </div>
      </div>
    </div>
  );
};

export default GetInTouchSection;
