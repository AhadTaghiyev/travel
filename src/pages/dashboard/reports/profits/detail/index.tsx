// @ts-nocheck
import { Button, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FiDownload } from "react-icons/fi";
import { SERVER_BASE_URL } from "@/constants";

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
import { Link, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Formik, FormikHelpers, FormikValues } from "formik";
import CustomDateTimePicker from "@/components/custom/datePicker";
import { ClipLoader } from "react-spinners";
import { cn, formatDate } from "@/lib/utils";
import { CompanyContext } from "@/store/CompanyContext";
import axios from "axios";

const columns = [
  { label: "date", name: "date", type: "date" },
  { label: "Customer", name: "customer" },
  { label: "Ref", name: "ref" },
  { label: "salePrice", name: "buyingPrice" },
  { label: "SellingPrice", name: "sellingPrice" },
  { label: "Profits", name: "profiy" },
];

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
    const promise = axios.get(`${SERVER_BASE_URL}/reports/ProfitsReportDetailExport?ticketType=${id}`, config);

    toast.promise(promise, {
      loading: "Loading..."
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

const Detail = () => {
  const { t } = useTranslation();
  const { loading: companyLoading, company } = useContext(CompanyContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<
    {
      type: string;
      id: string;
      name: string;
      buyingPrice: number;
      sellingPrice: number;
      profiy: number;
    }[]
  >();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const defaultStartDate = searchParams.get("startDate")
    ? new Date(searchParams.get("startDate") as string)
    : null;
  const defaultEndDate = searchParams.get("startDate")
    ? new Date(searchParams.get("endDate") as string)
    : null;

  useEffect(() => {
    getData(id, defaultStartDate, defaultEndDate);
  }, [id]);

  const getData = async (id: string, startDate?: Date, endDate?: Date) => {
  
    const searchParams = new URLSearchParams();
    if (id) searchParams.append("ticketType", String(id));
    if (startDate) searchParams.append("startDate", startDate?.toISOString());
    if (endDate) searchParams.append("endDate", endDate?.toISOString());
  
  try {
    await apiService
    .get(`/Reports/ProfitsReportDetail?${searchParams.toString()}`)
    .then((res) => {
      setData(res?.data?.items);
    })
    .catch((err) => {
      alert("hay")
      toast.error(err.message || t("Something went wrong!"));
    })
    .finally(() => {
      setLoading(false);
    });
  } catch (error) {
    alert("hay")
  }
  };

  const onSubmit = (
    values: { startDate: Date; endDate: Date },
    { setSubmitting }: FormikHelpers<FormikValues>
  ) => {
    getData(id, values.startDate, values.endDate).finally(() => {
      setSubmitting(false);
    });
  };

  if (loading || companyLoading) {
    return <Loading />;
  }

  const totalProfit = data?.reduce((acc, item) => acc + item.profiy, 0) || 0;
  const totalBuyingPrice =
    data?.reduce((acc, item) => acc + item.buyingPrice, 0) || 0;
  const totalSellingPrice =
    data?.reduce((acc, item) => acc + item.sellingPrice, 0) || 0;
  const title = data[0]?.type;
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
                onClick={()=>handleDownload(id)}
                
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
        <div className="flex justify-center items-center mb-4">
          <div>
            <h1 className="text-3xl mb-2 text-center font-semibold text-gray-900 dark:text-gray-100">
              {t("Profit Report")}
            </h1>
            <h1 className="text-xl text-center font-semibold text-gray-900/80 dark:text-gray-100">
              {t(title)}
            </h1>
          </div>
        </div>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            startDate: defaultStartDate,
            endDate: defaultEndDate,
          }}
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
                {columns.map((column) => (
                  <TableHead key={column.name}>{t(column.label)}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => {
                    const value = String(row[column.name]).toLowerCase();

                    let url = "";
                    if (value.startsWith("pl")) {
                      url = `/panel/aviabiletsale/report?tickets=${row["invoiceId"]}`;
                    } else if (value.startsWith("cp")) {
                      url = `/panel/cooperativeTicket/report?tickets=${row["invoiceId"]}`;
                    } else if (value.startsWith("itp")) {
                      url = `/panel/individualTourPackage/report?tickets=${row["invoiceId"]}`;
                    } else if (value.startsWith("tp")) {
                      url = `/panel/tourPackage/report?tickets=${row["invoiceId"]}`;
                    } else {
                      url = `/panel/otherService/report?tickets=${row["invoiceId"]}`;
                    }

                    return (
                      <TableCell key={column.name} className="py-1.5">
                        {
                          column.name === "ref" ? (
                            <Link
                              style={{ color: "blue", cursor: "pointer" }}
                              to={url}
                              target="_blank"
                            >
                              {value}
                            </Link> // URL'yi link olarak kullan
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
                <TableCell className="py-2" colSpan={3}>
                  {t("Total Amount")}
                </TableCell>
                <TableCell className="py-2">{totalBuyingPrice}</TableCell>
                <TableCell className="py-2">{totalSellingPrice}</TableCell>
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
