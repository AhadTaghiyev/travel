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
import { FaMoneyBillWave, FaFileImport, FaExchangeAlt } from "react-icons/fa";
import { LuDivideCircle } from "react-icons/lu";
import { PiWalletLight, PiHandshake } from "react-icons/pi";
import { AiOutlineFolderOpen, AiFillMail } from "react-icons/ai";
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
        text: "Müştəri",
        link: "/panel/deposit",
      },
      {
        icon: FaServicestack,
        text: "Bonus",
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
    link: "/panel/willbepaid",
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
        text: "Alınan Kreditlər",
        link: "/panel/getCredits",
      },
      {
        icon: BiWalletAlt,
        text: "Ödənilən kreditlər",
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
    text: "Referans",
    link: "/panel/referances",
  },
  {
    icon: BsCalculator,
    text: "Hesabatlar",
    children: [
      {
        icon: BsFileEarmarkPerson,
        text: "Təchizatçı",
        link: "/panel/reports/suppliers",
      },
      {
        icon: FaMoneyBill1Wave,
        text: "Ödəniş Növü",
        link: "/panel/reports/paymentTypes",
      },
      {
        icon: BsFillPeopleFill,
        text: "Müştəri",
        link: "/panel/reports/customer",
      },
      {
        icon: FaPeopleGroup,
        text: "Personal",
        link: "/panel/reports/personal",
      },
      {
        icon: MdOutlineAirplaneTicket,
        text: "Yaxın uçuşlar",
        link: "/panel/reports/nearestFlights",
      },
      {
        icon: FaMoneyBill1Wave,
        text: "Ödənilən və ödəniləcəklər",
        link: "/panel/reports/willbepaids",
      },
      {
        icon: FaServicestack,
        text: "Xərclər",
        link: "/panel/reports/fee",
      },
      {
        icon: BsCalculator,
        text: "Aviabilet hesabat",
        link: "/panel/reports/planeTicket",
      },
      {
        icon: BsCalculator,
        text: "Korperativ hesabat",
        link: "/panel/reports/corperative",
      },
      {
        icon: BsCalculator,
        text: "Tur paket hesabat",
        link: "/panel/reports/tourPackage",
      },
      {
        icon: BsCalculator,
        text: "Individual tur paket hesabat",
        link: "/panel/reports/individualTourPackage",
      },
      {
        icon: BsCalculator,
        text: "Digər xidmətlər hesabat",
        link: "/panel/reports/otherServices",
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
      {
        icon: BsCalculator,
        text: "Mədaxil hesabat",
        link: "/panel/reports/masincome",
      },
      {
        icon: BsCalculator,
        text: "Alınan və verilən borclar",
        link: "/panel/reports/debt",
      },

      {
        icon: BsCalculator,
        text: "Alınan Kreditlər",
        link: "/panel/reports/getcredit",
      },
      {
        icon: BsCalculator,
        text: "Ödənilən Kreditlər",
        link: "/panel/reports/paidcredit",
      },
      {
        icon: BsCalculator,
        text: "Ödənilən Maaşlar",
        link: "/panel/reports/paidsalary",
      },
      {
        icon: BsCalculator,
        text: "Ümumi kassa hesabatı",
        link: "/panel/totalStatus",
      },
      {
        icon: BsCalculator,
        text: "Gündəlik hesabat",
        link: "/panel/dailyInvoice",
      },

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
        link: "/panel/payments",
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
        text: "Turlar",
        link: "/panel/tours",
      },
      {
        icon: FaServicestack,
        text: "Xidmətlər",
        link: "/panel/services",
      },
      {
        icon: FaServicestack,
        text: "Xərclər",
        link: "/panel/fees",
      },
      {
        icon: FaServicestack,
        text: "Müqavilə formatı",
        link: "/panel/agreementFormats",
      },
    ],
  },
];
