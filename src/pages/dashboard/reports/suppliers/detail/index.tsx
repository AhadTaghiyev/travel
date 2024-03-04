import { Button, Container, FormHelperText, Grid } from "@mui/material";
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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Formik, FormikHelpers, FormikValues } from "formik";
import CustomDateTimePicker from "@/components/custom/datePicker";
import { ClipLoader } from "react-spinners";
import { cn, formatDate } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isNil } from "lodash";
import CustomTextField from "@/components/custom/input";
import * as Yup from "yup";
import { CompanyContext } from "@/store/CompanyContext";

const columns = [
  { label: "Id", name: "id" },
  { label: "Date", name: "date", type: "date" },
  { label: "Ref.", name: "ref" },
  { label: "Details.", name: "details" },
  { label: "Debit", name: "debit" },
  { label: "Credit", name: "credit" },
  { label: "Balance", name: "balance" },
];

const Detail = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { loading: companyLoading, company } = useContext(CompanyContext);
  const [paymentTypes, setPaymentTypes] = useState<
    { label: string; value: string }[] | null
  >(null);
  const [data, setData] = useState<
    {
      id: string;
      name: string;
      balance: number;
      total: number;
      credit: number;
      debit: number;
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

  const fetchData = async () => {
    const res = await apiService.get("Payments/GetAll/1");

    const data = res.data.items
      .map((x) => ({
        label: x.type,
        value: x.id,
      }))
      .filter((item) => item.label && item.value);

    setPaymentTypes(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getData(parseInt(id), defaultStartDate, defaultEndDate);
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

  if (loading || companyLoading) {
    return <Loading />;
  }

  const totalDebit = data?.reduce((acc, item) => acc + item.debit, 0) || 0;
  const totalCredit = data?.reduce((acc, item) => acc + item.credit, 0) || 0;
  const totalBalance = data?.reduce((acc, item) => acc + item.balance, 0) || 0;
  const total = data?.reduce((acc, item) => acc + item.total, 0) || 0;

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
            <img src={company.image} style={{ width: "100%" }} />
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
                <TableHead></TableHead>
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
                    <TableCell className="w-48 py-0">
                      <PayAction
                        paymentTypeOptions={paymentTypes}
                        id={row.id}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter className="w-full">
              <TableRow className="w-full">
                <TableCell className="py-2" colSpan={4}>
                  {t("Total Amount")}
                </TableCell>
                <TableCell className="py-2">{totalDebit}</TableCell>
                <TableCell className="py-2">{totalCredit}</TableCell>
                <TableCell className="py-2">{totalBalance}</TableCell>
                <TableCell className="py-2">{total}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Grid>
      </Container>
    </Container>
  );
};

const amountValidationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Məbləğ daxil edin")
    .min(1, "Məbləğ mənfi ola bilməz"), // Hola
  paymentId: Yup.string().required("Ödəniş növünü seçin"), // Hola
});

export const PayAction = ({
  id,
  paymentTypeOptions,
}: {
  paymentTypeOptions: { value: string; label: string }[];
  id: string;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = (
    values: { amount: number; paymentId: string },
    { setSubmitting }: FormikHelpers<FormikValues>
  ) => {
    apiService
      .post(
        `/WillBePaids/Create/${id}?amount=${values.amount}&paymentId=${values.paymentId}`,
        {}
      )
      .then(() => {
        toast.success(t("Mədaxil yaradıldı"));
        setSubmitting(false);
        navigate(-1);
      })
      .catch((err) => {
        toast.error(err.message || t("Something went wrong!"));
      });
  };
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{ amount: 0, paymentId: "" }}
      validationSchema={amountValidationSchema}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        isSubmitting,
        setFieldValue,
        errors,
        touched,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex items-start gap-x-2">
            <div className="w-32 mt-2">
              <Select
                onValueChange={(v) => setFieldValue("paymentId", v)}
                defaultValue={String(values.paymentId)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("Select option")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value={null}
                    disabled={true}
                    className="hidden last:block"
                  >
                    {isNil(paymentTypeOptions)
                      ? t("Loading...")
                      : t("No item found")}
                  </SelectItem>
                  {paymentTypeOptions?.map((option) => (
                    <SelectItem
                      value={String(option.value)}
                      key={String(option.value)}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!!errors.paymentId && !!touched.paymentId ? (
                <>
                  {[t(errors.paymentId?.toString())]?.map((item, key) => (
                    <FormHelperText
                      key={key}
                      sx={{ color: "red", margin: 0, height: 20 }}
                    >
                      {item}
                    </FormHelperText>
                  ))}
                </>
              ) : (
                <div className="w-full h-5 " />
              )}
            </div>
            <div className="pt-4 onlyPrint">{values.amount}</div>
            <div className="w-28 removeFromPrint">
              <CustomTextField
                name="amount"
                type="number"
                label={""}
                value={values.amount}
                placeholder={t("Məbləğ")}
                change={handleChange}
                hasErrorMessages={!!errors.amount && !!touched.amount}
                errorMessages={[t(errors.amount?.toString())]}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="p-2 mt-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500 tracking-widest transition shadow-lg disabled:opacity-70 flex gap-x-2 items-center removeFromPrint"
            >
              <ClipLoader
                size={14}
                color="white"
                loading={isSubmitting}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              {t("Ödə")} {/* Hola */}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Detail;
