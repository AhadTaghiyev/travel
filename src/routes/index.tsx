import { createBrowserRouter } from "../../node_modules/react-router-dom/dist/index";
import Main from "../pages/main";
import Home from "../pages/main/home";

import RecieptCoorperative from "../pages/main/corperativeTicket/reciept/index";
import RecieptTour from "../pages/main/tourPackage/reciept/index";
import App from "../App";
import Error from "../Error";
import Login from "../pages/authentication/login";
import Auth from "../pages/authentication";
import ChangePassword from "../pages/authentication/changePassword";
import Unauth from "../Unauth";

// Aviabilet Sales
import AviabiletSale from "../pages/main/aviabiletSale";
import Reciept from "../pages/main/aviabiletSale/reciept";
import ViewAviaticket from "../pages/main/aviabiletSale/view";
import NewAviaticket from "../pages/main/aviabiletSale/create";
import UpdateAviaticket from "../pages/main/aviabiletSale/update";
import ReportAviaticket from "../pages/main/aviabiletSale/report";

// Customers
import Customers from "../pages/main/settings/customer";
import NewCustomer from "../pages/main/settings/customer/create";
import UpdateCustomer from "../pages/main/settings/customer/update";

// Suppliers
import Supplier from "../pages/main/settings/supplier";
import NewSupplier from "../pages/main/settings/supplier/create";
import UpdateSupplier from "../pages/main/settings/supplier/update";

// Personals
import Personal from "../pages/main/settings/personal";
import NewPersonal from "../pages/main/settings/personal/create";
import UpdatePersonal from "../pages/main/settings/personal/update";

// Payments
import Payment from "../pages/main/settings/payment";
import NewPayment from "../pages/main/settings/payment/create";
import UpdatePayment from "../pages/main/settings/payment/update";

//Transfer
import Transfer from "../pages/main/settings/transfer";
import NewTranfser from "../pages/main/settings/transfer/create";
import UpdateTransfer from "../pages/main/settings/transfer/update";
// Meal
import Meal from "../pages/main/settings/meal";
import NewMeal from "../pages/main/settings/meal/create";
import UpdateMeal from "../pages/main/settings/meal/update";
//Tour
import Tour from "../pages/main/settings/tour";
import NewTour from "../pages/main/settings/tour/create";
import UpdateTour from "../pages/main/settings/tour/update";
//Services
import Service from "../pages/main/settings/service";
import NewService from "../pages/main/settings/service/create";
import UpdateService from "../pages/main/settings/service/update";

// Report
import Report from "../pages/main/report";
// Referance
import NewReferance from "../pages/main/referance/newReferance";
import Referance from "../pages/main/referance/index";

//Admin
import Admin from "../pages/admin";
import CompanyAdmin from "../pages/admin/company";
import CompanyCreate from "../pages/admin/company/createCompany";
import CompanyUpdate from "../pages/admin/company/updateCompany";

//Airway
import Airway from "../pages/main/settings/airway";
import NewAirway from "../pages/main/settings/airway/create";
import UpdateAirway from "../pages/main/settings/airway/update";

//Korperativ bilet
import CorperativeTicket from "../pages/main/corperativeTicket";
import NewCorperativeTicket from "../pages/main/corperativeTicket/create";
import UpdateCorperativeTicket from "../pages/main/corperativeTicket/update";
import ViewCorperativeTicket from "../pages/main/corperativeTicket/view";
import ReportCorperativeTicket from "../pages/main/corperativeTicket/report";
// GetCredits
import GetCredit from "../pages/main/getCredits";
import NewGetCredit from "../pages/main/getCredits/create";
import UpdateGetCredit from "../pages/main/getCredits/update";

// PaidCredits
import PaidCredit from "../pages/main/paidCredits";
import NewPaidCredit from "../pages/main/paidCredits/create";
import UpdatePaidCredit from "../pages/main/paidCredits/update";

//Tur Paketleri
import TourPackage from "../pages/main/tourPackage";
import NewTourPackage from "../pages/main/tourPackage/create";
import UpdateTourPackage from "../pages/main/tourPackage/update";
import ViewTourPackage from "../pages/main/tourPackage/view";
import TourReport from "../pages/main/tourPackage/report";

//Income
import Income from "../pages/main/income";
import NewIncome from "../pages/main/income/create";
// import UpdateIncome from "../pages/main/income/updateIncome";
import InvoiceIncome from "../pages/main/income/report";

// Refunds
import Refund from "../pages/main/refund";
import NewRefund from "../pages/main/refund/create";
// import UpdateIncome from "../pages/main/refund/update";
import RefundReport from "../pages/main/refund/report";

// Other Services
import OtherServices from "../pages/main/otherServices";
import NewOtherService from "../pages/main/otherServices/create";
import UpdateOtherService from "../pages/main/otherServices/update";
import ViewOtherService from "../pages/main/otherServices/view";
import ReportOtherService from "../pages/main/otherServices/report";

// Employees
import Employee from "../pages/main/employee";
import NewEmployee from "../pages/main/employee/create";
import UpdateEmployee from "../pages/main/employee/update";
// Deposits
import Deposit from "../pages/main/deposit";
import NewDeposit from "../pages/main/deposit/create";
import UpdateDeposit from "../pages/main/deposit/update";
import DetailDeposit from "../pages/main/deposit/report";
//Individual Tur Paketleri
import IndividualTourPackage from "../pages/main/individualTourPackage";
import NewIndividualTourPackage from "../pages/main/individualTourPackage/create";
import UpdateIndividualTourPackage from "../pages/main/individualTourPackage/update";
import ViewIndividualTourPackage from "../pages/main/individualTourPackage/view";
import ReportIndividualTourPackage from "../pages/main/individualTourPackage/report";

//agreements
import Agreements from "../pages/main/agreement";
import NewAgreement from "../pages/main/agreement/newAgreement";
import UpdateAgreement from "../pages/main/agreement/updateAgreement";

//willBePaid
import WillBePaid from "../pages/main/willBePaid";
import NewWillBePaid from "../pages/main/willBePaid/create";
import UpdateWillBePaid from "../pages/main/willBePaid/update";
import DetailWillBePaid from "../pages/main/willBePaid/report";

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

import Fee from "../pages/main/settings/fee";
import NewFee from "../pages/main/settings/fee/create";
import UpdateFee from "../pages/main/settings/fee/update";

// SalaryToBePaid
import SalaryToBePaid from "../pages/main/salaryToBePaid";
import NewSalaryToBePaid from "../pages/main/salaryToBePaid/create";
import UpdateSalaryToBePaid from "../pages/main/salaryToBePaid/update";

import PaymentDetailReport from "../pages/main/paymenDetailReport/detail";

// Bonus
import Bonus from "../pages/main/bonus";
import NewBonus from "../pages/main/bonus/create";
import UpdateBonus from "../pages/main/bonus/update";
import BonusReport from "../pages/main/bonus/report";

// ManagerFinancialTransactions
import Transaction from "../pages/main/managerFinancialTransaction";
import NewTransaction from "../pages/main/managerFinancialTransaction/create";
import UpdateTransaction from "../pages/main/managerFinancialTransaction/update";
import TransactionReport from "../pages/main/managerFinancialTransaction/report";

// MoneyTransfers
import MoneyTransfer from "../pages/main/moneyTransfer";
import NewMoneyTransfer from "../pages/main/moneyTransfer/create";
import UpdateMoneyTransfer from "../pages/main/moneyTransfer/update";
import MoneyTransferReport from "../pages/main/moneyTransfer/report";

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
        path: "/panel/aviabiletsale/view/:id",
        element: <ViewAviaticket />,
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
        path: "/panel/corperativeTicket/view/:id",
        element: <ViewCorperativeTicket />,
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
        path: "/panel/tourPackages/view/:id",
        element: <ViewTourPackage />,
      },
      {
        path: "/panel/individualTourPackages",
        element: <IndividualTourPackage />,
      },
      {
        path: "/panel/individualTourPackages/new",
        element: <NewIndividualTourPackage />,
      },
      {
        path: "/panel/individualTourPackages/update/:id",
        element: <UpdateIndividualTourPackage />,
      },
      {
        path: "/panel/individualTourPackages/view/:id",
        element: <ViewIndividualTourPackage />,
      },
      {
        path: "/panel/individualTourPackages/report",

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
        path: "/panel/Income",
        element: <Income />,
      },
      {
        path: "/panel/Income/new",
        element: <NewIncome />,
      },
      // {
      //   path: "/panel/Income/update/:id",
      //   element: <UpdateIncome />,
      // },
      {
        path: "/panel/Income/report",
        element: <InvoiceIncome />,
      },

      // ===============
      // Other services
      //================
      {
        path: "/panel/otherServices",
        element: <OtherServices />,
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
        path: "/panel/otherServices/report",
        element: <ReportOtherService />,
      },
      {
        path: "/panel/otherServices/view/:id",
        element: <ViewOtherService />,
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
      // {
      //   path: "/panel/refunds/update/:id",
      //   element: <UpdateRefund />,
      // },
      {
        path: "/panel/refunds/report",
        element: <RefundReport />,
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
        path: "/panel/getCredits",
        element: <GetCredit />,
      },
      {
        path: "/panel/getCredits/new",
        element: <NewGetCredit />,
      },
      {
        path: "/panel/getCredits/update/:id",
        element: <UpdateGetCredit />,
      },
      // {
      //   path: "/panel/getCredits/report",
      //   element: <ReportGetCredit />,
      // },
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
        path: "/panel/deposits/report",
        element: <DetailDeposit />,
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
        path: "/panel/meals",
        element: <Meal />,
      },
      {
        path: "/panel/meals/new",
        element: <NewMeal />,
      },
      {
        path: "/panel/meals/update/:id",
        element: <UpdateMeal />,
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
        path: "/panel/services",
        element: <Service />,
      },
      {
        path: "/panel/services/new",
        element: <NewService />,
      },
      {
        path: "/panel/services/update/:id",
        element: <UpdateService />,
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
        path: "/panel/fees",
        element: <Fee />,
      },
      {
        path: "/panel/fees/new",
        element: <NewFee />,
      },
      {
        path: "/panel/fees/update/:id",
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

      // Bonus
      {
        path: "/panel/bonus",
        element: <Bonus />,
      },
      {
        path: "/panel/bonus/new",
        element: <NewBonus />,
      },
      {
        path: "/panel/bonus/update/:id",
        element: <UpdateBonus />,
      },
      {
        path: "/panel/bonus/report",
        element: <BonusReport />,
      },
      // ManagerFinancialTransactions
      {
        path: "/panel/managerFinancialTransactions",
        element: <Transaction />,
      },
      {
        path: "/panel/managerFinancialTransactions/new",
        element: <NewTransaction />,
      },
      {
        path: "/panel/managerFinancialTransactions/update/:id",
        element: <UpdateTransaction />,
      },
      {
        path: "/panel/managerFinancialTransactions/report",
        element: <TransactionReport />,
      },
      // MoneyTransfers
      {
        path: "/panel/paymentTransfers",
        element: <MoneyTransfer />,
      },
      {
        path: "/panel/paymentTransfers/new",
        element: <NewMoneyTransfer />,
      },
      {
        path: "/panel/paymentTransfers/update/:id",
        element: <UpdateMoneyTransfer />,
      },
      {
        path: "/panel/paymentTransfers/report",
        element: <MoneyTransferReport />,
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
