// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsCurrencyExchange } from "react-icons/bs";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AiOutlineMail } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { FiDownload } from "react-icons/fi";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import html2pdf from "html2pdf.js";
import { toast } from "sonner";

import { UserContext } from "@/store/UserContext";
import { apiService } from "@/server/apiServer";
import { ICurrency, IReportModel } from "./types";

import Loading from "@/components/custom/loading";
import { MassIncomeTable } from "../incomeTable";
import { useModal } from "@/hooks/useModal";
import ReportTable from "../reportTable";

import { CompanyContext } from "@/store/CompanyContext";
import { formatDate } from "@/lib/utils";

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

export default function Index({
  headers,
  api,
  title,
  showCreateButton,
}: IReportModel) {
  const [searchParams] = useSearchParams();
  const { onOpen } = useModal();
  const { loading: companyLoading, company } = useContext(CompanyContext);
  const [currency, setCurrency] = useState<ICurrency>({
    name: company?.concurency ?? "USD",
    value: 1,
  });
  const [loading, setLoading] = useState(true);
  const [invoiceText, setInvoiceText] = useState("");
  const [data, setData] = useState();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { user: currentUser } = useContext(UserContext);

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

  async function getData() {
    setLoading(true);
    const id = searchParams.get("tickets");
    const res = await apiService.get(`${api}/${id}`);

    if (res.status !== 200) {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel");
      }, 1000);
      return;
    }
    const { data } = res;
    console.log(data);


    setData({
      simpleTable: {
        ...data.customer,
        date: data.date,
      },
      totals: {
        totalSellingPrice: data.totalSellingPrice,
        totalPrice: data.totalPrice,
        totalDiscountPrice: data.totalDiscountPrice,
      },
      items: data.items,
      incomes: data.massIncomes,
      receiptImage: data.receiptImage,
    });

    const invoiceTextRes = await apiService.get("/InvoiceTexts/get");
    setInvoiceText(invoiceTextRes?.data?.text);
    setLoading(false);
  }

  const onCurrencyChange = (values: ICurrency) => {
    setCurrency(values);
  };

  const handlePrint = () => {
    window.print();
  };
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

            <Grid item xs={9}>
              <div data-html2canvas-ignore="true">
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "end" }}
                  className="removeFromPrint"
                >
                  {(currency.value !== 1 ||
                    currency.name !== (company?.concurency ?? "USD")) && (
                      <Button
                        variant="text"
                        color="inherit"
                        sx={{ fontSize: "12px", lineHeight: "16px" }}
                        onClick={() =>
                          setCurrency({
                            name: company?.concurency ?? "USD",
                            value: 1,
                          })
                        }
                      >
                        <BsCurrencyExchange style={{ marginRight: "8px" }} />
                        {t("Məzənnə sıfırla")}
                      </Button>
                    )}
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
                        subject: data?.simpleTable?.fullName ?? "",
                      });
                    }}
                    sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
                  >
                    <AiOutlineMail style={{ marginRight: "8px" }} />
                    {t("Send mail")}
                  </Button>
                  <Button
                    onClick={handlePrint}
                    variant="text"
                    color="inherit"
                    sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
                  >
                    <FiDownload style={{ marginRight: "8px" }} /> {t("Print")}
                  </Button>
                  <Button
                    onClick={(e) => navigate("/panel/agreements/new")}
                    variant="text"
                    color="inherit"
                    sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
                  >
                    {t("Contract")}
                  </Button>

                  {showCreateButton && (
                    <Button
                      onClick={(e) => navigate("/panel/aviabiletsale/new")}
                      variant="text"
                      color="inherit"
                      sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
                    >
                      {t("Aviabilet")}
                    </Button>
                  )}
                </Grid>
              </div>
              <Typography variant="h4" gutterBottom align="right" className="print:text-base" sx={{
                fontSize: { xs: "2.1rem", print: "1rem" }, // Normalde 1.5rem, yazdırma sırasında 1rem
                "@media print": {
                  fontSize: "1rem",
                },
              }}>
                {currentUser?.companyName}
              </Typography>
              <Typography gutterBottom align="right">
                Email: {currentUser?.companyEmail} | Tel:{" "}
                {currentUser?.companyPhone}
              </Typography>
            </Grid>
          </Grid>
          <Container maxWidth="xl" sx={{
            mb: { xs: 4, print: 2 },
            "@media print": {
              marginBottom: "5px",
            },
          }}>
            {title && (
              <h1
                className="text-xl font-bold mb-6"
                style={{ textAlign: "center" }}
              >
                {t(title)}
              </h1>
            )}
            <div className="flex justify-between ">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {t("Müştəri məlumatları")}
                </h3>
                {customerProperties.map((item, index) => (
                  <div
                    className="text-sm flex w-fit mb-1 print:block"
                    key={index}
                  >
                    <p className="w-24 font-bold">{t(item.fieldName)}:</p>
                    <p>
                      {item.propertyName === "date"
                        ? formatDate(
                          data?.simpleTable?.[item.propertyName],
                          "dd-MM-yyyy HH:mm"
                        )
                        : data?.simpleTable?.[item.propertyName]}
                    </p>
                  </div>
                ))}
              </div>
              {data.incomes && (
                <div className="print:w-[calc(100%-200px)] w-[calc(100%-270px)] max-w-[650px] -mr-6 ">
                  <MassIncomeTable
                    currency={currency}
                    incomes={data.incomes}
                    totalPrice={data.totals?.totalPrice}
                  />
                </div>
              )}
            </div>
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
                currency={currency}
                items={data?.items}
                totals={data.totals}
              />
            </Grid>
          </Container>
        </Grid>
        <h1 dangerouslySetInnerHTML={{ __html: invoiceText }}></h1>
      </Container>
    </div>
  );
}
