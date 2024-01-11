import { createBrowserRouter } from "../../node_modules/react-router-dom/dist/index";
import Main from "../pages/main";
import Home from "../pages/main/home";
import AviabiletSale from "../pages/main/aviabiletSale";
// import AviabiletSaleTable from "../pages/main/aviabiletSale/table";
import NewAviaticket from "../pages/main/aviabiletSale/newTicket";
import Reciept from "../pages/main/aviabiletSale/reciept";
import RecieptCoorperative from "../pages/main/corperativeTicket/reciept/index";
import RecieptTour from "../pages/main/tourPackage/reciept/index";
import App from "../App";
import Error from "../Error";
import Login from "../pages/authentication/login";
import Auth from "../pages/authentication";
import ChangePassword from "../pages/authentication/changePassword";
import Unauth from "../Unauth";
import Customers from "../pages/main/settings/customer";
import NewCustomer from "../pages/main/settings/customer/newCustomer";
import Supplier from "../pages/main/settings/supplier";
import NewSupplier from "../pages/main/settings/supplier/newSupplier";
import UpdateSupplier from "../pages/main/settings/supplier/updateSupplier";
import Personal from "../pages/main/settings/personal";
import NewPersonal from "../pages/main/settings/personal/newPersonal";
import Payment from "../pages/main/settings/payment";
import NewPayment from "../pages/main/settings/payment/newPayment";
import UpdateCustomer from "../pages/main/settings/customer/updateCustomer";
import UpdatePersonal from "../pages/main/settings/personal/updatePersonal";
import UpdatePayment from "../pages/main/settings/payment/updatePayment";
import UpdateAviaticket from "../pages/main/aviabiletSale/updateTicket";
import ReportAviaticket from "../pages/main/aviabiletSale/report";
//Transfer
import Transfer from "../pages/main/settings/transfer";
import NewTranfser from "../pages/main/settings/transfer/newTransfer";
import UpdateTransfer from "../pages/main/settings/transfer/updateTransfer";
//Dining
import Dining from "../pages/main/settings/dining";
import NewDining from "../pages/main/settings/dining/newDining";
import UpdateDining from "../pages/main/settings/dining/updateDining";
//Tour
import Tour from "../pages/main/settings/tour";
import NewTour from "../pages/main/settings/tour/newTour";
import UpdateTour from "../pages/main/settings/tour/updateTour";
//ServiceManager
import ServiceManager from "../pages/main/settings/serviceManager";
import NewServiceManager from "../pages/main/settings/serviceManager/newServiceManager";
import UpdateServiceManager from "../pages/main/settings/serviceManager/updateServiceManager";
// Refunds
import Refund from "../pages/main/refund";
import NewRefund from "../pages/main/refund/newRefund";
import UpdateRefund from "../pages/main/refund/UpdateRefund";
// Report
import Report from "../pages/main/report";
// Referance
import NewReferance from "../pages/main/referance/newReferance";
import Referance from "../pages/main/referance/index";

// SupplierDebts
import SuplierDebt from "../pages/main/supplierDebt";
import NewSuplierDebt from "../pages/main/supplierDebt/newSupplierDebt";
import UpdateSuplierDebt from "../pages/main/supplierDebt/updateSupplierDebt";
import SupplierDebtDetail from "../pages/main/supplierDebt/detail";
//Admin
import Admin from "../pages/admin";
import CompanyAdmin from "../pages/admin/company";
import CompanyCreate from "../pages/admin/company/createCompany";
import CompanyUpdate from "../pages/admin/company/updateCompany";

//Airway
import Airway from "../pages/main/settings/airway";
import NewAirway from "../pages/main/settings/airway/newAirway";
import UpdateAirway from "../pages/main/settings/airway/updateAirway";
// Money transfer
import MoneyTransfer from "../pages/main/moneyTranfser";
import NewMoneyTransfer from "../pages/main/moneyTranfser/newMoneyTransfer";
import UpdateMoneyTransfer from "../pages/main/moneyTranfser/updateMoneyTransfer";
//Korperativ bilet
import CorperativeTicket from "../pages/main/corperativeTicket";
import NewCorperativeTicket from "../pages/main/corperativeTicket/newTicket";
import UpdateCorperativeTicket from "../pages/main/corperativeTicket/updateTicket";
import ReportCorperativeTicket from "../pages/main/corperativeTicket/report";
// GetCredits
import GetCredit from "../pages/main/credit/getCredits";
import NewGetCredit from "../pages/main/credit/getCredits/newGetCredit";
import UpdateGetCredit from "../pages/main/credit/getCredits/updateGetCredit";
// PaidCredits
import PaidCredit from "../pages/main/credit/paidCredits";
import NewPaidCredit from "../pages/main/credit/paidCredits/newPaidCredit";
import UpdatePaidCredit from "../pages/main/credit/paidCredits/updatePaidCredit";
//Tur Paketleri
import TourPackage from "../pages/main/tourPackage";
import NewTourPackage from "../pages/main/tourPackage/newTourPackage";
import UpdateTourPackage from "../pages/main/tourPackage/updateTourPackage";
import TourReport from "../pages/main/tourPackage/report";

//MassIncome
import MassIncome from "../pages/main/massIncome";
import NewMassIncome from "../pages/main/massIncome/newMassIncome";
import UpdateMassIncome from "../pages/main/massIncome/updateMassIncome";
import InvoiceMassIncome from "../pages/main/massIncome/invoice";

// Other Services
import OtherService from "../pages/main/otherServices";
import NewOtherService from "../pages/main/otherServices/newOtherService";
import UpdateOtherService from "../pages/main/otherServices/updateOtherService";
// Employees
import Employee from "../pages/main/employee";
import NewEmployee from "../pages/main/employee/newEmployee";
import UpdateEmployee from "../pages/main/employee/updateEmployee";
// Deposits
import Deposit from "../pages/main/deposit";
import NewDeposit from "../pages/main/deposit/newDeposit";
import UpdateDeposit from "../pages/main/deposit/updateDeposit";
import DetailDeposit from "../pages/main/deposit/detail";
//Individual Tur Paketleri
import IndividualTourPackage from "../pages/main/individualTour";
import NewIndividualTourPackage from "../pages/main/individualTour/newIndividualTour";
import UpdateIndividualTourPackage from "../pages/main/individualTour/updateIndividualTour";
import ReportIndividualTourPackage from "../pages/main/individualTour/report";

//other services
import OtherServices from "../pages/main/otherServices";
import OtherServicesReport from "../pages/main/otherServices";

//agreements
import Agreements from "../pages/main/agreement";
import NewAgreement from "../pages/main/agreement/newAgreement";
import UpdateAgreement from "../pages/main/agreement/updateAgreement";

//willBePaid
import WillBePaid from "../pages/main/willBePaid";
import NewWillBePaid from "../pages/main/willBePaid/newWillBePaid";
import UpdateWillBePaid from "../pages/main/willBePaid/updateWillBePaid";
import DetailWillBePaid from "../pages/main/willBePaid/detail";

//documents
import DocumentCreate from "../pages/main/document/sendDocument";
import DocumentsList from "../pages/main/document/documentsList";

//email
import EmailSend from "../pages/main/email";

//willBeGet
import WillBeGet from "../pages/main/willBeGet";
import WillBeGetDetail from "../pages/main/willBeGet/detail";
import GetPaymentDetail from "../pages/main/paymenDetailReport/detail";
import ReportCredit from "../pages/main/reportCredit";
import DailyInvoice from "../pages/main/dailyInvoice";
import TotalInvoiceRevenue from "../pages/main/totalInvoiceRevenue";
import CustomerDeposits from "../pages/main/customerDeposits";
import TotalStatus from "../pages/main/totalStatus";
import PaidSalary from "../pages/main/paidSalary";

import Fee from "../pages/main/settings/fees";
import NewFee from "../pages/main/settings/fees/newFee";
import UpdateFee from "../pages/main/settings/fees/updateFee";

import SalaryToBePaid from "../pages/main/salaryToBePaid";
import NewSalaryToBePaid from "../pages/main/salaryToBePaid/newSalaryToBePaid";
import UpdateSalaryToBePaid from "../pages/main/salaryToBePaid/updateSalaryToBePaid";

import PaymentDetailReport from "../pages/main/paymenDetailReport/detail";

import SupplierDeposits from "../pages/main/supplierDeposit";
import NewSupplierDeposit from "../pages/main/supplierDeposit/new";
import UpdateSupplierDeposit from "../pages/main/supplierDeposit/update";
import DetailSupplierDeposit from "../pages/main/supplierDeposit/detail";

import AgreementFormat from "../pages/main/settings/agreementFormat";
import NewAgreementFormat from "../pages/main/settings/agreementFormat/new";
import UpdateAgreementFormat from "../pages/main/settings/agreementFormat/updateAgreement";

//reports
import PlaneTicketReport from "../pages/main/reports/planeTickets";
import CorporateReport from "../pages/main/reports/corporate";
import TourPackageReport from "../pages/main/reports/tourPackage";
import IndividualTourPackageReport from "../pages/main/reports/individualTourPackage";
import OtherServiceReport from "../pages/main/reports/otherServices";
import MasIncomeReport from "../pages/main/reports/masincome";
import WillBePaidReport from "../pages/main/reports/willbepaids";
import DebtReport from "../pages/main/reports/debt";
import GetCreditReport from "../pages/main/reports/getcredit";
import PaidCreditReport from "../pages/main/reports/paidcredit";
import PaidSalaryReport from "../pages/main/reports/paidsalary";
import CustomerReport from "../pages/main/reports/customers";
import CustomerReportDetail from "../pages/main/reports/customers/customerReport";
import PersonalReport from "../pages/main/reports/personal";
import PersonalReportDetail from "../pages/main/reports/personal/personalReport";
import FeeReports from "../pages/main/reports/fees";
import FeeReportsDetails from "../pages/main/reports/fees/details";
import NearestFlightReport from "../pages/main/reports/nearestFlights";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/403",
    element: <Unauth />,
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "/auth/changePassword",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin/company",
        element: <CompanyAdmin />,
      },
      {
        path: "/admin/company/update/:id",
        element: <CompanyUpdate />,
      },
      {
        path: "/admin/company/create",
        element: <CompanyCreate />,
      },
    ],
  },
  {
    path: "/panel",
    element: <Main />,
    children: [
      {
        path: "/panel",
        element: <Home />,
      },
      // ===============
      // AviabiletSale
      //================
      {
        path: "/panel/aviabiletsale",
        element: <AviabiletSale />,
      },
      {
        path: "/panel/aviabiletsale/new",
        element: <NewAviaticket />,
      },
      {
        path: "/panel/aviabiletsale/new/reciept/:id",
        element: <Reciept />,
      },
      {
        path: "/panel/aviabiletsale/update/:id",
        element: <UpdateAviaticket />,
      },
      {
        path: "/panel/aviabiletsale/report",
        element: <ReportAviaticket />,
      },

      // ===============
      // CorperativeTicket
      //================
      {
        path: "/panel/corperativeTicket",
        element: <CorperativeTicket />,
      },
      {
        path: "/panel/corperativeTicket/new",
        element: <NewCorperativeTicket />,
      },
      {
        path: "/panel/corperativeTicket/new/reciept/:id",
        element: <RecieptCoorperative />,
      },

      {
        path: "/panel/corperativeTicket/update/:id",
        element: <UpdateCorperativeTicket />,
      },
      {
        path: "/panel/corperativeTicket/report",
        element: <ReportCorperativeTicket />,
      },
      {
        path: "/panel/GetPaymentDetail/report/:id",
        element: <GetPaymentDetail />,
      },

      // ===============
      // TourPackage
      //================
      {
        path: "/panel/tourPackages",
        element: <TourPackage />,
      },
      {
        path: "/panel/tourPackages/new",
        element: <NewTourPackage />,
      },

      {
        path: "/panel/tourPackages/update/:id",
        element: <UpdateTourPackage />,
      },
      {
        path: "/panel/individualTourPackage",
        element: <IndividualTourPackage />,
      },
      {
        path: "/panel/individualTourPackage/new",
        element: <NewIndividualTourPackage />,
      },
      {
        path: "/panel/individualTourPackage/update/:id",
        element: <UpdateIndividualTourPackage />,
      },
      {
        path: "/panel/individualTourPackage/report",

        element: <ReportIndividualTourPackage />,
      },

      {
        path: "/panel/tourPackage/new",
        element: <NewAviaticket />,
      },
      {
        path: "/panel/tourPackages/new/reciept/:id",
        element: <RecieptTour />,
      },

      {
        path: "/panel/tourPackage/update/:id",
        element: <UpdateAviaticket />,
      },

      {
        path: "/panel/tourPackages/report",
        element: <TourReport />,
      },

      // ===============
      // Mass Income
      // ===============

      {
        path: "/panel/massIncome",
        element: <MassIncome />,
      },
      {
        path: "/panel/massIncome/new",
        element: <NewMassIncome />,
      },
      {
        path: "/panel/massIncome/update/:id",
        element: <UpdateMassIncome />,
      },
      {
        path: "/panel/massIncome/report",
        element: <InvoiceMassIncome />,
      },

      // ===============
      // Other services
      //================
      {
        path: "/panel/otherServices",
        element: <OtherService />,
      },
      {
        path: "/panel/otherServices/new",
        element: <NewOtherService />,
      },

      {
        path: "/panel/otherServices/update/:id",
        element: <UpdateOtherService />,
      },
      {
        path: "panel/otherServices/report",
        element: <OtherServicesReport />,
      },
      // ===============
      // Refunds
      //================
      {
        path: "/panel/refunds",
        element: <Refund />,
      },
      {
        path: "/panel/refunds/new",
        element: <NewRefund />,
      },

      {
        path: "/panel/refunds/update/:id",
        element: <UpdateRefund />,
      },
      // ===============
      // TourPackage
      //================
      {
        path: "/panel/otherServices",
        element: <OtherServices />,
      },
      // ===============
      // Customer
      //================
      {
        path: "/panel/customers",
        element: <Customers />,
      },
      {
        path: "/panel/customers/new",
        element: <NewCustomer />,
      },
      {
        path: "/panel/customers/update/:id",
        element: <UpdateCustomer />,
      },
      // ===============
      // GetCredits
      //================
      {
        path: "/panel/GetCredits",
        element: <GetCredit />,
      },
      {
        path: "/panel/GetCredits/new",
        element: <NewGetCredit />,
      },
      {
        path: "/panel/GetCredits/update/:id",
        element: <UpdateGetCredit />,
      },
      // ===============
      // PaidCredits
      //================
      {
        path: "/panel/PaidCredits",
        element: <PaidCredit />,
      },
      {
        path: "/panel/PaidCredits/new",
        element: <NewPaidCredit />,
      },
      {
        path: "/panel/PaidCredits/update/:id",
        element: <UpdatePaidCredit />,
      },

      // ===============
      // Employees
      //================
      {
        path: "/panel/employees",
        element: <Employee />,
      },
      {
        path: "/panel/employees/new",
        element: <NewEmployee />,
      },
      {
        path: "/panel/employees/update/:id",
        element: <UpdateEmployee />,
      },
      // ===============
      // Airway
      //================
      {
        path: "/panel/airways",
        element: <Airway />,
      },
      {
        path: "/panel/airways/new",
        element: <NewAirway />,
      },
      {
        path: "/panel/airways/update/:id",
        element: <UpdateAirway />,
      },
      // ===============
      // Reoprts
      //================
      {
        path: "/panel/reports",
        element: <Report />,
      },
      // ===============
      // Reoprts
      //================
      {
        path: "/panel/referances",
        element: <Referance />,
      },
      {
        path: "/panel/referances/new",
        element: <NewReferance />,
      },

      // ===============
      // Deposits
      //================
      {
        path: "/panel/deposits",
        element: <Deposit />,
      },
      {
        path: "/panel/deposits/new",
        element: <NewDeposit />,
      },
      {
        path: "/panel/deposits/update/:id",
        element: <UpdateDeposit />,
      },
      {
        path: "/panel/deposits/detail/:id",
        element: <DetailDeposit />,
      },
      // ===============
      // SupplierDebts
      //================
      {
        path: "/panel/supplierDebts",
        element: <SuplierDebt />,
      },
      {
        path: "/panel/supplierDebts/new",
        element: <NewSuplierDebt />,
      },
      {
        path: "/panel/supplierDebts/update/:id",
        element: <UpdateSuplierDebt />,
      },
      {
        path: "/panel/supplierDebts/detail/:id",
        element: <SupplierDebtDetail />,
      },
      // ===============
      // Suplier
      //================
      {
        path: "/panel/suppliers",
        element: <Supplier />,
      },
      {
        path: "/panel/suppliers/new",
        element: <NewSupplier />,
      },
      {
        path: "/panel/suppliers/update/:id",
        element: <UpdateSupplier />,
      },
      // ===============
      // Personal
      //================
      {
        path: "/panel/personals",
        element: <Personal />,
      },
      {
        path: "/panel/personals/new",
        element: <NewPersonal />,
      },
      {
        path: "/panel/personals/update/:id",
        element: <UpdatePersonal />,
      },
      // ===============
      // Payments
      //================
      {
        path: "/panel/payments",
        element: <Payment />,
      },
      {
        path: "/panel/payments/new",
        element: <NewPayment />,
      },
      {
        path: "/panel/payments/update/:id",
        element: <UpdatePayment />,
      },

      // ===============
      // Money Transfers
      //================
      {
        path: "/panel/moneyTransfers",
        element: <MoneyTransfer />,
      },
      {
        path: "/panel/moneyTransfers/new",
        element: <NewMoneyTransfer />,
      },
      {
        path: "/panel/moneyTransfers/update/:id",
        element: <UpdateMoneyTransfer />,
      },

      // ===============
      // Transfers
      //================
      {
        path: "/panel/transfers",
        element: <Transfer />,
      },
      {
        path: "/panel/transfers/new",
        element: <NewTranfser />,
      },
      {
        path: "/panel/transfers/update/:id",
        element: <UpdateTransfer />,
      },

      // ===============
      // Dinings
      //================
      {
        path: "/panel/dinings",
        element: <Dining />,
      },
      {
        path: "/panel/dinings/new",
        element: <NewDining />,
      },
      {
        path: "/panel/dinings/update/:id",
        element: <UpdateDining />,
      },
      //=================
      // Tours
      //=================
      {
        path: "/panel/tours",
        element: <Tour />,
      },
      {
        path: "/panel/tours/new",
        element: <NewTour />,
      },
      {
        path: "/panel/tours/update/:id",
        element: <UpdateTour />,
      },
      //=================
      // Service Managers
      //=================
      {
        path: "/panel/serviceManagers",
        element: <ServiceManager />,
      },
      {
        path: "/panel/serviceManagers/new",
        element: <NewServiceManager />,
      },
      {
        path: "/panel/serviceManagers/update/:id",
        element: <UpdateServiceManager />,
      },

      //=================
      // Agreements
      //=================
      {
        path: "/panel/agreements",
        element: <Agreements />,
      },
      {
        path: "/panel/agreements/new",
        element: <NewAgreement />,
      },
      {
        path: "/panel/agreements/update/:id",
        element: <UpdateAgreement />,
      },
      //=================
      // AgreementFormat
      //=================
      {
        path: "/panel/agreementformat",
        element: <AgreementFormat />,
      },
      {
        path: "/panel/agreementformat/new",
        element: <NewAgreementFormat />,
      },
      {
        path: "/panel/agreementFormats/update/:id",
        element: <UpdateAgreementFormat />,
      },

      //=================
      // WillBePaid
      //=================
      {
        path: "/panel/willbepaid",
        element: <WillBePaid />,
      },
      {
        path: "/panel/willbepaid/new",
        element: <NewWillBePaid />,
      },
      {
        path: "/panel/willbepaid/update/:id",
        element: <UpdateWillBePaid />,
      },
      {
        path: "/panel/willbepaid/detail/:id",
        element: <DetailWillBePaid />,
      },
      //=================
      // Documents
      //=================
      {
        path: "/panel/documents/send",
        element: <DocumentCreate />,
      },
      {
        path: "/panel/documents",
        element: <DocumentsList />,
      },
      //=================
      // Email
      //=================
      {
        path: "/panel/email/send",
        element: <EmailSend />,
      },
      //=================
      // Hesabatlar
      //=================
      {
        path: "/panel/willBeGet",
        element: <WillBeGet />,
      },
      {
        path: "/panel/willBeGet/:id",
        element: <WillBeGetDetail />,
      },
      {
        path: "/panel/reportCredit",
        element: <ReportCredit />,
      },
      {
        path: "/panel/dailyInvoice",
        element: <DailyInvoice />,
      },
      {
        path: "/panel/totalInvoiceRevenue",
        element: <TotalInvoiceRevenue />,
      },
      {
        path: "/panel/customerDeposits",
        element: <CustomerDeposits />,
      },
      {
        path: "/panel/totalStatus",
        element: <TotalStatus />,
      },
      {
        path: "/panel/paidSalary",
        element: <PaidSalary />,
      },
      {
        path: "/panel/fee",
        element: <Fee />,
      },
      {
        path: "/panel/fee/new",
        element: <NewFee />,
      },
      {
        path: "/panel/fee/update/:id",
        element: <UpdateFee />,
      },
      {
        path: "/panel/salaryToBePaid",
        element: <SalaryToBePaid />,
      },
      {
        path: "/panel/salaryToBePaid/new",
        element: <NewSalaryToBePaid />,
      },
      {
        path: "/panel/salaryToBepaid/update/:id",
        element: <UpdateSalaryToBePaid />,
      },
      {
        path: "/panel/payments/report/:id",
        element: <PaymentDetailReport />,
      },
      {
        path: "/panel/supplierDeposits",
        element: <SupplierDeposits />,
      },
      {
        path: "/panel/supplierDeposits/new",
        element: <NewSupplierDeposit />,
      },
      {
        path: "/panel/supplierDeposits/update/:id",
        element: <UpdateSupplierDeposit />,
      },
      {
        path: "/panel/supplierDeposits/detail/:id",
        element: <DetailSupplierDeposit />,
      },
      {
        path: "/panel/agreementFormats",
        element: <AgreementFormat />,
      },
      {
        path: "/panel/agreementFormats/new",
        element: <NewAgreementFormat />,
      },

      //reports
      {
        path: "/panel/reports/planeTicket",
        element: <PlaneTicketReport />,
      },
      {
        path: "/panel/reports/corperative",
        element: <CorporateReport />,
      },
      {
        path: "/panel/reports/tourPackage",
        element: <TourPackageReport />,
      },
      {
        path: "/panel/reports/individualTourPackage",
        element: <IndividualTourPackageReport />,
      },
      {
        path: "/panel/reports/otherServices",
        element: <OtherServiceReport />,
      },
      {
        path: "/panel/reports/masincome",
        element: <MasIncomeReport />,
      },
      {
        path: "/panel/reports/willbepaids",
        element: <WillBePaidReport />,
      },
      {
        path: "/panel/reports/debt",
        element: <DebtReport />,
      },
      {
        path: "/panel/reports/getcredit",
        element: <GetCreditReport />,
      },
      {
        path: "/panel/reports/paidcredit",
        element: <PaidCreditReport />,
      },
      {
        path: "/panel/reports/paidsalary",
        element: <PaidSalaryReport />,
      },
      {
        path: "/panel/reports/customer",
        element: <CustomerReport />,
      },

      {
        path: "/panel/reports/customer/:id",
        element: <CustomerReportDetail />,
      },
      {
        path: "/panel/reports/personal",
        element: <PersonalReport />,
      },
      {
        path: "/panel/reports/personal/:id",
        element: <PersonalReportDetail />,
      },
      {
        path: "/panel/reports/fee",
        element: <FeeReports />,
      },
      {
        path: "/panel/reports/feeDetails/:id",
        element: <FeeReportsDetails />,
      },
      {
        path: "/panel/reports/nearestFlights",
        element: <NearestFlightReport />,
      },
    ],
  },
  {
    path: "admin",
    children: [],
  },
]);

export default router;
