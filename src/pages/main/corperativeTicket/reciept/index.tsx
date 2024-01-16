//@ts-nocheck
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { BsWhatsapp } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import Qr from "../../../../components/pages/qrCode";
import qrImage from "../../../../assets/qr.png";
import SimpleTable from "../../../../components/pages/simpleTable";
import RecieptTable from "../../../../components/pages/reciept/recieptTable";
import styles from "./reciepts.module.css";
import { useNavigate } from "react-router-dom";
import { Ticket } from "../types";
import { apiService } from "../../../../server/apiServer";

const breadcrumbs = [
  <Link key="1" to="/panel" className="pageLink link">
    Ana səhifə
  </Link>,
  <Link key="1" to="/panel/aviabiletSale" className="pageLink link">
    Aviabilet satışı
  </Link>,
  <Link key="1" to="/panel/aviabiletSale/new" className="pageLink link">
    Yeni aviabilet yarat
  </Link>,
  <Link
    key="1"
    to="/panel/aviabiletSale/new/reciept"
    className="currentPageLink link"
  >
    Reciept
  </Link>,
];
const initialValues: Ticket = [
  {
    ticketNo: "",
    passengerName: "",
    segmentCount: 0,
    purchasePrice: 0,
    sellingPrice: 0,
    flightDate: new Date(),
    deadline: new Date(),
    direction: "",
    discount: 0,
    commonPrice: 0,
    paidAmount: 0,
    explanation: "",
    note: "",
    isCustomerPaid: false,
    isSupplierPaid: false,
    supplierId: "",
    customerId: "",
    personalId: "",
    airWayId: "",
    paymentId: "",
    invoiceNo: 0,
  },
];

export default function Index() {
  const handlePrint = () => {
    window.print();
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [tickets, setTicket] = useState([]);

  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const guids = id.split(",");
        for (const guid of guids) {
          const res = await apiService.get(`/PlaneTickets/Get/${guid}`);
          setTicket((prevTickets) => [
            ...prevTickets,
            {
              ...res.data.data,
              supplierName: res.data.data.supplier?.name,
              customerPhone: res.data.data.customer?.phoneNumber,
              customerEmail: res.data.data.customer?.email,
              customerName: res.data.data.customer?.fullName,
              createdAt: res.data.data.createdAt,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  // useEffect(() => {
  //   console.log(tickets);

  // }, [tickets]);

  return (
    <Container maxWidth="xl" sx={{ mb: 5 }}>
      <Breadcrumbs
        separator={<AiOutlineRight fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Divider sx={{ mb: 5 }} />
      <Grid container spacing={3} sx={{ justifyContent: "end", mb: 2 }}>
        <div>
          <Button
            variant="text"
            color="inherit"
            sx={{ ml: 4, fontSize: "12px", lineHeight: "16px" }}
          >
            <BsWhatsapp style={{ marginRight: "8px" }} /> Whatsapp-a göndər
          </Button>
          <Button
            variant="text"
            color="inherit"
            sx={{ ml: 4, fontSize: "12px", lineHeight: "16px" }}
          >
            {" "}
            <AiOutlineMail style={{ marginRight: "8px" }} /> Email-a göndər
          </Button>
          <Button
            onClick={handlePrint}
            variant="text"
            color="inherit"
            sx={{ ml: 4, fontSize: "12px", lineHeight: "16px" }}
          >
            <FiDownload style={{ marginRight: "8px" }} /> Export
          </Button>
        </div>
      </Grid>
      {tickets.map((ticket) => {
        // Format the date using Intl.DateTimeFormat
        const formattedDate = new Intl.DateTimeFormat("en-US").format(
          new Date(ticket.createdAt)
        );

        return (
          <RecieptTable
            key={ticket.id}
            client={ticket.customerName}
            date={formattedDate}
            passengerCount={ticket.passengerCount}
            amount={ticket.commonPrice} // This is hard-coded. Maybe you'd want ticket.amount or something similar?
            ticketNumber={ticket.ticketNo} // I assume ticket.ticketNo is the ticket number, adjust as necessary
            airway={"azal"} // This is hard-coded. Maybe you'd want ticket.airway or something similar?
          />
        );
      })}
      <Button
        variant="contained"
        color="inherit"
        sx={{ mr: 2, mb: 1 }}
        onClick={() => navigate(-1)}
      >
        Geri qayıt
      </Button>
    </Container>
  );
}
