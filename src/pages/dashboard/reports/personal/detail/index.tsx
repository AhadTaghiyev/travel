// @ts-nocheck
import { Button, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FiDownload } from "react-icons/fi";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/components/custom/loading";
import { useContext, useEffect, useState } from "react";
import { apiService } from "@/server/apiServer";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Formik, FormikHelpers, FormikValues } from "formik";
import CustomDateTimePicker from "@/components/custom/datePicker";
import { ClipLoader } from "react-spinners";
import { cn, formatDate, toLocalISOString } from "@/lib/utils";
import { CompanyContext } from "@/store/CompanyContext";
import { DEFAULT_YEAR, InvoiceType, SERVER_BASE_URL } from "@/constants";
import axios from "axios";
import { YearContext } from "@/store/YearContext";

const columns = [
  { label: "Personal", name: "personal" },
  { label: "Date", name: "date", type: "date" },
  { label: "Ref", name: "ref" },
  { label: "Departure Dates", name: "departureDates", type: "date" },
  { label: "Description", name: "description" },
  { label: "Note", name: "note" },
  { label: "Customer Debt", name: "customerDebt" },
  { label: "Buying", name: "buyingPrice" },
  { label: "Selling", name: "sellingPrice" },
  { label: "Profit", name: "profit" },
];

const Detail = () => {
  const { t } = useTranslation();
  const { loading: companyLoading, company } = useContext(CompanyContext);
  const { selectedYear } = useContext(YearContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] =
    useState<{ id: string; name: string; balance: number }[]>();

  const [data2, setData2] = useState<
    {
      id: string;
      name: string;
      sellingPrice: number;
      buyingPrice: number;
      profit: number;
    }[]
  >();
  const [date, setDate] = useState<{ startDate: string; endDate: string }>();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const defaultStartDate = searchParams.get("startDate")
    ? new Date(searchParams.get("startDate") as string)
    : selectedYear ? new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : Number(selectedYear), 0, 1) : null;
  const defaultEndDate = searchParams.get("startDate")
    ? new Date(searchParams.get("endDate") as string)
    : selectedYear ? new Date(String(selectedYear) === "All" ? new Date().getFullYear() : Number(selectedYear), 11, 31) : null;

  console.log("defaultStartDate", defaultStartDate);
  console.log("defaultEndDate", defaultEndDate);

  useEffect(() => {
    getData(parseInt(id), defaultStartDate, defaultEndDate);
  }, [id]);

  const handleDownload = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Replace "your_token_key" with the actual key you used to store the token
      if (!token) {
        console.error("Token is not found");
        return;
      }

      const config = {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const promise = axios.get(
        `${SERVER_BASE_URL}/reports/PersonalsReportDetailExport/${id}?startDate=${date.startDate}&endDate=${date.endDate}`,
        config
      );

      toast.promise(promise, {
        loading: "Loading...",
      });

      const response = await promise;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `PersonalsReportDetailExport.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("An error occurred while downloading the data: ", error);
    }
  };

  const getData = async (id: number, startDate?: Date, endDate?: Date) => {
    const searchParams = new URLSearchParams();
    if (startDate)
      searchParams.append("startDate", toLocalISOString(startDate));
    if (endDate) searchParams.append("endDate", toLocalISOString(endDate));
    setDate({
      startDate: startDate ? toLocalISOString(startDate) : null,
      endDate: endDate ? toLocalISOString(endDate) : null
    });
    await apiService
      .get(`/Reports/PersonalsReportDetail/${id}?${searchParams.toString()}`)
      .then((res) => {
        setData(res.data.items);
        setData2(res.data.items);
      })
      .catch((err) => {
        toast.error(err.message || t("Something went wrong!"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = (
    values: { startDate: Date; endDate: Date },
    { setSubmitting }: FormikHelpers<FormikValues>
  ) => {
    getData(parseInt(id), values.startDate, values.endDate).finally(() => {
      setSubmitting(false);
    });
  };

  if (loading || companyLoading) {
    return <Loading />;
  }

  // const total = data?.reduce((acc, item) => acc + item.balance, 0) || 0;

  const totalProfit = data2?.reduce((acc, item) => acc + item.profit, 0) || 0;
  const totalSellingPrice =
    data2?.reduce((acc, item) => acc + item.buyingPrice, 0) || 0;
  const totalAmount =
    data2?.reduce((acc, item) => acc + item.sellingPrice, 0) || 0;
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
            <img
              src={company.image}
              style={{
                width: 400,
                height: 200,
                objectFit: "contain",
                marginLeft: 30,
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "end" }}
              className="removeFromPrint"
            >
              <Button
                onClick={window.print}
                variant="text"
                color="inherit"
                sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
              >
                <FiDownload style={{ marginRight: "8px" }} /> {t("Print")}
              </Button>

              <Button
                onClick={() => handleDownload(id)}
                variant="text"
                color="inherit"
                sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
              >
                <FiDownload style={{ marginRight: "8px" }} /> {t("Export")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Container maxWidth="xl" style={{ paddingRight: 0, marginTop: 30 }}>
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {t("Personal")}
          </h1>
        </div>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            startDate: defaultStartDate,
            endDate: defaultEndDate,
          }}
        >
          {({ values, handleSubmit, setFieldValue, isSubmitting }) => {
            useEffect(() => {
              setFieldValue("startDate", new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : Number(selectedYear), 0, 1));
              setFieldValue("endDate", new Date(String(selectedYear) === "All" ? new Date().getFullYear() : Number(selectedYear), 11, 31));
            }, [selectedYear, setFieldValue]);
            return (
              <form
                onSubmit={handleSubmit}
                className="pt-4 flex flex-wrap items-center gap-x-6"
              >
                <div
                  className={cn("w-52", !values.startDate && "removeFromPrint")}
                >
                  <CustomDateTimePicker
                    label={t("Start Date")}
                    value={values.startDate || new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : Number(selectedYear), 0, 1)}
                    change={(data) => {
                      setFieldValue("startDate", data);
                    }}
                    hasErrorMessages={false}
                    errorMessages={[]}
                    isStartDate={true}
                  />
                </div>
                <div className={cn("w-52", !values.endDate && "removeFromPrint")}>
                  <CustomDateTimePicker
                    label={t("End Date")}
                    value={values.endDate || new Date(String(selectedYear) === "All" ? new Date().getFullYear() : Number(selectedYear), 11, 31)}
                    change={(data) => {
                      setFieldValue("endDate", data);
                    }}
                    hasErrorMessages={false}
                    errorMessages={[]}
                    isStartDate={false}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="p-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500 tracking-widest transition shadow-lg disabled:opacity-70 flex gap-x-2 items-center removeFromPrint"
                >
                  <ClipLoader
                    size={14}
                    color="white"
                    loading={isSubmitting}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  {t("Axtar")}
                </button>
              </form>
            )
          }}
        </Formik>
        <Grid
          sx={{
            width: "100%",
          }}
          container
        >
          <Table className="border border-solid border-gray-300">
            <TableHeader className="border-b border-solid border-black/60">
              <TableRow className="w-full">
                {columns.map((column) => {
                  return <TableHead className="bg-[#3275BB] text-[#fff] border-white" key={column.name}>{t(column.label)}</TableHead>
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => {
                    const value = String(row[column.name]).toLowerCase();

                    let url = "";
                    const invoiceType = row["description"].toLowerCase();
                    if (invoiceType === InvoiceType.B2C) {
                      url = `/panel/aviabiletsale/report?tickets=${row["invoiceId"]}`;
                    } else if (invoiceType === InvoiceType.B2B) {
                      url = `/panel/cooperativeTicket/report?tickets=${row["invoiceId"]}`;
                    } else if (invoiceType === InvoiceType.INDIVIDUAL_TOUR) {
                      url = `/panel/individualTourPackage/report?tickets=${row["invoiceId"]}`;
                    } else if (invoiceType === InvoiceType.TOUR_PACKAGE) {
                      url = `/panel/tourPackage/report?tickets=${row["invoiceId"]}`;
                    } else if (invoiceType === InvoiceType.Refund) {
                      url = `/panel/refunds/report?tickets=${row["invoiceId"]}`;
                    } else {
                      url = `/panel/otherService/report?tickets=${row["invoiceId"]}`;
                    }

                    return (
                      <TableCell key={column.name} className="py-1.5">
                        {
                          column.name === "ref" ? (
                            <a
                              style={{ color: "blue", cursor: "pointer" }}
                              href={url}
                            >
                              {value}
                            </a> // URL'yi link olarak kullan
                          ) : column.type === "date" ? (
                            formatDate(value)
                          ) : (
                            value
                          ) // Diğer durumlarda değeri normal metin olarak göster
                        }
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="py-2" colSpan={7}>
                  {t("Total Amount")}
                </TableCell>
                <TableCell className="py-2">{totalSellingPrice}</TableCell>
                <TableCell className="py-2">{totalAmount}</TableCell>
                <TableCell className="py-2">{totalProfit}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Grid>
      </Container>
    </Container>
  );
};

export default Detail;
