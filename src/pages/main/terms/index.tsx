import Navbar from "@/components/layout/navbar";
import FooterSection from "../home/_components/footer";


const Terms = () => {
  return (
    <div className="w-full bg-[#F8F9FB] h-full">
    <Navbar />
     <div style={{padding:"10% 5%"}}>
        <h1>Terms and Conditions</h1>
        <p>Welcome to Travacco (the "Platform"). These terms and conditions ("Terms") govern your use of the Platform, so please read them carefully before proceeding.</p>
        <ol>
            <li><strong>Acceptance of Terms</strong><br/>
            By accessing or using the Platform in any way, you agree to comply with and be bound by these Terms. If you do not agree to all of the terms and conditions, then you may not access the Platform.</li>
            <li><strong>Use of the Platform</strong><br/>
            Travacco provides accounting services specifically tailored for travel agencies. You may use the Platform for managing your financial transactions, generating reports, and other related accounting activities.</li>
            <li><strong>Account Registration</strong><br/>
            To access certain features of the Platform, you may be required to register for an account. You agree to provide accurate and complete information during the registration process and to update such information to keep it accurate and current.</li>
            <li><strong>User Responsibilities</strong><br/>
            You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account or password.</li>
            <li><strong>Data Privacy</strong><br/>
            Travacco respects your privacy and handles your data in accordance with our Privacy Policy. By using the Platform, you consent to the collection and use of your information as described in the Privacy Policy.</li>
            <li><strong>Intellectual Property</strong><br/>
            The Platform, including all content, trademarks, and logos, is the property of Travacco or its licensors and is protected by intellectual property laws. You may not use, copy, or distribute any content from the Platform without prior written consent.</li>
            <li><strong>Limitation of Liability</strong><br/>
            Travacco is not liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Platform. In no event shall Travacco's total liability exceed the amount paid by you, if any, for using the Platform.</li>
            <li><strong>Changes to Terms</strong><br/>
            Travacco reserves the right to modify or update these Terms at any time. Continued use of the Platform after such changes constitutes your acceptance of the revised Terms.</li>
            <li><strong>Termination</strong><br/>
            Travacco may suspend or terminate your access to the Platform at any time, with or without cause, and without notice.</li>
            <li><strong>Governing Law</strong><br/>
            These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of laws provisions.</li>
        </ol>
        <p>By using the Platform, you agree to abide by these Terms and any additional terms and conditions provided by Travacco. If you have any questions or concerns about these Terms, please contact us at <a href="mailto:support@travacco.com">support@travacco.com</a>.</p>
    </div>
    <footer style={{padding:"10% 5%"}}>
        <p>“Travacco” Accounting Software for Travel Agencies</p>
        <p>Owner: "Ovvl Digital Solutions" LLC</p>
        <p>Azerbaijan / Baku / Narimanov District / F. Khan Khoyski avenue / 166B</p>
        <p>AZ1075</p>
        <p>Tax ID: 1506474701</p>
        <p>Baku, May 2024</p>
    </footer>
    <FooterSection />
   </div>
  );
};

export default Terms;
