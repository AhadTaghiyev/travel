import { INavigationItemType } from "../../../components/pages/home/navigationItem/types";

// icons
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { HiDownload, HiOutlineDotsCircleHorizontal, HiOutlineTicket } from "react-icons/hi";
import {
  FaMoneyBillWave,
  FaFileImport,
} from "react-icons/fa6";
import { BsArrowDownUp, BsTicket, BsTicketDetailed } from "react-icons/bs";

import { AiOutlineFolderOpen } from "react-icons/ai";

export const navigationItems: INavigationItemType[] = [
  {
    text: "Aviabilet satışı",
    path: "/panel/aviabiletsale/new",
    color: "#655F59",
    Icon: MdOutlineAirplaneTicket,
    quantity: 1,
  },
  {
    text: "Korperativ satış",
    path: "/panel/cooperativeTicket/new",
    color: "#B1B2A1",
    Icon: BsTicketDetailed,
    quantity: 1,
  },
  {
    text: "Tur paket satışı",
    path: "/panel/tourPackage/new",
    color: "#C5A253",
    Icon: HiOutlineTicket,
  },
  {
    text: "İndividual tur satışı",
    path: "/panel/individualTourPackage/new",
    color: "#6E7972",
    Icon: BsTicket,
  },
  {
    text: "Other services",
    path: "/panel/otherService/new",
    color: "#7A885A",
    Icon: HiOutlineDotsCircleHorizontal,
    quantity: 1,
  },
  {
    text: "Mədaxil",
    path: "/panel/income",
    // color: "#B1B2A1",
    color: "#655F59",
    Icon: HiDownload,
    quantity: 1,
  },


  {
    text: "Ödənişlər",
    path: "/panel/payments",
    // color: "#7A885A",
    color: "#B1B2A1",
    Icon: FaMoneyBillWave,
    quantity: 1,
  },
  {
    text: "Payables",
    path: "/panel/reports/willbepaid",
    // color: "#7A885A",
    color: "#C5A253",
    Icon: FaMoneyBillWave,
    quantity: 1,
  },
  {
    text: "Reciveables",
    path: "/panel/reports/customers",
    // color: "#7A885A",
    color: "#6E7972",
    Icon: FaMoneyBillWave,
    quantity: 1,
  },
  {
    text: "Geri qaytarmalar",
    path: "/panel/refunds",
    // color: "#655F59",
    color: "#7A885A",
    Icon: BsArrowDownUp,
    quantity: 1,
  },

  {
    text: "Müqavilə",
    path: "/panel/agreements",
    // color: "#7A885A",
    color: "#655F59",
    
    Icon: AiOutlineFolderOpen,
    quantity: 1,
  },
  {
    text: "Sənəd göndərmək",
    path: "/panel/documents/send",
    // color: "#655F59",
    color: "#B1B2A1",
    Icon: FaFileImport,
    quantity: 1,
  },

];
