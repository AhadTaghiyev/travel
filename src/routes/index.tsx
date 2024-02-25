import { createBrowserRouter } from "../../node_modules/react-router-dom/dist/index";
import Main from "../pages/dashboard";
import Home from "../pages/dashboard/home";

import RecieptCoorperative from "../pages/dashboard/corperativeTicket/reciept/index";
import RecieptTour from "../pages/dashboard/tourPackage/reciept/index";
import App from "../pages/main/home";
import Error from "../Error";
import Login from "../pages/authentication/login";
import Auth from "../pages/authentication";
import ChangePassword from "../pages/authentication/changePassword";
import Unauth from "../Unauth";

// Aviabilet Sales
import AviabiletSale from "../pages/dashboard/aviabiletSale";
import Reciept from "../pages/dashboard/aviabiletSale/reciept";
import ViewAviaticket from "../pages/dashboard/aviabiletSale/view";
import NewAviaticket from "../pages/dashboard/aviabiletSale/create";
import UpdateAviaticket from "../pages/dashboard/aviabiletSale/update";
import ReportAviaticket from "../pages/dashboard/aviabiletSale/report";

// Customers
import Customers from "../pages/dashboard/settings/customer";
import NewCustomer from "../pages/dashboard/settings/customer/create";
import UpdateCustomer from "../pages/dashboard/settings/customer/update";

// Suppliers
import Supplier from "../pages/dashboard/settings/supplier";
import NewSupplier from "../pages/dashboard/settings/supplier/create";
import UpdateSupplier from "../pages/dashboard/settings/supplier/update";

// Personals
import Personal from "../pages/dashboard/settings/personal";
import NewPersonal from "../pages/dashboard/settings/personal/create";
import UpdatePersonal from "../pages/dashboard/settings/personal/update";

// Payments
import Payment from "../pages/dashboard/settings/payment";
import NewPayment from "../pages/dashboard/settings/payment/create";
import UpdatePayment from "../pages/dashboard/settings/payment/update";

//Transfer
import Transfer from "../pages/dashboard/settings/transfer";
import NewTranfser from "../pages/dashboard/settings/transfer/create";
import UpdateTransfer from "../pages/dashboard/settings/transfer/update";
// Meal
import Meal from "../pages/dashboard/settings/meal";
import NewMeal from "../pages/dashboard/settings/meal/create";
import UpdateMeal from "../pages/dashboard/settings/meal/update";
//Tour
import Tour from "../pages/dashboard/settings/tour";
import NewTour from "../pages/dashboard/settings/tour/create";
import UpdateTour from "../pages/dashboard/settings/tour/update";
//Services
import Service from "../pages/dashboard/settings/service";
import NewService from "../pages/dashboard/settings/service/create";
import UpdateService from "../pages/dashboard/settings/service/update";

// Referance
import NewReferance from "../pages/dashboard/referance/newReferance";
import Referance from "../pages/dashboard/referance/index";

//Admin
import Admin from "../pages/admin";
import CompanyAdmin from "../pages/admin/company";
import CompanyCreate from "../pages/admin/company/createCompany";
import CompanyUpdate from "../pages/admin/company/updateCompany";

//Airway
import Airway from "../pages/dashboard/settings/airway";
import NewAirway from "../pages/dashboard/settings/airway/create";
import UpdateAirway from "../pages/dashboard/settings/airway/update";

//Korperativ bilet
import CorperativeTicket from "../pages/dashboard/corperativeTicket";
import NewCorperativeTicket from "../pages/dashboard/corperativeTicket/create";
import UpdateCorperativeTicket from "../pages/dashboard/corperativeTicket/update";
import ViewCorperativeTicket from "../pages/dashboard/corperativeTicket/view";
import ReportCorperativeTicket from "../pages/dashboard/corperativeTicket/report";
// GetCredits
import GetCredit from "../pages/dashboard/getCredits";
import NewGetCredit from "../pages/dashboard/getCredits/create";
import UpdateGetCredit from "../pages/dashboard/getCredits/update";

// PaidCredits
import PaidCredit from "../pages/dashboard/paidCredits";
import NewPaidCredit from "../pages/dashboard/paidCredits/create";
import UpdatePaidCredit from "../pages/dashboard/paidCredits/update";

//Tur Paketleri
import TourPackage from "../pages/dashboard/tourPackage";
import NewTourPackage from "../pages/dashboard/tourPackage/create";
import UpdateTourPackage from "../pages/dashboard/tourPackage/update";
import ViewTourPackage from "../pages/dashboard/tourPackage/view";
import TourReport from "../pages/dashboard/tourPackage/report";

//Income
import Income from "../pages/dashboard/income";
import NewIncome from "../pages/dashboard/income/create";
// import UpdateIncome from "../pages/main/income/updateIncome";
import InvoiceIncome from "../pages/dashboard/income/report";

// Refunds
import Refund from "../pages/dashboard/refund";
import NewRefund from "../pages/dashboard/refund/create";
// import UpdateIncome from "../pages/main/refund/update";
import RefundReport from "../pages/dashboard/refund/report";

// Other Services
import OtherServices from "../pages/dashboard/otherServices";
import NewOtherService from "../pages/dashboard/otherServices/create";
import UpdateOtherService from "../pages/dashboard/otherServices/update";
import ViewOtherService from "../pages/dashboard/otherServices/view";
import ReportOtherService from "../pages/dashboard/otherServices/report";

// Employees
import Employee from "../pages/dashboard/employee";
import NewEmployee from "../pages/dashboard/employee/create";
import UpdateEmployee from "../pages/dashboard/employee/update";
// Deposits
import Deposit from "../pages/dashboard/deposit";
import NewDeposit from "../pages/dashboard/deposit/create";
import UpdateDeposit from "../pages/dashboard/deposit/update";
import DetailDeposit from "../pages/dashboard/deposit/report";
//Individual Tur Paketleri
import IndividualTourPackage from "../pages/dashboard/individualTourPackage";
import NewIndividualTourPackage from "../pages/dashboard/individualTourPackage/create";
import UpdateIndividualTourPackage from "../pages/dashboard/individualTourPackage/update";
import ViewIndividualTourPackage from "../pages/dashboard/individualTourPackage/view";
import ReportIndividualTourPackage from "../pages/dashboard/individualTourPackage/report";

//agreements
import Agreements from "../pages/dashboard/agreement";
import NewAgreement from "../pages/dashboard/agreement/newAgreement";
import UpdateAgreement from "../pages/dashboard/agreement/updateAgreement";

//willBePaid
import WillBePaid from "../pages/dashboard/willBePaid";
import NewWillBePaid from "../pages/dashboard/willBePaid/create";
import UpdateWillBePaid from "../pages/dashboard/willBePaid/update";
import DetailWillBePaid from "../pages/dashboard/willBePaid/report";

//documents
import DocumentCreate from "../pages/dashboard/document/sendDocument";
import DocumentsList from "../pages/dashboard/document/documentsList";

//email
import EmailSend from "../pages/dashboard/email";

//willBeGet
import WillBeGet from "../pages/dashboard/willBeGet";
import WillBeGetDetail from "../pages/dashboard/willBeGet/detail";
import GetPaymentDetail from "../pages/dashboard/paymenDetailReport/detail";
import ReportCredit from "../pages/dashboard/reportCredit";
import DailyInvoice from "../pages/dashboard/dailyInvoice";
import TotalInvoiceRevenue from "../pages/dashboard/totalInvoiceRevenue";
import CustomerDeposits from "../pages/dashboard/customerDeposits";
import TotalStatus from "../pages/dashboard/totalStatus";
import PaidSalary from "../pages/dashboard/paidSalary";

import Fee from "../pages/dashboard/settings/fee";
import NewFee from "../pages/dashboard/settings/fee/create";
import UpdateFee from "../pages/dashboard/settings/fee/update";

// SalaryToBePaid
import SalaryToBePaid from "../pages/dashboard/salaryToBePaid";
import NewSalaryToBePaid from "../pages/dashboard/salaryToBePaid/create";
import UpdateSalaryToBePaid from "../pages/dashboard/salaryToBePaid/update";

import PaymentDetailReport from "../pages/dashboard/paymenDetailReport/detail";

// Bonus
import Bonus from "../pages/dashboard/bonus";
import NewBonus from "../pages/dashboard/bonus/create";
import UpdateBonus from "../pages/dashboard/bonus/update";
import BonusReport from "../pages/dashboard/bonus/report";

// ManagerFinancialTransactions
import Transaction from "../pages/dashboard/managerFinancialTransaction";
import NewTransaction from "../pages/dashboard/managerFinancialTransaction/create";
import UpdateTransaction from "../pages/dashboard/managerFinancialTransaction/update";
import TransactionReport from "../pages/dashboard/managerFinancialTransaction/report";

// MoneyTransfers
import MoneyTransfer from "../pages/dashboard/moneyTransfer";
import NewMoneyTransfer from "../pages/dashboard/moneyTransfer/create";
import UpdateMoneyTransfer from "../pages/dashboard/moneyTransfer/update";
import MoneyTransferReport from "../pages/dashboard/moneyTransfer/report";

import AgreementFormat from "../pages/dashboard/settings/agreementFormat";
import NewAgreementFormat from "../pages/dashboard/settings/agreementFormat/new";
import UpdateAgreementFormat from "../pages/dashboard/settings/agreementFormat/updateAgreement";

//reports
import SuppliersReport from "../pages/dashboard/reports/suppliers";
import SuppliersReportDetail from "../pages/dashboard/reports/suppliers/detail";
import CustomersReport from "../pages/dashboard/reports/customers";
import CustomersReportDetail from "../pages/dashboard/reports/customers/detail";

import ProfitsReport from "../pages/dashboard/reports/profits";
import ProfitsReportDetail from "../pages/dashboard/reports/profits/detail";
import FinancesReport from "../pages/dashboard/reports/financal";
import PaymentsReport from "../pages/dashboard/reports/paymentTypes";
import PaymentReportDetail from "../pages/dashboard/reports/paymentTypes/detail";

import CustomerProfitsReport from "../pages/dashboard/reports/customersProfit";
import CustomerProfitsDetail from "../pages/dashboard/reports/customersProfit/detail";

import PersonalsReport from "../pages/dashboard/reports/personal";
import PersonalsDetail from "../pages/dashboard/reports/personal/detail";

import NearestFlights from "../pages/dashboard/reports/nearestFlights";

// import PlaneTicketReport from "../pages/main/reports/planeTickets";
// import CorporateReport from "../pages/main/reports/corporate";
// import TourPackageReport from "../pages/main/reports/tourPackage";
// import IndividualTourPackageReport from "../pages/main/reports/individualTourPackage";
// import OtherServiceReport from "../pages/main/reports/otherServices";
// import MasIncomeReport from "../pages/main/reports/masincome";
// import WillBePaidReport from "../pages/main/reports/willbepaids";
// import DebtReport from "../pages/main/reports/debt";
// import GetCreditReport from "../pages/main/reports/getcredit";
// import PaidCreditReport from "../pages/main/reports/paidcredit";
// import PaidSalaryReport from "../pages/main/reports/paidsalary";
// import CustomerReport from "../pages/main/reports/customers";
// import CustomerReportDetail from "../pages/main/reports/customers/customerReport";
// import PersonalReport from "../pages/main/reports/personal";
// import PersonalReportDetail from "../pages/main/reports/personal/personalReport";
// import FeeReports from "../pages/main/reports/fees";
// import FeeReportsDetails from "../pages/main/reports/fees/details";
// import NearestFlightReport from "../pages/main/reports/nearestFlights";

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
        path: "/panel/cooperativeTicket",
        element: <CorperativeTicket />,
      },
      {
        path: "/panel/cooperativeTicket/new",
        element: <NewCorperativeTicket />,
      },
      {
        path: "/panel/cooperativeTicket/new/reciept/:id",
        element: <RecieptCoorperative />,
      },

      {
        path: "/panel/cooperativeTicket/update/:id",
        element: <UpdateCorperativeTicket />,
      },
      {
        path: "/panel/cooperativeTicket/view/:id",
        element: <ViewCorperativeTicket />,
      },
      {
        path: "/panel/cooperativeTicket/report",
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
        path: "/panel/tourPackage",
        element: <TourPackage />,
      },
      {
        path: "/panel/tourPackage/new",
        element: <NewTourPackage />,
      },

      {
        path: "/panel/tourPackage/update/:id",
        element: <UpdateTourPackage />,
      },
      {
        path: "/panel/tourPackage/view/:id",
        element: <ViewTourPackage />,
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
        path: "/panel/individualTourPackage/view/:id",
        element: <ViewIndividualTourPackage />,
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
        path: "/panel/tourPackage/new/reciept/:id",
        element: <RecieptTour />,
      },
      {
        path: "/panel/tourPackage/update/:id",
        element: <UpdateAviaticket />,
      },
      {
        path: "/panel/tourPackage/report",
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
        path: "/panel/otherService",
        element: <OtherServices />,
      },
      {
        path: "/panel/otherService/new",
        element: <NewOtherService />,
      },

      {
        path: "/panel/otherService/update/:id",
        element: <UpdateOtherService />,
      },
      {
        path: "/panel/otherService/report",
        element: <ReportOtherService />,
      },
      {
        path: "/panel/otherService/view/:id",
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
        path: "/panel/otherService",
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
        path: "/panel/deposit",
        element: <Deposit />,
      },
      {
        path: "/panel/deposit/new",
        element: <NewDeposit />,
      },
      {
        path: "/panel/deposit/update/:id",
        element: <UpdateDeposit />,
      },
      {
        path: "/panel/deposit/report",
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
        path: "/panel/reports/suppliers",
        element: <SuppliersReport />,
      },
      {
        path: "/panel/reports/suppliers/:id",
        element: <SuppliersReportDetail />,
      },
      {
        path: "/panel/reports/customers",
        element: <CustomersReport />,
      },
      {
        path: "/panel/reports/customers/:id",
        element: <CustomersReportDetail />,
      },
      {
        path: "/panel/reports/profits",
        element: <ProfitsReport />,
      },
      {
        path: "/panel/reports/profits/:id",
        element: <ProfitsReportDetail />,
      },
      {
        path: "/panel/reports/finaceStatus",
        element: <FinancesReport />,
      },
      {
        path: "/panel/reports/paymentTypes",
        element: <PaymentsReport />,
      },
      {
        path: "/panel/reports/paymentTypes/:id",
        element: <PaymentReportDetail />,
      },
      {
        path: "/panel/reports/customerprofit",
        element: <CustomerProfitsReport />,
      },
      {
        path: "/panel/reports/customerprofit/:id",
        element: <CustomerProfitsDetail />,
      },

      {
        path: "/panel/reports/personals",
        element: <PersonalsReport />,
      },
      {
        path: "/panel/reports/personals/:id",
        element: <PersonalsDetail />,
      },
      {
        path: "/panel/reports/nearestFlights",
        element: <NearestFlights />,
      },
      


      
      // {
      //   path: "/panel/reports/planeTicket",
      //   element: <PlaneTicketReport />,
      // },
      // {
      //   path: "/panel/reports/corperative",
      //   element: <CorporateReport />,
      // },
      // {
      //   path: "/panel/reports/tourPackage",
      //   element: <TourPackageReport />,
      // },
      // {
      //   path: "/panel/reports/individualTourPackage",
      //   element: <IndividualTourPackageReport />,
      // },
      // {
      //   path: "/panel/reports/otherServices",
      //   element: <OtherServiceReport />,
      // },
      // {
      //   path: "/panel/reports/masincome",
      //   element: <MasIncomeReport />,
      // },
      // {
      //   path: "/panel/reports/willbepaids",
      //   element: <WillBePaidReport />,
      // },
      // {
      //   path: "/panel/reports/debt",
      //   element: <DebtReport />,
      // },
      // {
      //   path: "/panel/reports/getcredit",
      //   element: <GetCreditReport />,
      // },
      // {
      //   path: "/panel/reports/paidcredit",
      //   element: <PaidCreditReport />,
      // },
      // {
      //   path: "/panel/reports/paidsalary",
      //   element: <PaidSalaryReport />,
      // },
      // {
      //   path: "/panel/reports/customer",
      //   element: <CustomerReport />,
      // },

      // {
      //   path: "/panel/reports/customer/:id",
      //   element: <CustomerReportDetail />,
      // },
      // {
      //   path: "/panel/reports/personal",
      //   element: <PersonalReport />,
      // },
      // {
      //   path: "/panel/reports/personal/:id",
      //   element: <PersonalReportDetail />,
      // },
      // {
      //   path: "/panel/reports/fee",
      //   element: <FeeReports />,
      // },
      // {
      //   path: "/panel/reports/feeDetails/:id",
      //   element: <FeeReportsDetails />,
      // },
      // {
      //   path: "/panel/reports/nearestFlights",
      //   element: <NearestFlightReport />,
      // },
    ],
  },
  {
    path: "admin",
    children: [],
  },
]);

export default router;
