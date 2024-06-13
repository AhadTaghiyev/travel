import Navbar from "@/components/layout/navbar";
import FooterSection from "../home/_components/footer";


const Privacy = () => {
  return (
    <div className="w-full bg-[#F8F9FB] h-full">
    <Navbar />
       <div style={{padding:"10% 5%"}}>
        <h1>Privacy Policy</h1>
        <p><strong>Effective Date:</strong> May, 2024</p>
        <p>Travacco ("us," "we," or "our") operates the website <a href="https://travacco.com">https://travacco.com</a> (the "Site") and the Travacco Accounting Platform (the "Platform"). This Privacy Policy outlines how we collect, use, protect, and disclose information collected from users ("you," "your") of the Site and Platform.</p>
        <ol>
            <li><strong>Information Collection and Use</strong>
                <ol>
                    <li><strong>Types of Information Collected:</strong>
                        <ul>
                            <li>Personal Information: When you register for an account or use our Platform, we may collect personal information such as your name, email address, contact details, and company information.</li>
                            <li>Billing Information: If you make payments or use our billing services, we will not collect your any bank, card details. Payment details go through only secured bank system.</li>
                            <li>Usage Data: We may collect information about how you access and use the Platform, including your IP address, device information, browser type, and usage patterns.</li>
                        </ul>
                    </li>
                    <li><strong>Types of Information Not Collected:</strong>
                        <ul>
                            <li>User Data: We will not have any access to your login details. We may only know your username, but passwords will be generated unique and we will not reach to your passwords.</li>
                            <li>Company Data: Any information or data such as your accounting reports, customer information and any your business details provided by you in the application , we will not have access forever.</li>
                        </ul>
                    </li>
                    <li><strong>Use of Information:</strong>
                        <p>We may use the information we collect for various purposes, including but not limited to:</p>
                        <ul>
                            <li>Providing and maintaining the Platform.</li>
                            <li>Processing transactions and payments.</li>
                            <li>Communicating with you about your account and Platform updates.</li>
                            <li>Personalizing your experience and improving our services.</li>
                            <li>Complying with legal obligations.</li>
                        </ul>
                    </li>
                </ol>
            </li>
            <li><strong>Data Security</strong>
                <ol>
                    <li><strong>Security Measures:</strong>
                        <p>We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure.</p>
                    </li>
                    <li><strong>Data Retention:</strong>
                        <p>We retain your information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.</p>
                    </li>
                </ol>
            </li>
            <li><strong>Data Sharing and Disclosure</strong>
                <ol>
                    <li><strong>Third-Party Service Providers:</strong>
                        <p>We may share your information with third-party service providers who assist us in operating the Platform, processing payments, or providing related services. These service providers are contractually obligated to protect your information and use it only for specified purposes.</p>
                    </li>
                    <li><strong>Legal Compliance:</strong>
                        <p>We may disclose your information if required to do so by law or in response to valid legal requests, such as court orders or subpoenas.</p>
                    </li>
                </ol>
            </li>
            <li><strong>Your Choices</strong>
                <ol>
                    <li><strong>Account Information:</strong>
                        <p>You may review, update, or delete your account information by logging into your account settings. Please note that some information may be retained for legal or administrative purposes.</p>
                    </li>
                    <li><strong>Communication Preferences:</strong>
                        <p>You can choose to opt-in or opt-out of receiving promotional communications from us by following the instructions in the communication or contacting us directly.</p>
                    </li>
                </ol>
            </li>
            <li><strong>Children's Privacy</strong>
                <p>The Platform is not intended for children under the age of 13. We do not knowingly collect or solicit personal information from children. If you believe that we may have collected personal information from a child, please contact us immediately.</p>
            </li>
            <li><strong>Changes to this Privacy Policy</strong>
                <p>We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon posting the updated Privacy Policy on the Site. Your continued use of the Platform after such changes constitutes acceptance of the updated Privacy Policy.</p>
            </li>
            <li><strong>Contact Us</strong>
                <p>If you have any questions, concerns, or feedback about this Privacy Policy or our data practices, please contact us at <a href="mailto:support@travacco.com">support@travacco.com</a>.</p>
            </li>
            <li><strong>Consent</strong>
                <p>By using the Site or Platform, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy.</p>
            </li>
        </ol>
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

export default Privacy;
