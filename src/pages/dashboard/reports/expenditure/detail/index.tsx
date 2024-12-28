// @ts-nocheck
import { Formik, FormikHelpers, FormikValues } from "formik";
import {
  Button,
  Container,
  FormHelperText,
  Grid,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

import { apiService } from "@/server/apiServer";

import CustomDateTimePicker from "@/components/custom/datePicker";
import CustomTextField from "@/components/custom/input";
import Loading from "@/components/custom/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isNil } from "lodash";
import { CompanyContext } from "@/store/CompanyContext";
import { YearContext } from "@/store/YearContext";
import { DEFAULT_YEAR, SERVER_BASE_URL } from "@/constants";
import axios from "axios";
import { DeleteIcon, EditIcon, SaveIcon, X } from "lucide-react";
import { toLocalISOString } from "@/lib/utils";

const columns = [
  { label: "Ref.", name: "ref" },
  { label: "Ad", name: "name" },
  { label: "commonPrice", name: "credit" },
  { label: "Ödənilən məbləğ", name: "debit" },
  { label: "balance", name: "balance" },
  { label: "date", name: "date" },
  { label: "Qeyd", name: "note" },
  // { label: "Total", name: "total" },
];

const Detail = () => {
  const { loading: companyLoading, company } = useContext(CompanyContext);
  const { selectedYear } = useContext(YearContext);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
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
  const [date, setDate] = useState<{ startDate: string; endDate: string }>();
  const { id } = useParams<{ id: string }>();
  const [editId, setEditId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editPaymentAmount, setEditPaymentAmount] = useState("");

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
        `${SERVER_BASE_URL}/reports/ExpenditureReportDetailExport/${id}?startDate=${date.startDate}&endDate=${date.endDate}`,
        config
      );

      toast.promise(promise, {
        loading: "Loading...",
      });

      const response = await promise;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ExpenditureReportDetailItem.xlsx`);
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
      .get(`/Reports/ExpenditureReportDetail/${id}?${searchParams.toString()}`)
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

  const onCancel = () => {
    setEditId(null);
    setEditAmount("");
    setEditPaymentAmount("");
  };

  const onDelete = async (id, isWp) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is not found");
        return;
      }

      const uri = isWp
        ? `/WillBePaids/RmovePay/${id}`
        : `/WillBePaids/Delete/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await toast.promise(axios.delete(`${SERVER_BASE_URL}${uri}`, config), {
        loading: "Loading...",
        success: "Successfully deleted",
        error: "Error occurred while deleting",
      });

      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("An error occurred while deleting the data: ", error);
      toast.error("An error occurred while deleting the data");
    }
  };

  const onEdit = async (id, isWp, row) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is not found");
        return;
      }

      const uri = isWp
        ? `/WillBePaids/EditPay/${id}?amount=${editAmount}`
        : `/WillBePaids/Edit/${id}?amount=${editAmount}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await toast.promise(
        axios.put(`${SERVER_BASE_URL}${uri}`, null, config), // 'null' body'yi ifade eder çünkü body verisi yok
        {
          loading: "Loading...",
          success: "Successfully updated",
          error: "Error occurred while updating",
        }
      );

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? {
              ...item,
              [isWp ? "debit" : "credit"]: Number(editAmount),
            }
            : item
        )
      );

      setEditId(null);
    } catch (error) {
      console.error("An error occurred while updating the data: ", error);
      toast.error("An error occurred while updating the data");
    }
  };

  const handleAmountChange = (event) => {
    setEditAmount(event.target.value);
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
        <div className="flex justify-center items-center mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {`${t("Xərc")} ${t("Ödəniləcək")}`}
            </h1>
          </div>
        </div>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            startDate: new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : selectedYear, 0, 1),
            endDate: new Date(String(selectedYear) === "All" ? new Date().getFullYear() : selectedYear, 11, 31)
          }}
        >
          {({ values, handleSubmit, setFieldValue, isSubmitting }) => {
            useEffect(() => {
              setFieldValue("startDate", new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : selectedYear, 0, 1));
              setFieldValue("endDate", new Date(String(selectedYear) === "All" ? new Date().getFullYear() : selectedYear, 11, 31));
            }, [selectedYear, setFieldValue]);
            return (
              <form
                onSubmit={handleSubmit}
                className="pt-4 flex flex-wrap items-center gap-x-6"
              >
                <div className="w-52">
                  <CustomDateTimePicker
                    label={t("Start Date")}
                    value={values.startDate || new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : selectedYear, 0, 1)}
                    change={(data) => {
                      setFieldValue("startDate", data);
                    }}
                    hasErrorMessages={false}
                    errorMessages={[]}
                    isStartDate={true}
                  />
                </div>
                <div className="w-52">
                  <CustomDateTimePicker
                    label={t("End Date")}
                    value={values.endDate || new Date(String(selectedYear) === "All" ? new Date().getFullYear() : selectedYear, 11, 31)}
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
                <TableHead className="bg-[#3275BB] text-[#fff] border-white" key={"No"}>{t("No")}</TableHead>
                {columns.map((column) => (
                  <TableHead className="bg-[#3275BB] text-[#fff] border-white" key={column.name}>{t(column.label)}</TableHead>
                ))}
                <TableHead className="bg-[#3275BB] text-[#fff] border-white"></TableHead>
                <TableHead className="bg-[#3275BB] text-[#fff] border-white"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell key={"No"} className="py-1.5">
                      {index}
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.name} className="py-1.5">
                        {row?.[column.name]}
                      </TableCell>
                    ))}

                    <TableCell className="w-48 py-0">
                      <PayAction
                        paymentTypeOptions={paymentTypes}
                        id={row.id}
                      />
                    </TableCell>

                    <TableCell key="operations" className="py-1.5">
                      {editId === row.id ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <input
                            type="number"
                            autoFocus={true}
                            value={editAmount}
                            onChange={handleAmountChange}
                            style={{
                              marginRight: "8px",
                              padding: "8px", // Padding ekler
                              borderRadius: "4px", // Köşeleri yuvarlar
                              border: "1px solid #ccc", // Hafif gri bir kenarlık ekler
                              backgroundColor: "#fff", // Beyaz arka plan rengi
                              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)", // Hafif bir gölge ekler
                            }}
                          />
                          <IconButton
                            onClick={() => onEdit(row.id, false, row)}
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={onCancel}>
                            <X />
                          </IconButton>
                        </div>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => {
                              setEditId(row.id);
                              setEditAmount(row.amount || 0);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => onDelete(row.id, false)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter className="w-full">
              <TableRow className="w-full">
                <TableCell className="py-2" colSpan={2}>
                  {t("Total Amount")}
                </TableCell>
                <TableCell className="py-2"></TableCell>
                <TableCell className="py-2"></TableCell>
                <TableCell className="py-2">{totalCredit}</TableCell>
                <TableCell className="py-2">{totalDebit}</TableCell>
                <TableCell className="py-2">{totalBalance}</TableCell>
                {/* <TableCell className="py-2">{total}</TableCell> */}
                <TableCell className="py-2"></TableCell>
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
            <div className="w-28">
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
              className="p-2 mt-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500 tracking-widest transition shadow-lg disabled:opacity-70 flex gap-x-2 items-center"
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
