// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AiOutlineMail } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { FiDownload } from "react-icons/fi";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { format } from "date-fns";
import { toast } from "sonner";

import { UserContext } from "@/store/UserContext";
import { apiService } from "@/server/apiServer";
import { IReportModel } from "./types";

import Loading from "@/components/custom/loading";
import ReportTable from "../reportTable";

import img from "@/assets/abc_home-1.jpg";

const getCustomerProperties = (t) => [
  {
    fieldName: t("Invoice Tarixi"),
    propertyName: "date",
  },
  {
    fieldName: t("Ad"),
    propertyName: "fullName",
  },
  {
    fieldName: t("Telefon"),
    propertyName: "phoneNumber",
  },
  {
    fieldName: t("Email"),
    propertyName: "email",
  },
];

export default function Index({ headers, api }: IReportModel) {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { user: currentUser } = useContext(UserContext);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const id = searchParams.get("tickets");
    const res = await apiService.get(`${api}/${id}`);

    if (res.status !== 200) {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/aviabiletSale");
      }, 1000);
      return;
    }
    const { data } = res;

    setData({
      simpleTable: {
        ...data.customer,
        date: data.date && format(new Date(data.date), "dd-MM-yyyy HH:MM"),
      },
      totals: {
        totalSellingPrice: data.totalSellingPrice,
        totalPrice: data.totalPrice,
        totalDiscountPrice: data.totalDiscountPrice,
      },
      tickets: data.items,
    });
    setLoading(false);
  }

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "white", pb: 4 }}>
      <Grid container spacing={3} sx={{ mb: 2, width: "100%", pt: 2 }}>
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
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "end" }}
              className="removeFromPrint"
            >
              {/* <Button variant="text" color='inherit' sx={{ml: 4, fontSize: '12px', lineHeight: '16px'}}><BsWhatsapp style={{marginRight: '8px'}}/> Whatsapp-a göndər</Button> */}
              <Button
                variant="text"
                color="inherit"
                sx={{ fontSize: "12px", lineHeight: "16px" }}
              >
                <AiOutlineMail style={{ marginRight: "8px" }} />
                {t("Send mail")}
              </Button>
              <Button
                onClick={handlePrint}
                variant="text"
                color="inherit"
                sx={{ ml: 4, fontSize: "12px", lineHeight: "16px" }}
              >
                <FiDownload style={{ marginRight: "8px" }} /> {t("Print")}
              </Button>
            </Grid>
            <Typography variant="h4" gutterBottom align="right">
              {currentUser?.companyName}
            </Typography>
            <Typography gutterBottom align="right">
              Email: {currentUser?.companyEmail} | Tel:{" "}
              {currentUser?.companyPhone}
            </Typography>
          </Grid>
        </Grid>
        <Container maxWidth="xl" sx={{ mb: 2, mt: 2 }}>
          <Grid container spacing={3}>
            <Grid sx={{ backgroundColor: "white" }} item xs={6}>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {t("Müştəri məlumatları")}
                </h3>
                {getCustomerProperties(t).map((item, index) => (
                  <div className="text-sm flex w-fit mb-1" key={index}>
                    <p className="w-28 font-bold">{item.fieldName}:</p>
                    <p>{data?.simpleTable?.[item.propertyName]}</p>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="xl" style={{ paddingRight: 0 }}>
          <Grid
            sx={{
              width: "100%",
            }}
            container
          >
            <ReportTable
              headers={headers}
              tickets={data?.tickets}
              totals={data.totals}
            />
          </Grid>
        </Container>
      </Grid>
    </Container>
  );
}
