import { SidebarItemType } from "../../components/layout/main/components/sidebar/types";

// Icons Import
import {
  BsHouseDoor,
  BsTicket,
  BsCalculator,
  BsTicketDetailed,
  BsFillPeopleFill,
  BsFileEarmarkPerson,
} from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiSolidPlaneAlt, BiWalletAlt } from "react-icons/bi";
import { MdOutlineAirplaneTicket, MdOutlinePersonPin } from "react-icons/md";
import {
  HiOutlineTicket,
  HiOutlineDotsCircleHorizontal,
  HiDownload,
} from "react-icons/hi";
import {
  FaArrowsLeftRightToLine,
  FaPeopleGroup,
  FaMoneyBill1Wave,
  FaTrailer,
  FaServicestack,
} from "react-icons/fa6";
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineArrowsUpDown,
} from "react-icons/hi2";
import { FaMoneyBillWave, FaExchangeAlt, FaFileImport } from "react-icons/fa";
import { LuDivideCircle } from "react-icons/lu";
import { PiWalletLight, PiHandshake } from "react-icons/pi";
import { AiFillMail, AiOutlineFolderOpen } from "react-icons/ai";
import { IoFastFood, IoSettingsOutline } from "react-icons/io5";

export const sidebarItems: SidebarItemType[] = [
  {
    icon: BsHouseDoor,
    text: "Ana Səhifə",
    link: "/panel",
  },
  {
    icon: MdOutlineAirplaneTicket,
    text: "Invoice",
    children: [
      {
        icon: MdOutlineAirplaneTicket,
        text: "Aviabilet satışı",
        link: "/panel/aviabiletsale",
      },
      {
        icon: BsTicketDetailed,
        text: "Korperativ satış",
        link: "/panel/cooperativeTicket",
      },
      {
        icon: HiOutlineTicket,
        text: "Tur paket satışı",
        link: "/panel/tourPackage",
      },
      {
        icon: BsTicket,
        text: "İndividual tur satışı",
        link: "/panel/individualTourPackage",
      },
      {
        icon: HiOutlineDotsCircleHorizontal,
        text: "Digər xidmətlər",
        link: "/panel/otherService",
      },
    ],
  },

  {
    icon: HiDownload,
    text: "Mədaxil",

    children: [
      {
        icon: FaServicestack,
        text: "Invoice",
        link: "/panel/income",
      },
      {
        icon: FaServicestack,
        text: "Deposit",
        link: "/panel/deposit",
      },
      {
        icon: FaServicestack,
        text: "Customer Receipt",
        link: "/panel/CustomerPayments",
      },
      {
        icon: FaServicestack,
        text: "Bonus",
        link: "/panel/bonus",
        onlyManagement: true,
      },
    ],
  },
  {
    icon: FaArrowsLeftRightToLine,
    text: "From/To Founder",
    onlyManagement: true,
    children: [
      {
        icon: FaArrowsLeftRightToLine,
        text: "Təsisçidən təsisçiyə",
        link: "/panel/managerFinancialTransactions",
      },
      {
        icon: FaFileImport,
        text: "Debt Payment",
        link: "/panel/managerFinancialTransactionPayments",
      },
    ],
  },
  {
    icon: LuDivideCircle,
    text: "Kreditlər/Borclar",
    onlyManagement: true,
    children: [
      {
        icon: PiWalletLight,
        text: "Alınan Kredit",
        link: "/panel/getCredits",
      },
      {
        icon: BiWalletAlt,
        text: "Ödənilən Kredit",
        link: "/panel/paidCredits",
      },
    ],
  },
  {
    icon: FaMoneyBillWave,
    text: "Transactions", //Todo: Translate
    children: [
      {
        icon: HiOutlineArrowPathRoundedSquare,
        text: "Vəsait transferi",
        link: "/panel/paymentTransfers",
      },

      {
        icon: FaMoneyBillWave,
        text: "Ödənişlər",
        link: "/panel/payments",
        onlyManagement: true,
      },

      {
        icon: HiOutlineArrowsUpDown,
        text: "Geri qaytarmalar",
        link: "/panel/refunds",
      },
      {
        icon: FaServicestack,
        text: "Fees",
        link: "/panel/reports/expenditures",
      },
    ],
  },

  {
    icon: PiHandshake,
    text: "İnsan resursları",
    onlyManagement: true,
    children: [
      {
        icon: PiHandshake,
        text: "İşçilər",
        link: "/panel/personals",
      },
      {
        icon: PiHandshake,
        text: "Maaş Ödə",
        link: "/panel/salaryToBePaid",
      },
    ],
  },
  {
    icon: AiOutlineFolderOpen,
    text: "Müqavilə",
    link: "/panel/agreements",
  },
  {
    icon: MdOutlinePersonPin,
    text: "Referance",
    link: "/panel/referances",
  },
  {
    icon: BsCalculator,
    text: "Hesabatlar",
    onlyManagement: false,
    children: [
      {
        icon: FaMoneyBillWave,
        text: "Ödəniləcək",
        link: "/panel/reports/willbepaid",
        onlyManagement: true,
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Reciveables",
        link: "/panel/reports/customers",
        onlyManagement: true,
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Profits",
        link: "/panel/reports/profits",
        onlyManagement: true,
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Profit Loss",
        link: "/panel/reports/profitLoss",
        onlyManagement: true,
      },
      {
        icon: FaMoneyBill1Wave,
        text: "Financal Status",
        link: "/panel/reports/finaceStatus",
        onlyManagement: true,
      },
      {
        icon: FaMoneyBill1Wave,
        text: "Payment Types",
        link: "/panel/reports/paymentTypes",
        onlyManagement: true,
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Təchizatçı",
        link: "/panel/reports/suppliers",
        onlyManagement: true,
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Deadline",
        link: "/panel/reports/deadLines",
        onlyManagement: false,
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Flight Tickets",
        link: "/panel/reports/flightTickets",
        onlyManagement: true,
      },

      {
        icon: BsFillPeopleFill,
        text: "Müştəri",
        link: "/panel/reports/customerprofit",
        onlyManagement: true,
      },
      {
        icon: FaPeopleGroup,
        text: "Personal",
        link: "/panel/reports/personals",
        onlyManagement: true,
      },
      {
        icon: MdOutlineAirplaneTicket,
        text: "Yaxın uçuşlar",
        link: "/panel/reports/nearestFlights",
        onlyManagement: false,
      },

      {
        icon: FaServicestack,
        text: "Fees",
        link: "/panel/reports/expenditures",
        onlyManagement: true,
      },
      {
        icon: FaMoneyBill1Wave,
        text: "Day Book Report",
        link: "/panel/reports/dayBook",
        onlyManagement: true,
      },
    ],
  },

  {
    icon: AiFillMail,
    text: "Email",
    link: "/panel/email/send",
  },
  {
    icon: FaFileImport,
    text: "Sənədlər",
    children: [
      {
        icon: FaFileImport,
        text: "Bütün Sənədlər",
        link: "/panel/documents",
      },
      {
        icon: FaFileImport,
        text: "Göndər",
        link: "/panel/documents/send",
      },
    ],
  },
  {
    icon: IoSettingsOutline,
    text: "Sazlamalar",
    onlyManagement: false,
    children: [
      {
        icon: BsFillPeopleFill,
        text: "Müştərilər",
        link: "/panel/customers",
        onlyManagement: true,
      },
      {
        icon: BiSolidPlaneAlt,
        text: "Hava yolları",
        link: "/panel/airways",
        onlyManagement: true,
      },
      {
        icon: BiSolidPlaneAlt,
        text: "Bank",
        link: "/panel/banks",
        onlyManagement: true,
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Təchizatçı",
        link: "/panel/suppliers",
        onlyManagement: true,
      },
      // {
      //   icon: FaPeopleGroup,
      //   text: "Personal",
      //   link: "/panel/personals",
      // },
      {
        icon: FaMoneyBill1Wave,
        text: "Payment Types",
        link: "/panel/payment",
        onlyManagement: true,
      },
      {
        icon: FaExchangeAlt,
        text: "Transferlər",
        link: "/panel/transfers",
        onlyManagement: true,
      },
      {
        icon: IoFastFood,
        text: "Qidalanma",
        link: "/panel/meals",
        onlyManagement: true,
      },
      {
        icon: FaTrailer,
        text: "Tours",
        link: "/panel/tours",
        onlyManagement: true,
      },
      {
        icon: FaServicestack,
        text: "Services",
        link: "/panel/services",
        onlyManagement: true,
      },
      {
        icon: FaServicestack,
        text: "Fees",
        link: "/panel/fees",
        onlyManagement: true,
      },
      {
        icon: FaServicestack,
        text: "Müqavilə formatı",
        link: "/panel/agreementFormats",
        onlyManagement: true,
      },
      // {
      //   icon: FaServicestack,
      //   text: "Valyuta",
      //   link: "/panel/agreementFormats",
      // },
      {
        icon: FaServicestack,
        text: "Invoice Texts",
        link: "/panel/invoiceTexts",
        onlyManagement: false,
      },
      {
        icon: FaServicestack,
        text: "Company",
        link: "/panel/company",
        onlyManagement: true,
      },
      {
        icon: FaServicestack,
        text: "Email",
        link: "/panel/email",
        onlyManagement: true,
      }
    ],
  },
  {
    icon: RiLockPasswordLine,
    text: "Change Password",
    link: "/panel/ChangePasswordV",
  }


];
