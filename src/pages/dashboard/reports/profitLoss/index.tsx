import { Button, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FiDownload } from "react-icons/fi";

import Loading from "@/components/custom/loading";
import { useContext, useEffect, useState } from "react";
import { apiService } from "@/server/apiServer";

import { toast } from "sonner";
import { Formik, FormikHelpers, FormikValues } from "formik";
import CustomDateTimePicker from "@/components/custom/datePicker";
import { ClipLoader } from "react-spinners";
import { cn, formatDate } from "@/lib/utils";
import { CompanyContext } from "@/store/CompanyContext";

const formatPrice = (price: number) => {
  return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

const Detail = () => {
  const { t } = useTranslation();
  const { loading: companyLoading, company } = useContext(CompanyContext);
  const [loading, setLoading] = useState(true);
  // date from first day of year

  const [date, setDate] = useState<Date[]>([
    new Date(new Date().getFullYear(), 0, 1),
    new Date(),
  ]);
  const [data, setData] = useState<{
    totslPurchase: number;
    totalSale: number;
    bonuces: number;
    paidSalary: number;
    expenduture: number;
    refund: number;
  }>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async (startDate?: Date, endDate?: Date) => {
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.append("startDate", startDate?.toISOString());
    if (endDate) searchParams.append("endDate", endDate?.toISOString());
    await apiService
      .get(`/Reports/Profit?${searchParams.toString()}`)
      .then(({ data }) => {
        setData(data.res);
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
    getData(values.startDate, values.endDate).finally(() => {
      setSubmitting(false);
    });
    setDate([values.startDate, values.endDate]);
  };

  if (loading || companyLoading) {
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
            </Grid>
            <Typography variant="h4" gutterBottom align="right">
              {company.name}
            </Typography>
            <Typography gutterBottom align="right">
              Email: {company.email} | Tel: {company.phoneNumber}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Container maxWidth="xl" style={{ paddingRight: 0, marginTop: 30 }}>
        <div className="flex justify-center items-center mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {t("Profit Loss")}
            </h1>
          </div>
        </div>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            startDate: null,
            endDate: null,
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

        <div className="flex w-full max-w-[1000px]  mx-auto border-2 border-solid border-black">
          <div className="w-1/2 border-r-2 border-solid border-black">
            <div className="flex justify-between items-center border-b-2 border-solid border-black px-4">
              <h3 className="text-lg font-bold">Particulars</h3>
              <p className="text-sm">
                {`${formatDate(date[0].toISOString())} to ${formatDate(
                  date[1].toISOString()
                )}`}
              </p>
            </div>
            <div className="px-4 py-6">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-base">Purchase Accounts</h4>
                <p className="font-bold">{formatPrice(data.totslPurchase)}</p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <h4 className="text-base">Gross Profit c/o</h4>
                <p>{formatPrice(data.totalSale - data.totslPurchase)}</p>
              </div>
              <div className="flex justify-end mt-3">
                <p className="min-w-24 text-end border-y-2 border-solid border-black font-bold">
                  {formatPrice(data.totalSale)}
                </p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <h4 className="font-bold text-base">Indirect Expenses</h4>
                <p className="font-bold">
                  {formatPrice(data.expenduture + data.paidSalary)}
                </p>
              </div>
              <div className="pl-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-base">Total Expenduture</h4>
                  <p>{formatPrice(data.expenduture)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h4 className="text-base">Total Paid Salary</h4>
                  <p>{formatPrice(data.paidSalary)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <h4 className="text-base">Nett Profit</h4>
                <p>
                  {formatPrice(
                    data.totalSale -
                      data.totslPurchase -
                      data.expenduture -
                      data.paidSalary +
                      data.refund +
                      data.bonuces
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center border-t-2 border-solid border-black px-4">
              <h3 className="text-lg font-bold">Total</h3>
              <p className="text-sm">
                {formatPrice(
                  data.totalSale -
                    data.totslPurchase -
                    data.expenduture -
                    data.paidSalary +
                    data.refund +
                    data.bonuces
                )}
              </p>
            </div>
          </div>
          <div className="w-1/2 ">
            <div className="flex justify-between items-center border-b-2 border-solid border-black px-4">
              <h3 className="text-lg font-bold">Particulars</h3>
              <p className="text-sm">
                {`${formatDate(date[0].toISOString())} to ${formatDate(
                  date[1].toISOString()
                )}`}
              </p>
            </div>
            <div className="px-4 py-6">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-base">Sales Accounts</h4>
                <p className="font-bold">{formatPrice(data.totalSale)}</p>
              </div>

              <div className="flex justify-end mt-12">
                <p className="min-w-24 text-end border-y-2 border-solid border-black font-bold">
                  {formatPrice(data.totalSale)}
                </p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <h4 className="font-bold text-base">Gross Profit b/f</h4>
                <p className="font-bold">
                  {formatPrice(data.totalSale - data.totslPurchase)}
                </p>
              </div>
              <div className="pl-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-base">Total Refund Margin</h4>
                  <p>{formatPrice(data.refund)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h4 className="text-base">Total Incentive Recieved</h4>
                  <p>{formatPrice(data.bonuces)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <h4 className="text-base">Nett Loss</h4>
                <p>0</p>
              </div>
            </div>
            <div className="flex justify-between items-center border-t-2 border-solid border-black px-4">
              <h3 className="text-lg font-bold">Total</h3>
              <p className="text-sm">
                {formatPrice(
                  data.totalSale -
                    data.totslPurchase -
                    data.expenduture -
                    data.paidSalary +
                    data.refund +
                    data.bonuces
                )}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Detail;
