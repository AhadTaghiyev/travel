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
import { toast } from "sonner";
import { Formik, FormikHelpers, FormikValues } from "formik";
import CustomDateTimePicker from "@/components/custom/datePicker";
import { ClipLoader } from "react-spinners";
import { cn, formatDate } from "@/lib/utils";
import { CompanyContext } from "@/store/CompanyContext";
import axios from "axios";
import { SERVER_BASE_URL } from "@/constants";

const columns = [
  { label: "Service", name: "id" },
  { label: "date", name: "date", type: "date" },
  { label: "Ref.", name: "ref" },
  { label: "Customer", name: "customer" },
  { label: "Payment", name: "payment" },
  { label: "Debit", name: "debit" },
  { label: "Credit", name: "credit" },
];

const DayBookReport = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { company } = useContext(CompanyContext);

  const [data, setData] =
    useState<{ id: string; name: string; credit: number; debit: number }[]>();

  useEffect(() => {
    getData();
  }, []);

  const handleDownload = async () => {
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
      const promise = axios.get(`${SERVER_BASE_URL}/reports/DayBookReportExport`, config);
  
      toast.promise(promise, {
        loading: "Loading..."
      });
  
      const response = await promise;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `DayBookReportExport.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("An error occurred while downloading the data: ", error);
    }
  };

  const getData = async (startDate?: Date, endDate?: Date) => {
    setLoading(true); // Yükleniyor durumunu ayarla
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.append("startDate", startDate.toISOString());
    if (endDate) searchParams.append("endDate", endDate.toISOString());
  
    const timestamp = new Date().getTime(); // Zaman damgası ekle
  
    try {
      const response = await apiService.get(`/Reports/DayBookReport?${searchParams.toString()}&_=${timestamp}`);
      setData(response.data);
    } catch (error) {
      toast.error(error.message || t("Something went wrong!"));
    } finally {
      setLoading(false); // Yükleniyor durumunu kapat
    }
  };
  
  const onSubmit = (
    values: { startDate: Date; endDate: Date },
    { setSubmitting }: FormikHelpers<FormikValues>
  ) => {
    getData(values.startDate, values.endDate).finally(() => {
      setSubmitting(false);
    });
  };

  if (loading) {
    return <Loading />;
  }

  const totalDebit = data?.reduce((acc, item) => acc + item.debit, 0) || 0;
  const totalCredit = data?.reduce((acc, item) => acc + item.credit, 0) || 0;

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
                onClick={()=>handleDownload()}
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
          {t("Day Book Report")}
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
              <TableHead key={"No"}>{t("No")}</TableHead>
                {columns.map((column) => (
                  <TableHead key={column.name}>{t(column.label)}</TableHead>
                ))}
                    
                      
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((row,index) => (
                <TableRow key={row.id}>
                            <TableCell className={"py-1.5"}>{index + 1}</TableCell>
                  {columns.map((column) => {
                    const value = String(row[column.name]).toLowerCase();


                    return (
                      <TableCell key={column.name}>
                        {
                          column.type === "date" ? formatDate(value) : value // Diğer durumlarda değeri normal metin olarak göster
                        }
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={columns.length - 1}>
                  {t("Total Amount")}
                </TableCell>
                <TableCell>{totalDebit}</TableCell>
                <TableCell>{totalCredit}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Grid>
      </Container>
    </Container>
  );
};

export default DayBookReport;
