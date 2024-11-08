// @ts-nocheck
import { Button, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FiDownload } from "react-icons/fi";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/components/custom/loading";
import { useContext, useEffect, useState } from "react";
import { apiService } from "@/server/apiServer";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Formik, FormikHelpers, FormikValues } from "formik";
import CustomDateTimePicker from "@/components/custom/datePicker";
import { ClipLoader } from "react-spinners";
import { cn, formatDate, toLocalISOString } from "@/lib/utils";
import { CompanyContext } from "@/store/CompanyContext";
import axios from "axios";
import { InvoiceType, SERVER_BASE_URL } from "@/constants";

const columns = [
  { label: "Id", name: "id" },
  { label: "Date", name: "date", type: "date" },
  { label: "Ref.", name: "ref" },
  { label: "InvoiceType", name: "invoiceType" },
  { label: "customer", name: "customer" },
  { label: "DeadLine.", name: "deadLine", type: "date" },
  { label: "Note.", name: "note" },
  { label: "Debit.", name: "debit" },
  { label: "Credit.", name: "credit" },
  { label: "Balance.", name: "balance" },
];

const founderColumns = [
  { label: "Id", name: "id" },
  { label: "Date", name: "date", type: "date" },
  { label: "Ref.", name: "ref" },
  { label: "Note.", name: "note" },
  { label: "Debit.", name: "debit" },
  { label: "Credit.", name: "credit" },
  { label: "Balance.", name: "balance" },
];

const Detail = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { company } = useContext(CompanyContext);

  const [data, setData] =
    useState<{ id: string; name: string; amount: number; balance: number }[]>();
  const [date, setDate] = useState<{ startDate: string; endDate: string }>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getData(parseInt(id));
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
        `${SERVER_BASE_URL}/reports/ReciveAblesReportDetailExport/${id}?startDate=${date.startDate}&endDate=${date.endDate}`,
        config
      );

      toast.promise(promise, {
        loading: "Loading...",
      });

      const response = await promise;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ProfitsReportDetailExport.xlsx`);
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
      .get(`/Reports/ReciveAblesReportDetail/${id}?${searchParams.toString()}`)
      .then((res) => {
        setData(res.data.items);
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

  if (loading) {
    return <Loading />;
  }

  // const total = data?.reduce((acc, item) => acc + item.balance, 0) || 0;

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
              src={company?.image}
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
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          {t("Reciveables")}
        </h1>
      </div>
      <Container maxWidth="xl" style={{ paddingRight: 0, marginTop: 30 }}>
        <Formik
          onSubmit={onSubmit}
          initialValues={{ startDate: null, endDate: null }}
        >
          {({ values, handleSubmit, setFieldValue, isSubmitting }) => (
            <form
              onSubmit={handleSubmit}
              className="pt-4 flex flex-wrap items-center gap-x-6"
            >
              <div
                className={cn("w-52", !values.startDate && "removeFromPrint")}
              >
                <CustomDateTimePicker
                  label={t("Start Date")}
                  value={values.startDate}
                  change={(data) => {
                    setFieldValue("startDate", data);
                  }}
                  hasErrorMessages={false}
                  errorMessages={[]}
                />
              </div>
              <div className={cn("w-52", !values.endDate && "removeFromPrint")}>
                <CustomDateTimePicker
                  label={t("End Date")}
                  value={values.endDate}
                  change={(data) => {
                    setFieldValue("endDate", data);
                  }}
                  hasErrorMessages={false}
                  errorMessages={[]}
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
          )}
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
                {id != 0 ? columns.map((column) => (
                  <TableHead key={column.name}>{t(column.label)}</TableHead>
                )) : founderColumns.map((column) => (
                  <TableHead key={column.name}>{t(column.label)}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>

                  {id != 0 ? columns.map((column) => {
                    const value = String(row[column.name]).toLowerCase();
                    let url = "";
                    const invoiceType = row["customer"] != "Founder" ? row["invoiceType"].toLowerCase() : null; // invoiceType'i küçük harf yap

                    if (invoiceType === InvoiceType.B2C) {
                      url = `/panel/aviabiletsale/report?tickets=${row["invoiceId"]}`;
                    } else if (invoiceType === InvoiceType.B2B) {
                      url = `/panel/cooperativeTicket/report?tickets=${row["invoiceId"]}`;
                    } else if (invoiceType === InvoiceType.INDIVIDUAL_TOUR) {
                      url = `/panel/individualTourPackage/report?tickets=${row["invoiceId"]}`;
                    } else if (invoiceType === InvoiceType.TOUR_PACKAGE) {
                      url = `/panel/tourPackage/report?tickets=${row["invoiceId"]}`;
                    } else {
                      url = `/panel/otherService/report?tickets=${row["invoiceId"]}`;
                    }

                    return (
                      <TableCell key={column.name}>
                        {
                          column.name === "ref" ? (
                            <a
                              style={{ color: "blue", cursor: "pointer" }}
                              href={url}
                            >
                              {value}
                            </a> // URL'yi link olarak kullan
                          ) : column.type === "date" &&
                            value != "" &&
                            value != null ? (
                            formatDate(value)
                          ) : (
                            value
                          )
                        }
                      </TableCell>
                    );
                  }) : founderColumns.map((column) => {
                    const value = String(row[column.name]).toLowerCase();
                    let url = `/panel/managerFinancialTransactions/report?tickets=${row["id"]}`;
                    return (
                      <TableCell key={column.name}>
                        {
                          column.name === "ref" ? (
                            <a
                              style={{ color: "blue", cursor: "pointer" }}
                              href={url}
                            >
                              {value}
                            </a> // URL'yi link olarak kullan
                          ) : column.type === "date" &&
                            value != "" &&
                            value != null ? (
                            formatDate(value)
                          ) : (
                            value
                          )
                        }
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={columns.length - 1}>
                  {t("Total Amount")}
                </TableCell>
                <TableCell>{total}</TableCell>
              </TableRow>
            </TableFooter> */}
          </Table>
        </Grid>
      </Container>
    </Container>
  );
};

export default Detail;
