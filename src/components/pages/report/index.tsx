// @ts-nocheck
import { useContext, useEffect, useState, useRef } from "react";
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
import { formatDate, formatDateV2 } from "@/lib/utils";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import PDFDocument from "./pdf";

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
  isTime = false
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
  const [invoiceImage, setInvoiceImage] = useState(null);
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
    // InvoiceText'i görsele dönüştür
    const image = await generateImageFromHTML(invoiceTextRes?.data?.text);
    setInvoiceImage(image); // Görseli kaydet
    setLoading(false);
  }

  const onCurrencyChange = (values: ICurrency) => {
    setCurrency(values);
  };

  const printRef = useRef();

  const generateImageFromHTML = async (htmlString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px"; // Görünmez yap
    document.body.appendChild(tempDiv);

    try {
      const canvas = await html2canvas(tempDiv);
      const dataUrl = canvas.toDataURL("image/png");
      document.body.removeChild(tempDiv); // Geçici elemanı kaldır
      return dataUrl;
    } catch (error) {
      console.error("HTML to Image conversion failed", error);
      document.body.removeChild(tempDiv);
      return null;
    }
  };

  const generatePDFBlob = async (data, company, invoiceText, headers, title, currency, invoiceNo) => {
    try {
      // Generate the PDF document as a blob
      const pdfBlob = await pdf(
        <PDFDocument
          data={data}
          company={company}
          invoiceText={invoiceText}
          headers={headers}
          title={title}
          currency={currency}
          companyName={company.name}
          companyEmail={company.email}
          companyImage={company.imageBase64}
          companyPhone={company.phoneNumber}
          companyAddress={company.adress}
          t={t}
          isTime={isTime}
        />
      ).toBlob();

      const pdfFile = new File([pdfBlob], `Travacco_${invoiceNo}.pdf`, { type: "application/pdf" });

      return pdfFile;
    } catch (error) {
      console.error("Error generating PDF Blob:", error);
      return null;
    }
  };

  if (loading || companyLoading) {
    return <Loading />;
  }

  return (
    <div id="reportPage" ref={printRef}>
      <Container className="invoice-section" maxWidth="xl" sx={{ backgroundColor: "white", pb: 4 }}>
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
                      const pdfFile = await generatePDFBlob(data, company, invoiceText, headers, title, currency, data.items[0].invoiceNo);
                      if (!pdfFile) return;

                      onOpen("sendMail", () => 0, {
                        blob: pdfFile,
                        subject: data?.simpleTable?.fullName ?? "",
                        isBcc: false,
                      });
                    }}
                    sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
                  >
                    <AiOutlineMail style={{ marginRight: "8px" }} />
                    {t("Send mail")}
                  </Button>
                  <Button >
                    <PDFDownloadLink
                      document={
                        <PDFDocument
                          data={data}
                          company={company}
                          invoiceText={invoiceText}
                          invoiceImage={invoiceImage}
                          headers={headers}
                          title={title}
                          currency={currency}
                          companyName={company.name}
                          companyEmail={company.email}
                          companyImage={company.imageBase64}
                          companyPhone={company.phoneNumber}
                          companyAddress={company.adress}
                          t={t}
                          isTime={isTime}
                        />
                      }
                      fileName={`Travacco_${data.items[0].invoiceNo}.pdf`}
                      style={{
                        textDecoration: "none",
                        color: "#000",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "12px"
                      }}
                    >
                      {({ loading }) => (loading ? t("Loading") : <><FiDownload style={{ marginRight: "8px" }} /> {t("Download")}</>)}
                    </PDFDownloadLink>
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
                <h3 id="customer-title" className="text-xl font-bold mb-2">
                  {t("Müştəri məlumatları")}
                </h3>
                {customerProperties.map((item, index) => (
                  <div
                    className="text-sm flex w-fit mb-1 print:block customer-description"
                    key={index}
                  >
                    <p className="w-24 font-bold">{t(item.fieldName)}:</p>
                    <p>
                      {item.propertyName === "date"
                        ? formatDateV2(
                          data?.simpleTable?.[item.propertyName]
                        )
                        : data?.simpleTable?.[item.propertyName]}
                    </p>
                  </div>
                ))}
              </div>
              {data.incomes && (
                <div id="income-table-box" className="print:w-[calc(100%-200px)] w-[calc(100%-270px)] max-w-[650px] -mr-6 ">
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
                isTime={isTime}
              />
            </Grid>
          </Container>
        </Grid>
        <h1 dangerouslySetInnerHTML={{ __html: invoiceText }}></h1>
        {company.companySealImage && (
          <div className="flex justify-end mt-32 mr-32 mb-48">
            <img
              src={`data:image/png;base64,${company.companySealBase64}`}
              alt="Company Seal"
              className="seal-image"
              style={{
                width: 600, // Boyut artırıldı
                maxHeight: 300, // Boyut artırıldı
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </Container >
    </div >
  );
}
