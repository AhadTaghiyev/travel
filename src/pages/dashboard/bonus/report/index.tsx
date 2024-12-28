// @ts-nocheck
import { Button, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AiOutlineMail } from "react-icons/ai";
import { useModal } from "@/hooks/useModal";
import { useContext, useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

import { ICurrency } from "@/components/pages/report/types";

import { BsCurrencyExchange } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiService } from "@/server/apiServer";
import { toast } from "sonner";
import Loading from "@/components/custom/loading";
import { UserContext } from "@/store/UserContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { CompanyContext } from "@/store/CompanyContext";

export default function index() {
  const { user: currentUser } = useContext(UserContext);
  const { loading: companyLoading, company } = useContext(CompanyContext);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [data, setData] = useState();
  const { t } = useTranslation();
  const { onOpen } = useModal();
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<ICurrency>({
    name: company?.concurency ?? "USD",
    value: 1,
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (company?.concurency)
      setCurrency({
        name: company?.concurency,
        value: 1,
      });
  }, [company?.concurency]);

  const onCurrencyChange = (values: ICurrency) => {
    setCurrency(values);
  };

  async function getData() {
    setLoading(true);
    const id = searchParams.get("tickets");
    const res = await apiService.get(`/Bonuces/GetDetail/${id}`);

    if (res.status !== 200) {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel");
      }, 1000);
      return;
    }
    const { data } = res;

    setData(data);
    setLoading(false);
  }
  const generatePDFBlob = async () => {
    const element = document.getElementById("reportPage");
    const opt = {
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    const blob = await html2pdf().set(opt).from(element).toPdf().output("blob");
    if (!blob) {
      toast.error(t("Something went wrong"));
      return "";
    }
    return blob;
  };
  if (loading || companyLoading) {
    return <Loading />;
  }

  return (
    <div id="reportPage">
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
              <img
                src={`data:image/jpeg;base64,${company.imageBase64}`}
                style={{
                  width: 400,
                  maxHeight: 200,
                  objectFit: "contain",
                  marginLeft: 30,
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <div data-html2canvas-ignore="true">
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "end" }}
                  className="removeFromPrint"
                >
                  <Button
                    variant="text"
                    color="inherit"
                    sx={{ fontSize: "12px", lineHeight: "16px" }}
                    onClick={() => onOpen("createCurrency", onCurrencyChange)}
                  >
                    <BsCurrencyExchange style={{ marginRight: "8px" }} />
                    {t("Məzənnə dəyişdir")}
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={async () => {
                      const blob = await generatePDFBlob();
                      if (!blob) return;

                      onOpen("sendMail", () => 0, {
                        blob,
                        subject: data?.description ?? "",
                      });
                    }}
                    sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
                  >
                    <AiOutlineMail style={{ marginRight: "8px" }} />
                    {t("Send mail")}
                  </Button>
                  <Button
                    onClick={window.print}
                    variant="text"
                    color="inherit"
                    sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
                  >
                    <FiDownload style={{ marginRight: "8px" }} /> {t("Print")}
                  </Button>
                </Grid>
              </div>
              <Typography variant="h4" gutterBottom align="right">
                {currentUser?.companyName}
              </Typography>
              <Typography gutterBottom align="right">
                Email: {currentUser?.companyEmail} | Tel:{" "}
                {currentUser?.companyPhone}
              </Typography>
            </Grid>
          </Grid>
          <Container maxWidth="xl" style={{ paddingRight: 0, marginTop: 30 }}>
            <h1
              className="text-xl font-bold mb-6"
              style={{ textAlign: "center" }}
            >
              {t("Incentive Invoice Receipt")}
            </h1>
            <Grid
              sx={{
                width: "100%",
              }}
              container
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-[#3275BB] text-[#fff] border-white">{t("Ref.")}</TableHead>
                    <TableHead className="bg-[#3275BB] text-[#fff] border-white">{t("Ödəniş növü")}</TableHead>
                    <TableHead className="bg-[#3275BB] text-[#fff] border-white">{t("paidamount")}</TableHead>
                    <TableHead className="bg-[#3275BB] text-[#fff] border-white">{t("Description")}</TableHead>
                    <TableHead className="bg-[#3275BB] text-[#fff] border-white">{t("date")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data && (
                    <TableRow key={data.id}>
                      <TableCell className="py-1.5">{data.ref}</TableCell>
                      <TableCell className="py-1.5">{data.payment}</TableCell>
                      <TableCell className="py-1.5">
                        {(data.amount * currency.value).toFixed(2)}{" "}
                        {currency.name}
                      </TableCell>
                      <TableCell className="py-1.5 max-w-[150px] truncate">
                        {data.description ?? t("No Description")}
                      </TableCell>
                      <TableCell className="py-1.5 max-w-[150px] truncate">
                        {formatDate(data.date)}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Grid>
          </Container>
        </Grid>
      </Container>
    </div>
  );
}
