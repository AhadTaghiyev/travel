// @ts-nocheck
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { FiDownload } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import img from "../../../assets/abc_home-1.jpg";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SimpleTable from "../../../components/pages/simpleTable";

import { IReportModel } from "./types";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiService } from "../../../server/apiServer";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ReportTable from "../reportTable";
import { log } from "console";

const footerStyle = {
  background: "#F8F9FA",
  padding: "10px 4px",
  display: "flex",
  justifyContent: "center",
};

const customerProperties = [
  {
    fieldName: "Invoice Tarixi",
    propertyName: "date",
  },
  {
    fieldName: "Ad",
    propertyName: "fullName",
  },
  {
    fieldName: "Telefon",
    propertyName: "phoneNumber",
  },
  {
    fieldName: "Email",
    propertyName: "email",
  },
];

export default function Index({ headers, api, service }: IReportModel) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tickets, setTickets] = useState<Array<any>>([]);
  const [customer, setCustomer] = useState<any>({});

  const [currentUser, setCurrentUser] = useState<any>({});

  const [totals, setTotals] = useState({
    totalAmount: 0,
    totalDebt: 0,
    totalPaidAmount: 0,
  });

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await apiService.get("Identities/GetCurrentUser");
        if (res && res.data) {
          setCurrentUser(res.data);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const tickets = searchParams.get("tickets");

    setFetchedTickets();

    async function fetchTicket(id: string) {
      const res = await apiService.get(`${api}/${id}`);
      return res.data.data;
    }

    async function setFetchedTickets() {
      if (tickets) {
        const ticketsIdsArray: string[] = tickets?.split(",");

        const ticketsResult = [];
        const ticketsTotals = {
          totalAmount: 0,
          totalDebt: 0,
          totalPaidAmount: 0,
        };

        for (const item of ticketsIdsArray) {
          const result = await fetchTicket(item);
          ticketsResult.push(result);
          if (service === "coorperative") {
            ticketsTotals.totalAmount += result.sellingPrice;
            ticketsTotals.totalPaidAmount += result.commission;
            ticketsTotals.totalDebt += result.statutoryPrice;
          } else {
            ticketsTotals.totalAmount += result.sellingPrice;
            ticketsTotals.totalPaidAmount += result.discount;
            ticketsTotals.totalDebt += result.commonPrice;
          }
        }

        setTickets(ticketsResult);
        setTotals(ticketsTotals);
        setCustomer(ticketsResult[0].customer);
      }
    }
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container maxWidth="xl" sx={{ mb: 5, backgroundColor: "white" }}>
      <Grid
        container
        spacing={3}
        sx={{ mb: 2, width: "100%", borderTop: "1px solid #d8d3d3", mt: 1 }}
      >
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
          {/* <Button variant="text" color='inherit' sx={{ml: 4, fontSize: '12px', lineHeight: '16px'}}><BsWhatsapp style={{marginRight: '8px'}}/> Whatsapp-a göndər</Button> */}
          <Button
            variant="text"
            color="inherit"
            sx={{ ml: 4, fontSize: "12px", lineHeight: "16px" }}
          >
            {" "}
            <AiOutlineMail style={{ marginRight: "8px" }} /> Send mail
          </Button>
          <Button
            onClick={handlePrint}
            variant="text"
            color="inherit"
            sx={{ ml: 4, fontSize: "12px", lineHeight: "16px" }}
          >
            <FiDownload style={{ marginRight: "8px" }} /> Print
          </Button>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={3}>
            <img src={img} style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h4" gutterBottom align="right">
              {currentUser.companyName}
            </Typography>
            <Typography gutterBottom align="right">
              Email: {currentUser.companyEmail} | Tel:{" "}
              {currentUser.companyPhone}
            </Typography>
          </Grid>
        </Grid>
        <Container maxWidth="xl" sx={{ mb: 5, mt: 2 }}>
          <Grid container spacing={3}>
            <Grid sx={{ backgroundColor: "white" }} item xs={6}>
              <SimpleTable
                header="Müştəri məlumatları"
                properties={customerProperties}
                values={customer}
              />
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="xl">
          <Grid sx={{ backgroundColor: "white" }} container>
            <ReportTable headers={headers} tickets={tickets} totals={totals} />
          </Grid>
        </Container>
      </Grid>
    </Container>
  );
}
