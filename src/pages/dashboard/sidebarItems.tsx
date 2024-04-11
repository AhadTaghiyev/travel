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
        text: "Advance Receipt",
        link: "/panel/deposit",
      },
      {
        icon: FaServicestack,
        text: "Customer Payment",
        link: "/panel/CustomerPayments",
      },
      {
        icon: FaServicestack,
        text: "Incentive",
        link: "/panel/bonus",
      },
    ],
  },
  {
    icon: FaArrowsLeftRightToLine,
    text: "Təsisçidən təsisçiyə",
    link: "/panel/managerFinancialTransactions",
  },
  {
    icon: HiOutlineArrowPathRoundedSquare,
    text: "Vəsait transferi",
    link: "/panel/paymentTransfers",
  },
  {
    icon: FaMoneyBillWave,
    text: "Ödənişlər",
    link: "/panel/payments",
  },
  {
    icon: HiOutlineArrowsUpDown,
    text: "Geri qaytarmalar",
    link: "/panel/refunds",
  },

  {
    icon: LuDivideCircle,
    text: "Kreditlər/Borclar",
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
    icon: PiHandshake,
    text: "İnsan resursları",
    children: [
      {
        icon: PiHandshake,
        text: "İşçilər",
        link: "/panel/employees",
      },
      {
        icon: PiHandshake,
        text: "Ödəniləcək maaş",
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
    children: [
      {
        icon: FaMoneyBillWave,
        text: "Ödənişlər",
        link: "/panel/reports/willbepaid",
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Reciveables",
        link: "/panel/reports/customers",
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Profits",
        link: "/panel/reports/profits",
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Profit Loss",
        link: "/panel/reports/profitLoss",
      },
      {
        icon: FaMoneyBill1Wave,
        text: "Financal Status",
        link: "/panel/reports/finaceStatus",
      },
      {
        icon: FaMoneyBill1Wave,
        text: "Ödəniş növləri",
        link: "/panel/reports/paymentTypes",
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Təchizatçı",
        link: "/panel/reports/suppliers",
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Deadline",
        link: "/panel/reports/deadLines",
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Flight Tickets",
        link: "/panel/reports/flightTickets",
      },

      {
        icon: BsFillPeopleFill,
        text: "Müştəri",
        link: "/panel/reports/customerprofit",
      },
      {
        icon: FaPeopleGroup,
        text: "Personal",
        link: "/panel/reports/personals",
      },
      {
        icon: MdOutlineAirplaneTicket,
        text: "Yaxın uçuşlar",
        link: "/panel/reports/nearestFlights",
      },

      {
        icon: FaServicestack,
        text: "Fees",
        link: "/panel/reports/expenditures",
      },

      // {
      //     icon: MdOutlineAirplaneTicket,
      //     text: 'Invoice',
      //     children: [
      //             {
      //                 icon: MdOutlineAirplaneTicket,
      //                 text: 'Aviabilet satışı',
      //                 link: '/panel/aviabiletsale'
      //             },
      //             {
      //                 icon: BsTicketDetailed,
      //                 text: 'Korperativ satış',
      //                 link: '/panel/cooperativeTicket'
      //             },
      //             {
      //                 icon: HiOutlineTicket,
      //                 text: 'Tur paket satışı',
      //                 link: '/panel/tourPackage'
      //             },
      //             {
      //                 icon: BsTicket,
      //                 text: 'İndividual tur satışı',
      //                 link: '/panel/individualTourPackage'
      //             },
      //             {
      //                 icon: HiOutlineDotsCircleHorizontal,
      //                 text: 'Digər xidmətlər',
      //                 link: '/panel/otherService'
      //             },
      //         ]
      // },

      // {
      //     icon: BsCalculator,
      //     text: 'İnvoice borcları',
      //     link: '/panel/willBeGet'
      // },
      // {
      //     icon: BsCalculator,
      //     text: 'Kredit hesabatları',
      //     link: '/panel/reportCredit'
      // },
      // {
      //     icon: BsCalculator,
      //     text: 'Gündəlik hesabat',
      //     link: '/panel/dailyInvoice'
      // },
      // {
      //     icon: BsCalculator,
      //     text: 'Ümumi invoice qazanc',
      //     link: '/panel/totalInvoiceRevenue'
      // },
      // {
      //     icon: BsCalculator,
      //     text: 'Müştəri depozitləri',
      //     link: '/panel/customerDeposits'
      // },

      // {
      //     icon: BsCalculator,
      //     text: 'Ödənilən maaşlar',
      //     link: '/panel/paidSalary'
      // },
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
        text: "Bütün sənədlər",
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
    children: [
      {
        icon: BsFillPeopleFill,
        text: "Müştərilər",
        link: "/panel/customers",
      },
      {
        icon: BiSolidPlaneAlt,
        text: "Hava yolları",
        link: "/panel/airways",
      },
      {
        icon: BiSolidPlaneAlt,
        text: "Bank",
        link: "/panel/banks",
      },
      {
        icon: BsFileEarmarkPerson,
        text: "Təchizatçı",
        link: "/panel/suppliers",
      },
      {
        icon: FaPeopleGroup,
        text: "Personal",
        link: "/panel/personals",
      },
      {
        icon: FaMoneyBill1Wave,
        text: "Ödənişlər",
        link: "/panel/payment",
      },
      {
        icon: FaExchangeAlt,
        text: "Transferlər",
        link: "/panel/transfers",
      },
      {
        icon: IoFastFood,
        text: "Qidalanma",
        link: "/panel/meals",
      },
      {
        icon: FaTrailer,
        text: "Tours",
        link: "/panel/tours",
      },
      {
        icon: FaServicestack,
        text: "Services",
        link: "/panel/services",
      },
      {
        icon: FaServicestack,
        text: "Fees",
        link: "/panel/fees",
      },
      {
        icon: FaServicestack,
        text: "Müqavilə formatı",
        link: "/panel/agreementFormats",
      },
      // {
      //   icon: FaServicestack,
      //   text: "Valyuta",
      //   link: "/panel/agreementFormats",
      // },
      {
        icon: FaServicestack,
        text: "InvoiceTexts",
        link: "/panel/invoiceTexts",
      },
      {
        icon: FaServicestack,
        text: "Company",
        link: "/panel/company",
      },
      {
        icon: FaServicestack,
        text: "Email",
        link: "/panel/email",
      },
    ],
  },
];
