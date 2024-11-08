import { createBrowserRouter } from "../../node_modules/react-router-dom/dist/index";
import Main from "../pages/dashboard";
import Home from "../pages/dashboard/home";

import RecieptCoorperative from "../pages/dashboard/corperativeTicket/reciept/index";
import RecieptTour from "../pages/dashboard/tourPackage/reciept/index";
import App from "../pages/main/home";
import Error from "../Error";
import Login from "../pages/authentication/login";
import Register from "../pages/authentication/register";
import Auth from "../pages/authentication";
import ChangePassword from "../pages/authentication/changePassword";
import ChangePasswordV from "../pages/dashboard/settings/password/create";
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
//Services
import Email from "../pages/dashboard/settings/email";
import NewEmail from "../pages/dashboard/settings/email/create";
import UpdateEmail from "../pages/dashboard/settings/email/update";

// Referance
import NewReferance from "../pages/dashboard/referance/newReferance";
import Referance from "../pages/dashboard/referance/index";

//Admin
import Admin from "../pages/admin";
import SoftwareAdmin from "../pages/admin/software";
import SoftwareCreate from "../pages/admin/software/create";
import SoftwareUpdate from "../pages/admin/software/update";

import FeatureAdmin from "../pages/admin/feature";
import FeatureCreate from "../pages/admin/feature/create";
import FeatureUpdate from "../pages/admin/feature/update";
//About
import AboutAdmin from "../pages/admin/about";
import AboutCreate from "../pages/admin/about/create";
import AboutUpdate from "../pages/admin/about/update";

//About
import OtherServiceSiteAdmin from "../pages/admin/otherServiceSite";
import OtherServiceSiteCreate from "../pages/admin/otherServiceSite/create";
import OtherServiceSiteUpdate from "../pages/admin/otherServiceSite/update";

//Partner
import PartnerAdmin from "../pages/admin/partner";
import PartnerCreate from "../pages/admin/partner/create";
import PartnerUpdate from "../pages/admin/partner/update";

//Faq
import QuestionAdmin from "../pages/admin/question";
import QuestionCreate from "../pages/admin/question/create";
import QuestionUpdate from "../pages/admin/question/update";

//Blog
import BlogAdmin from "../pages/admin/blog";
import BlogCreate from "../pages/admin/blog/create";
import BlogUpdate from "../pages/admin/blog/update";

//Blogs
import Blogs from "@/pages/main/blogs";
import Blog from "@/pages/main/blog";

//company
import CompanyAdmin from "../pages/admin/company";

// Company Transactions
import CompanyTransactions from "../pages/admin/company-transactions";

//company
import TransactionAdmin from "../pages/admin/transaction";
import ReferanceAdmin from "../pages/admin/referances";
import ReferanceAdminUpdate from "../pages/admin/referances/update";
//Airway
import Airway from "../pages/dashboard/settings/airway";
import NewAirway from "../pages/dashboard/settings/airway/create";
import UpdateAirway from "../pages/dashboard/settings/airway/update";

//Airway
import InvoiceText from "../pages/dashboard/settings/invoiceText";
import NewInvoiceText from "../pages/dashboard/settings/invoiceText/create";
import UpdateInvoiceText from "../pages/dashboard/settings/invoiceText/update";
//Banl
import Bank from "../pages/dashboard/settings/bank";
import NewBank from "../pages/dashboard/settings/bank/create";
import UpdateBank from "../pages/dashboard/settings/bank/update";
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
import InvoiceGetCredit from "../pages/dashboard/getCredits/report";
// PaidCredits
import PaidCredit from "../pages/dashboard/paidCredits";
import NewPaidCredit from "../pages/dashboard/paidCredits/create";
import UpdatePaidCredit from "../pages/dashboard/paidCredits/update";
import InvoicePaidCredit from "../pages/dashboard/paidCredits/report";

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
import UpdateRefund from "../pages/dashboard/refund/update";
import ShowRefund from "../pages/dashboard/refund/view";

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

import CustomerPayment from "../pages/dashboard/customerPayment";
import NewCustomerPayment from "../pages/dashboard/customerPayment/create";
import UpdateCustomerPayment from "../pages/dashboard/customerPayment/update";
import DetailCustomerPayment from "../pages/dashboard/customerPayment/report";

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
//Payments
import Payments from "../pages/dashboard/payments";
// import CreatePayment from "../pages/dashboard/payments/create";
import UpdatePay from "../pages/dashboard/payments/update";
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
import SalaryToBePaidDetailReport from "../pages/dashboard/salaryToBePaid/report";

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

// ManagerFinancialTransactionPayments
import TransactionPayment from "../pages/dashboard/managerFinancialTransactionPayment";
import NewTransactionPayment from "../pages/dashboard/managerFinancialTransactionPayment/create";
import UpdateTransactionPayment from "../pages/dashboard/managerFinancialTransactionPayment/update";
import TransactionPaymentReport from "../pages/dashboard/managerFinancialTransactionPayment/report";

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

import RefundsReportDetail from "../pages/dashboard/reports/refunds/detail";

import SalariesReportDetail from "../pages/dashboard/reports/salaries/detail";

import ExpendituresReport from "../pages/dashboard/reports/expenditure";
import ExpendituresReportDetail from "../pages/dashboard/reports/expenditure/detail";
import ExpendutureInvoice from "../pages/dashboard/payments/expendutureInvoice";
import RefundPaymentInvoice from "../pages/dashboard/payments/refundPaymentInvoice";
import SupplierPaymentInvoice from "../pages/dashboard/payments/supplierPaymentInvoice";
import AgreementDetail from "../pages/dashboard/agreement/detail/index";

import DeadlineReport from "../pages/dashboard/reports/deadline";
import FlightTicketsReport from "../pages/dashboard/reports/flightTickets";
//customer
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

import DayBookReport from "../pages/dashboard/reports/dayBook";

import NearestFlights from "../pages/dashboard/reports/nearestFlights";
import Profit from "../pages/dashboard/reports/profit";
import ProfitLoss from "../pages/dashboard/reports/profitLoss";
import CompanySettings from "../pages/dashboard/settings/company";
import Privacy from "../pages/main/privacy";
import Terms from "../pages/main/terms";
import { LeaderOnly, ManagementOnly } from "./guards";
import PaymentConfirmation from "@/pages/dashboard/confirmations/PaymentConfirmation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/az",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/en",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/ru",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/blogs/az",
    element: <Blogs />,
    errorElement: <Error />,
  },
  {
    path: "/blogs/en",
    element: <Blogs />,
    errorElement: <Error />,
  },
  {
    path: "/blogs/ru",
    element: <Blogs />,
    errorElement: <Error />,
  },
  {
    path: "/privacypoicy",
    element: <Privacy />,
    errorElement: <Error />,
  },
  {
    path: "/termsandcondition",
    element: <Terms />,
    errorElement: <Error />,
  },
  {
    path: "/blogs/:id/az",
    element: <Blog />,
    errorElement: <Error />,
  },
  {
    path: "/blogs/:id/en",
    element: <Blog />,
    errorElement: <Error />,
  },
  {
    path: "/blogs/:id/ru",
    element: <Blog />,
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
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/login/:Accept",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
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
        path: "/admin/Softwares",
        element: <SoftwareAdmin />,
      },
      {
        path: "/admin/Softwares/update/:id",
        element: <SoftwareUpdate />,
      },
      {
        path: "/admin/softwares/new",
        element: <SoftwareCreate />,
      },
      {
        path: "/admin/Features",
        element: <FeatureAdmin />,
      },
      {
        path: "/admin/Features/update/:id",
        element: <FeatureUpdate />,
      },
      {
        path: "/admin/Features/new",
        element: <FeatureCreate />,
      },

      {
        path: "/admin/Abouts",
        element: <AboutAdmin />,
      },
      {
        path: "/admin/Abouts/update/:id",
        element: <AboutUpdate />,
      },
      {
        path: "/admin/Abouts/new",
        element: <AboutCreate />,
      },
      {
        path: "/admin/OtherServiceSites",
        element: <OtherServiceSiteAdmin />,
      },
      {
        path: "/admin/OtherServiceSites/update/:id",
        element: <OtherServiceSiteUpdate />,
      },
      {
        path: "/admin/OtherServiceSites/new",
        element: <OtherServiceSiteCreate />,
      },
      {
        path: "/admin/Partners",
        element: <PartnerAdmin />,
      },
      {
        path: "/admin/Partners/update/:id",
        element: <PartnerUpdate />,
      },
      {
        path: "/admin/Partners/new",
        element: <PartnerCreate />,
      },
      {
        path: "/admin/Questions",
        element: <QuestionAdmin />,
      },
      {
        path: "/admin/Questions/update/:id",
        element: <QuestionUpdate />,
      },
      {
        path: "/admin/Questions/new",
        element: <QuestionCreate />,
      },
      {
        path: "/admin/Blogs",
        element: <BlogAdmin />,
      },
      {
        path: "/admin/Blogs/update/:id",
        element: <BlogUpdate />,
      },
      {
        path: "/admin/Blogs/new",
        element: <BlogCreate />,
      },
      {
        path: "/admin/Companys",
        element: <CompanyAdmin />,
      },
      {
        path: "/admin/companyTransactions/:id",
        element: <CompanyTransactions />,
      },
      {
        path: "/admin/Transactions",
        element: <TransactionAdmin />,
      },
      {
        path: "/admin/Referances",
        element: <ReferanceAdmin />,
      },
      {
        path: "/admin/Referances/update/:id",
        element: <ReferanceAdminUpdate />,
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
        path: "/panel/refunds/view/:id",
        element: <ShowRefund />,
      },

      {
        path: "/panel/aviabiletsale/new/reciept/:id",
        element: <Reciept />,
      },
      {
        path: "/panel/aviabiletsale/update/:id",
        element: (
          <LeaderOnly>
            <UpdateAviaticket />
          </LeaderOnly>
        ),
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
        element: (
          <LeaderOnly>
            <UpdateCorperativeTicket />
          </LeaderOnly>
        ),
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
        element: (
          <LeaderOnly>
            <UpdateTourPackage />
          </LeaderOnly>
        ),
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
        element: (
          <LeaderOnly>
            <UpdateIndividualTourPackage />
          </LeaderOnly>
        ),
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
        element: (
          <LeaderOnly>
            <UpdateAviaticket />
          </LeaderOnly>
        ),
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
        element: (
          <LeaderOnly>
            <UpdateOtherService />
          </LeaderOnly>
        ),
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
      {
        path: "/panel/refunds/update/:id",
        element: <UpdateRefund />,
      },
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
        element: (
          <ManagementOnly>
            <Customers />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/customers/new",
        element: (
          <ManagementOnly>
            <NewCustomer />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/customers/update/:id",
        element: (
          <LeaderOnly>
            <UpdateCustomer />
          </LeaderOnly>
        ),
      },
      // ===============
      // GetCredits
      //================
      {
        path: "/panel/getCredits",
        element: (
          <ManagementOnly>
            <GetCredit />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/getCredits/new",
        element: (
          <ManagementOnly>
            <NewGetCredit />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/getCredits/update/:id",
        element: (
          <LeaderOnly>
            <UpdateGetCredit />
          </LeaderOnly>
        ),
      },
      {
        path: "/panel/getCredits/report",
        element: (
          <ManagementOnly>
            <InvoiceGetCredit />
          </ManagementOnly>
        ),
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
        element: (
          <ManagementOnly>
            <PaidCredit />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/PaidCredits/new",
        element: (
          <ManagementOnly>
            <NewPaidCredit />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/PaidCredits/update/:id",
        element: (
          <LeaderOnly>
            <UpdatePaidCredit />
          </LeaderOnly>
        ),
      },
      {
        path: "/panel/PaidCredits/report",
        element: (
          <ManagementOnly>
            <InvoicePaidCredit />
          </ManagementOnly>
        ),
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
        element: (
          <LeaderOnly>
            <UpdateEmployee />
          </LeaderOnly>
        ),
      },
      // ===============
      // Airway
      //================
      {
        path: "/panel/airways",
        element: (
          <ManagementOnly>
            <Airway />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/airways/new",
        element: (
          <ManagementOnly>
            <NewAirway />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/airways/update/:id",
        element: (
          <LeaderOnly>
            <UpdateAirway />
          </LeaderOnly>
        ),
      },
      // ===============
      // Airway
      //================
      {
        path: "/panel/invoiceTexts",
        element: (
          // <ManagementOnly>
          <InvoiceText />
          // </ManagementOnly>
        ),
      },
      {
        path: "/panel/invoiceTexts/new",
        element: (
          <ManagementOnly>
            <NewInvoiceText />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/invoiceTexts/update/:id",
        element: (
          <LeaderOnly>
            <UpdateInvoiceText />
          </LeaderOnly>
        ),
      },

      // ===============
      // Bank
      //================
      {
        path: "/panel/banks",
        element: (
          <ManagementOnly>
            <Bank />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/banks/new",
        element: (
          <ManagementOnly>
            <NewBank />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/banks/update/:id",
        element: (
          <LeaderOnly>
            <UpdateBank />
          </LeaderOnly>
        ),
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
        element: (
          <LeaderOnly>
            <UpdateDeposit />
          </LeaderOnly>
        ),
      },
      {
        path: "/panel/deposit/report",
        element: <DetailDeposit />,
      },
      // ===============
      // CustomerPayment
      //================
      {
        path: "/panel/CustomerPayments",
        element: <CustomerPayment />,
      },
      {
        path: "/panel/customerPayments/new",
        element: <NewCustomerPayment />,
      },
      {
        path: "/panel/CustomerPayments/update/:id",
        element: (
          <LeaderOnly>
            <UpdateCustomerPayment />
          </LeaderOnly>
        ),
      },
      {
        path: "/panel/CustomerPayments/report",
        element: <DetailCustomerPayment />,
      },

      // ===============
      // Suplier
      //================
      {
        path: "/panel/suppliers",
        element: (
          <ManagementOnly>
            <Supplier />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/suppliers/new",
        element: (
          <ManagementOnly>
            <NewSupplier />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/suppliers/update/:id",
        element: (
          <LeaderOnly>
            <UpdateSupplier />
          </LeaderOnly>
        ),
      },
      // ===============
      // Personal
      //================
      {
        path: "/panel/personals",
        element: (
          <ManagementOnly>
            <Personal />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/personals/new",
        element: (
          <ManagementOnly>
            <NewPersonal />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/personals/update/:id",
        element: (
          <LeaderOnly>
            <UpdatePersonal />
          </LeaderOnly>
        ),
      },
      // ===============
      // Payments
      //================
      {
        path: "/panel/payment",
        element: (
          <ManagementOnly>
            <Payment />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/payment/new",
        element: (
          <ManagementOnly>
            <NewPayment />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/payment/update/:id",
        element: (
          <LeaderOnly>
            <UpdatePayment />
          </LeaderOnly>
        ),
      },

      // ===============
      // Transfers
      //================
      {
        path: "/panel/transfers",
        element: (
          <ManagementOnly>
            <Transfer />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/transfers/new",
        element: (
          <ManagementOnly>
            <NewTranfser />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/transfers/update/:id",
        element: (
          <LeaderOnly>
            <UpdateTransfer />
          </LeaderOnly>
        ),
      },

      // ===============
      // Dinings
      //================
      {
        path: "/panel/meals",
        element: (
          <ManagementOnly>
            <Meal />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/meals/new",
        element: (
          <ManagementOnly>
            <NewMeal />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/meals/update/:id",
        element: (
          <LeaderOnly>
            <UpdateMeal />
          </LeaderOnly>
        ),
      },
      //=================
      // Tours
      //=================
      {
        path: "/panel/tours",
        element: (
          <ManagementOnly>
            <Tour />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/tours/new",
        element: (
          <ManagementOnly>
            <NewTour />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/tours/update/:id",
        element: (
          <LeaderOnly>
            <UpdateTour />
          </LeaderOnly>
        ),
      },
      //=================
      // Service Managers
      //=================
      {
        path: "/panel/services",
        element: (
          <ManagementOnly>
            <Service />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/services/new",
        element: (
          <ManagementOnly>
            <NewService />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/services/update/:id",
        element: (
          <LeaderOnly>
            <UpdateService />
          </LeaderOnly>
        ),
      },

      //=================
      // Email
      //=================
      {
        path: "/panel/email",
        element: (
          <ManagementOnly>
            <Email />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/email/new",
        element: (
          <ManagementOnly>
            <NewEmail />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/email/update/:id",
        element: (
          <LeaderOnly>
            <UpdateEmail />
          </LeaderOnly>
        ),
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
        element: (
          <LeaderOnly>
            <UpdateAgreement />
          </LeaderOnly>
        ),
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
        element: (
          <LeaderOnly>
            <UpdateAgreementFormat />
          </LeaderOnly>
        ),
      },

      //=================
      // WillBePaid
      //=================
      {
        path: "/panel/reports/willbepaid",
        element: (
          <ManagementOnly>
            <WillBePaid />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/willbepaid/new",
        element: (
          <ManagementOnly>
            <NewWillBePaid />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/expenditures/new",
        element: (
          <NewWillBePaid />
        ),
      },


      {
        path: "/panel/reports/willbepaid/update/:id",
        element: (
          <LeaderOnly>
            <UpdateWillBePaid />
          </LeaderOnly>
        ),
      },
      {
        path: "/panel/reports/willbepaid/detail/:id",
        element: (
          <ManagementOnly>
            <DetailWillBePaid />
          </ManagementOnly>
        ),
      },

      //=================
      // WillBePaid
      //=================
      {
        path: "/panel/payments",
        element:
          <LeaderOnly>
            <Payments />
          </LeaderOnly>
        ,
      },
      // {
      //   path: "/panel/payments/new",
      //   element: <CreatePayment />,
      // },
      {
        path: "/panel/payments/update/:id",
        element: (
          <LeaderOnly>
            <UpdatePay />
          </LeaderOnly>
        ),
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
        element: (
          <ManagementOnly>
            <Fee />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/fees/new",
        element: (
          <ManagementOnly>
            <NewFee />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/fees/update/:id",
        element: (
          <LeaderOnly>
            <UpdateFee />
          </LeaderOnly>
        ),
      },
      {
        path: "/panel/salaryToBePaid",
        element: (
          <ManagementOnly>
            <SalaryToBePaid />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/salaryToBePaid/report",
        element: (
          <ManagementOnly>
            <SalaryToBePaidDetailReport />
          </ManagementOnly>
        ),
      },

      {
        path: "/panel/salaryToBePaid/new",
        element: (
          <ManagementOnly>
            <NewSalaryToBePaid />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/salaryToBepaid/update/:id",
        element: (
          <LeaderOnly>
            <UpdateSalaryToBePaid />
          </LeaderOnly>
        ),
      },
      {
        path: "/panel/payments/report/:id",
        element:

          <PaymentDetailReport />,
      },

      // Bonus
      {

        path: "/panel/bonus",
        element:
          <LeaderOnly>
            <Bonus />,
          </LeaderOnly>
      },
      {
        path: "/panel/bonus/new",
        element:
          <LeaderOnly>
            <NewBonus />,
          </LeaderOnly>
      },
      {
        path: "/panel/bonus/update/:id",
        element: (
          <LeaderOnly>
            <UpdateBonus />
          </LeaderOnly>
        ),
      },
      {
        path: "/panel/bonus/report",
        element: <BonusReport />,
      },
      // ManagerFinancialTransactions
      {
        path: "/panel/managerFinancialTransactions",
        element: (
          <ManagementOnly>
            <Transaction />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/managerFinancialTransactions/new",
        element: (
          <ManagementOnly>
            <NewTransaction />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/managerFinancialTransactions/update/:id",
        element: (
          <LeaderOnly>
            <UpdateTransaction />
          </LeaderOnly>
        ),
      },
      {
        path: "/panel/managerFinancialTransactions/report",
        element: (
          <ManagementOnly>
            <TransactionReport />
          </ManagementOnly>
        ),
      },
      // ManagerFinancialTransactionPayments
      {
        path: "/panel/managerFinancialTransactionPayments",
        element: (
          <ManagementOnly>
            <TransactionPayment />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/managerFinancialTransactionPayments/new",
        element: (
          <ManagementOnly>
            <NewTransactionPayment />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/managerFinancialTransactionPayments/update/:id",
        element: (
          <LeaderOnly>
            <UpdateTransactionPayment />
          </LeaderOnly>
        ),
      },
      {
        path: "/panel/managerFinancialTransactionPayments/report",
        element: (
          <ManagementOnly>
            <TransactionPaymentReport />
          </ManagementOnly>
        ),
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
        element: (
          <LeaderOnly>
            <UpdateMoneyTransfer />
          </LeaderOnly>
        ),
      },
      {
        path: "/panel/paymentTransfers/report",
        element: <MoneyTransferReport />,
      },

      {
        path: "/panel/agreementFormats",
        element: (
          <ManagementOnly>
            <AgreementFormat />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/agreementFormats/new",
        element: (
          <ManagementOnly>
            <NewAgreementFormat />
          </ManagementOnly>
        ),
      },

      //reports
      {
        path: "/panel/reports/suppliers",
        element: (
          <ManagementOnly>
            <SuppliersReport />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/suppliers/:id",
        element: (
          <ManagementOnly>
            <SuppliersReportDetail />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/refunds/:id",
        element: (
          <ManagementOnly>
            <RefundsReportDetail />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/salaries/:id",
        element: (
          <ManagementOnly>
            <SalariesReportDetail />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/expenditures",
        element: (
          <ExpendituresReport />
        ),
      },
      {
        path: "/panel/reports/expenditures/:id",
        element: (
          <ManagementOnly>
            <ExpendituresReportDetail />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/invoices/expenditures/:id",
        element: <ExpendutureInvoice />,
      },
      {
        path: "/panel/invoices/refundpayments/:id",
        element: <RefundPaymentInvoice />,
      },
      {
        path: "/panel/invoices/supplierpayemnts/:id",
        element: <SupplierPaymentInvoice />,
      },
      {
        path: "/panel/agreements/conractdetail/:id",
        element: <AgreementDetail />,
      },


      {
        path: "/panel/reports/deadlines",
        element: (
          // <ManagementOnly>
          <DeadlineReport />
          // </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/flightTickets",
        element: (
          <ManagementOnly>
            <FlightTicketsReport />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/customers",
        element: (
          <ManagementOnly>
            <CustomersReport />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/customers/:id",
        element: (
          <ManagementOnly>
            <CustomersReportDetail />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/profits",
        element: (
          <ManagementOnly>
            <ProfitsReport />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/profits/:id",
        element: (
          <ManagementOnly>
            <ProfitsReportDetail />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/finaceStatus",
        element: (
          <ManagementOnly>
            <FinancesReport />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/paymentTypes",
        element: (
          <ManagementOnly>
            <PaymentsReport />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/paymentTypes/:id",
        element: (
          <ManagementOnly>
            <PaymentReportDetail />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/customerprofit",
        element: (
          <ManagementOnly>
            <CustomerProfitsReport />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/customerprofit/:id",
        element: (
          <ManagementOnly>
            <CustomerProfitsDetail />
          </ManagementOnly>
        ),
      },

      {
        path: "/panel/reports/personals",
        element: (
          <ManagementOnly>
            <PersonalsReport />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/personals/:id",
        element: (
          <ManagementOnly>
            <PersonalsDetail />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/nearestFlights",
        element: (
          // <ManagementOnly>
          <NearestFlights />
          // </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/profit",
        element: (
          <ManagementOnly>
            <Profit />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/profitLoss",
        element: (
          <ManagementOnly>
            <ProfitLoss />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/reports/dayBook",
        element: (
          <ManagementOnly>
            <DayBookReport />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/company",
        element: (
          <ManagementOnly>
            <CompanySettings />
          </ManagementOnly>
        ),
      },
      {
        path: "/panel/ChangePasswordV",
        element: (
          // <ManagementOnly>
          <ChangePasswordV />
          // </ManagementOnly>
        ),
      },
      {
        path: "/panel/company/paymentConfirmation/:id",
        element: (
          <ManagementOnly>
            <PaymentConfirmation />
          </ManagementOnly>
        ),
      }

    ],
  },
]);

export default router;
