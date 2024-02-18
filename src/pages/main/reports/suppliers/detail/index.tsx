import { Button, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FiDownload } from "react-icons/fi";

import img from "@/assets/abc_home-1.jpg";
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
import { useEffect, useState } from "react";
import { apiService } from "@/server/apiServer";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Formik, FormikHelpers, FormikValues } from "formik";
import CustomDateTimePicker from "@/components/custom/datePicker";
import { ClipLoader } from "react-spinners";
import { formatDate } from "@/lib/utils";

const columns = [
  { label: "Id", name: "id" },
  { label: "Date", name: "date", type: "date" },
  { label: "Ref.", name: "ref" },
  { label: "Details.", name: "details" },
  { label: "Debit", name: "debit" },
  { label: "Credit", name: "credit" },
  { label: "Balance", name: "balance" },
  { label: "Total", name: "total" },
];

const Detail = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] =
    useState<{ id: string; name: string; balance: number }[]>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getData(parseInt(id));
  }, [id]);

  const getData = async (id: number, startDate?: Date, endDate?: Date) => {
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.append("startDate", startDate?.toISOString());
    if (endDate) searchParams.append("endDate", endDate?.toISOString());
    await apiService
      .get(`/Reports/SupplierReportDetail/${id}?${searchParams.toString()}`)
      .then((res) => {
        const items = res.data.items.map((item) => ({
          ...item,
          total: item.debit + item.credit + item.balance,
        }));
        setData(items);
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

  const total = data?.reduce((acc, item) => acc + item.balance, 0) || 0;

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
              <Button
                onClick={window.print}
                variant="text"
                color="inherit"
                sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
              >
                <FiDownload style={{ marginRight: "8px" }} /> {t("Print")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Container maxWidth="xl" style={{ paddingRight: 0, marginTop: 50 }}>
        <Formik
          onSubmit={onSubmit}
          initialValues={{ startDate: null, endDate: null }}
        >
          {({ values, handleSubmit, setFieldValue, isSubmitting }) => (
            <form
              onSubmit={handleSubmit}
              className="pt-4 flex flex-wrap items-center gap-x-6"
            >
              <div className="w-52">
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
              <div className="w-52">
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
                className="p-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500 tracking-widest transition shadow-lg disabled:opacity-70 flex gap-x-2 items-center"
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
              {data &&
                data.map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={column.name} className="py-1.5">
                        {column.type === "date"
                          ? formatDate(row?.[column.name])
                          : row?.[column.name]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter className="w-full">
              <TableRow className="w-full">
                <TableCell className="py-2" colSpan={columns.length - 1}>
                  {t("Total Amount")}
                </TableCell>
                <TableCell className="text-center py-2">{total}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Grid>
      </Container>
    </Container>
  );
};

export default Detail;
