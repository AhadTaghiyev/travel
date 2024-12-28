// @ts-nocheck
import {
  Button,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
} from "@mui/material";
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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Formik, FormikHelpers, FormikValues } from "formik";
import CustomDateTimePicker from "@/components/custom/datePicker";
import { ClipLoader } from "react-spinners";
import { cn, formatDate, toLocalISOString } from "@/lib/utils";
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
import { YearContext } from "@/store/YearContext";
import { textStyling } from "@/styles";
import axios from "axios";
import { DEFAULT_YEAR, SERVER_BASE_URL } from "@/constants";
import { DeleteIcon, EditIcon, SaveIcon, X } from "lucide-react";
import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";
import CustomMultiSelect from "@/components/custom/multiSelect";
import CustomSelect from "@/components/custom/select";
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { toLocalISOStringV2 } from "@/lib/utils";

const columns = [
  { label: "Id", name: "id" },
  { label: "Təchizatçı", name: "supplierName" },
  { label: "Created Date", name: "date", type: "date" },
  { label: "Payment Date", name: "paymentDate", type: "date" },
  { label: "Invoice Number", name: "invoiceNo" },
  { label: "Ref", name: "ref" },
  { label: "Detail", name: "details" },
  { label: "Debit", name: "debit" },
  { label: "Credit", name: "credit" },
  { label: "balance", name: "balance" },
  { label: "Customer Name", name: "customerName" },
  { label: "Paid Amount", name: "paidAmount" },
  { label: "operations" },
];

const Detail = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [selectedRef, setSelectedRef] = useState(true);
  const { loading: companyLoading, company } = useContext(CompanyContext);
  const { selectedYear } = useContext(YearContext);
  const [paymentTypes, setPaymentTypes] = useState<
    { label: string; value: string }[] | null
  >(null);
  const [customers, setCustomers] = useState<
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
      paymentDate: string;
    }[]
  >();
  const [date, setDate] = useState<{ startDate: string; endDate: string }>();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const today = new Date(); // Bugünün tarihi
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1); // Yılın ilk günü (January 1)
  const [defaultStartDate, setDefaultStartDate] = useState(new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : selectedYear, 0, 1));
  const [defaultEndDate, setDefaultEndDate] = useState(new Date(String(selectedYear) === "All" ? new Date().getFullYear() : selectedYear, 11, 31));
  // const defaultStartDate = selectedYear
  //   ? new Date(selectedYear, 0, 1) // Eğer localStorage'da varsa bu değer kullanılır
  //   : searchParams.get("startDate")
  //     ? new Date(searchParams.get("startDate") as string) // Eğer `searchParams`'da varsa bu değer kullanılır
  //     : firstDayOfYear; // Eğer startDate gelmezse yılın ilk günü

  // const defaultEndDate = searchParams.get("endDate")
  //   ? new Date(searchParams.get("endDate") as string)
  //   : today; // Eğer endDate gelmezse bugünün tarihi

  const [editId, setEditId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editPaymentDate, setEditPaymentDate] = useState("");

  useEffect(() => {
    // setDate({ startDate: new Date(selectedYear, 0, 1), endDate: new Date() })
    setDefaultStartDate(new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : selectedYear, 0, 1));
    setDefaultEndDate(new Date(String(selectedYear) === "All" ? new Date().getFullYear() : selectedYear, 11, 31));
  }, [selectedYear])

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

  const handleDownload = async (id) => {
    try {
      const token = localStorage.getItem("token");
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
      console.log(date);

      const promise = axios.get(
        `${SERVER_BASE_URL}/reports/SupplierReportDetailExport/${id}?isExport=true&language=${localStorage.getItem("language") || "en"}`,
        config
      );

      toast.promise(promise, {
        loading: "Loading...",
      });

      const response = await promise;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `SupplierReportDetail.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("An error occurred while downloading the data: ", error);
    }
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

      const selectedRef = data?.find(item => item.debit === 0);
      setSelectedRef(selectedRef);


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
        ? `/WillBePaids/EditPay/${id}?amount=${editAmount}&paymentDate=${toLocalISOStringV2(editPaymentDate)}`
        : `/WillBePaids/Edit/${id}?amount=${editAmount}&paymentDate=${toLocalISOStringV2(editPaymentDate)}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // API isteğini yap
      const response = await toast.promise(
        axios.put(`${SERVER_BASE_URL}${uri}`, null, config),
        {
          loading: "Loading...",
          success: "Successfully updated",
          error: "Error occurred while updating",
        }
      );

      console.log("API Response:", response.data);

      // State'i anlık olarak güncelle
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? {
              ...item,
              paymentDate: toLocalISOStringV2(editPaymentDate),
              [isWp ? "debit" : "credit"]: Number(editAmount),
            }
            : item
        )
      );

      setEditId(null); // Düzenleme modunu kapat
      setEditAmount(""); // Alanı sıfırla
      setEditPaymentDate(""); // Tarihi sıfırla
    } catch (error) {
      console.error("An error occurred while updating the data: ", error);
      toast.error("An error occurred while updating the data");
    }
  };

  const onCancel = () => {
    setEditId(null);
    setEditAmount("");
    setEditPaymentDate("");
  };

  const handleAmountChange = (event) => {
    setEditAmount(event.target.value);
  };

  const getData = async (id: number, startDate?: Date, endDate?: Date) => {
    const searchParams = new URLSearchParams();
    if (startDate)
      searchParams.append("startDate", toLocalISOString(startDate));
    if (endDate) searchParams.append("endDate", toLocalISOString(endDate));
    setData([]);
    setDate({
      startDate: startDate ? toLocalISOString(startDate) : null,
      endDate: endDate ? toLocalISOString(endDate) : null
    });
    await apiService
      .get(`/Reports/SupplierReportDetail/${id}?${searchParams.toString()}`)
      .then((res) => {
        const items = res.data.items.map((item) => ({
          ...item,
          total: item.debit + item.credit + item.balance,
        }));
        setData(items);
        const selectedRef = items?.find(item => item.debit === 0);
        setSelectedRef(selectedRef);
        const customersData = res.data.customers
          .map((x) => ({
            label: x.customerName,
            value: x.customerId,
          }))
          .filter((item) => item.label && item.value);

        setCustomers(customersData);
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

  // const totalDebit = data?.reduce((acc, item) => acc + item.debit, 0) || 0;
  // const totalCredit = data?.reduce((acc, item) => acc + item.credit, 0) || 0;
  // const totalBalance = data?.reduce((acc, item) => acc + item.balance, 0) || 0;
  // const total = data?.reduce((acc, item) => acc + item.total, 0) || 0;

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
              {`${t("Təchizatçı")} ${t("Ödəniləcək")}`}
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
                <div
                  className={cn("w-52", !values.startDate && "removeFromPrint")}
                >
                  <CustomDateTimePicker
                    label={t("Start Date")}
                    value={values.startDate || defaultStartDate}
                    change={(data) => {
                      setFieldValue("startDate", data);
                    }}
                    hasErrorMessages={false}
                    errorMessages={[]}
                    showTime={false}
                    isStartDate={true}
                  />
                </div>
                <div className={cn("w-52", !values.endDate && "removeFromPrint")}>
                  <CustomDateTimePicker
                    label={t("End Date")}
                    value={values.endDate || defaultEndDate}
                    change={(data) => {
                      console.log("data", data);
                      setFieldValue("endDate", data);
                    }}
                    hasErrorMessages={false}
                    errorMessages={[]}
                    showTime={false}
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
        {data && data.length > 0 && (
          <PayAction id={selectedRef ? selectedRef.id : null} paymentTypeOptions={paymentTypes} customers={customers} supplierId={id} getData={getData} defaultStartDate={defaultStartDate} defaultEndDate={defaultEndDate} />
        )}
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
                  <TableHead className="bg-[#3275BB] text-[#fff] border-white" key={column.name}>{t(column.label)}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data.map((row) => {
                  return (<TableRow key={row.id}>
                    {columns.map((column) =>
                      column.name ? (
                        <TableCell key={column.name} className="py-1.5">
                          {column.name === "paymentDate" && row[column.name] === "0001-01-01T00:00:00"
                            ? ""
                            : column.type === "date"
                              ? formatDate(row?.[column.name])
                              : t(row?.[column.name])}
                        </TableCell>
                      ) : (
                        <TableCell key="operations" className="py-1.5">
                          {row.details !== "Initial Balance" ? ( // Initial Balance kontrolü
                            editId === row.id ? (
                              <div
                                style={{ display: "flex", alignItems: "center" }}
                              >
                                <input
                                  type="number"
                                  autoFocus={true}
                                  value={editAmount}
                                  onChange={handleAmountChange}
                                  style={{
                                    marginRight: "8px",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                    backgroundColor: "#fff",
                                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                                  }}
                                />
                                <CustomDateTimePicker
                                  value={editPaymentDate}
                                  change={(data) => {
                                    setEditPaymentDate(data);
                                  }}
                                  hasErrorMessages={false}
                                  errorMessages={[]}
                                />
                                <IconButton
                                  onClick={() =>
                                    onEdit(row.id, row.debit !== 0, row)
                                  }
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
                                <IconButton
                                  onClick={() =>
                                    onDelete(row.id, row.debit !== 0)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            )
                          ) : null}
                        </TableCell>
                      )
                    )}
                  </TableRow>)

                })}
            </TableBody>
            {/* <TableFooter className="w-full">
              <TableRow className="w-full">
                <TableCell className="py-2" colSpan={4}>
                  {t("Total Amount")}
                </TableCell>
                <TableCell className="py-2">{totalDebit}</TableCell>
                <TableCell className="py-2">{totalCredit}</TableCell>
                <TableCell className="py-2">{totalBalance}</TableCell>
                <TableCell className="py-2">{total}</TableCell>
              </TableRow>
            </TableFooter> */}
          </Table>
        </Grid>
      </Container>
    </Container >
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
  customers,
  supplierId,
  getData,
  defaultStartDate,
  defaultEndDate
}: {
  paymentTypeOptions: { value: string; label: string }[];
  customers: { value: string; label: string }[];
  id: string;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const fetchInvoices = async (customerId: string, ticketType: string | null) => {
    if (!customerId) return;
    try {
      const response = await apiService.get(
        `Invoices/GetAll?customerId=${customerId}&ticketType=${ticketType}&supplierId=${supplierId}`
      );
      setInvoiceItems(response.data.items || []);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      toast.error(t("Failed to fetch invoices"));
    }
  };

  const getTicketTypeOptions = (t: TFunction<"translation", undefined>) => [
    { label: t("Aviabilet satışı"), value: "aviabiletSale" },
    { label: t("Korperativ satış"), value: "cooperativeTicket" },
    { label: t("İndividual tur satışı"), value: "individualTourPackage" },
    { label: t("Tur paket satışı"), value: "tourPackage" },
    { label: t("Digər xidmətlər"), value: "otherService" },
  ];

  const onSubmit = (
    values: { amount: number; paymentId: string, invoiceIds: { label: string, value: number }[], paymentDate: string, ticketType: { label: string, value: string } },
    { setSubmitting }: FormikHelpers<FormikValues>
  ) => {
    if (!id) {
      alert(
        "You cannot make a payment. Please refresh the page or adjust the date so that one of the IV numbers appears in the list."
      );
      return;
    }

    if (values.ticketType) {
      const payload = {
        amount: values.amount,
        paymentId: values.paymentId,
        date: toLocalISOStringV2(values.paymentDate || new Date()),
        invoiceIds: values.invoiceIds.map((item) => item.value), // Sadece ID'leri gönderiyoruz
      };

      apiService
        .post(`/WillBePaids/CreateV2`, payload)
        .then(() => {
          toast.success(t("Mədaxil yaradıldı"));
          setSubmitting(false);
          getData(parseInt(supplierId), defaultStartDate, defaultEndDate);
          // navigate(-1);
        })
        .catch((err) => {
          toast.error(err.message || t("Something went wrong!"));
        });
    } else {
      apiService
        .post(
          `/WillBePaids/CreateV1/${id}?amount=${values.amount}&paymentId=${values.paymentId}&supplierId=${supplierId}&date=${toLocalISOStringV2(values.paymentDate || new Date())}`,
          {}
        )
        .then(() => {
          toast.success(t("Mədaxil yaradıldı"));
          setSubmitting(false);
          getData(parseInt(supplierId), defaultStartDate, defaultEndDate);
          // navigate(-1);
        })
        .catch((err) => {
          toast.error(err.message || t("Something went wrong!"));
        });
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{ amount: 0, paymentId: "", customerId: "", ticketType: "" }}
      validationSchema={amountValidationSchema}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        setFieldValue,
        isSubmitting,
        errors,
        touched,
      }) => {
        const totalDebt = invoiceItems
          .filter((item) =>
            values.invoiceIds.find((selected) => selected.value === item.id)
          )
          .reduce((acc, item) => acc + item.debt, 0);
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row items-start gap-x-2">
              <div className="w-52">
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ mb: 1 }}
                  style={textStyling}
                >
                  {t("Payment Types")}
                </InputLabel>
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
              </div>
              <div
                className="w-52"
              >
                <CustomDateTimePicker
                  label={t("Payment Date")}
                  value={values.paymentDate}
                  change={(data) => {
                    setFieldValue("paymentDate", data);
                  }}
                  hasErrorMessages={false}
                  errorMessages={[]}
                />
              </div>
              <div className="w-52">
                <CustomSelect
                  label={t("Bilet növü")}
                  optionLabel="name"
                  value={values.ticketType ?? null}
                  change={(value) => setFieldValue("ticketType", value ?? null)}
                  staticOptions={getTicketTypeOptions(t)}
                />
              </div>
              {values.ticketType && (
                <div className="w-52">
                  <div className="block md:hidden">
                    <CustomSelect
                      label={t("Customer")}
                      optionLabel="Customer"
                      value={customers ?? null}
                      change={(value) => setFieldValue("customerId", value)}
                      staticOptions={customers}
                    />
                  </div>
                  <div className="hidden md:block">
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ mb: 1 }}
                      style={textStyling}
                    >
                      {t("Customer")}
                    </InputLabel>
                    <Select
                      onValueChange={(v) => setFieldValue("customerId", v)}
                      open={open}
                      onOpenChange={setOpen}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            values.customerId
                              ? customers?.find((option) => option.value === values.customerId)?.label
                              : t("Select option")
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <Command>
                          <CommandInput
                            placeholder={t("Search customers...")}
                            className="h-10"
                          />
                          <CommandGroup>
                            {customers?.map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={() => {
                                  console.log("value", option.value);
                                  console.log("customerId", values.customerId);

                                  setFieldValue("customerId", option.value);
                                  setOpen(false);
                                }}
                                className={`${option.value === values.customerId
                                  ? "bg-blue-500 text-white"
                                  : "hover:bg-gray-100 text-gray-900"
                                  }`}
                              >
                                {option.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              {values.customerId && (
                <>
                  <div className="w-52">
                    <CustomMultiSelect
                      isMultiSelect={true}
                      secondaryOptionLabel="debt"
                      optionLabel="invoiceNo"
                      options={invoiceItems.map((item) => ({
                        label: item.invoiceNo,
                        value: item.id,
                      }))}
                      api={
                        values.customerId
                          ? `Invoices/GetAll?customerId=${values.customerId}&ticketType=${values.ticketType || ""}&supplierId=${supplierId}`
                          : ""
                      }
                      dependencies={[values.customerId, values.ticketType]}
                      label={t("Invoice")}
                      loading={!invoiceItems.length}
                      value={values.invoiceIds ?? []}
                      change={(value) => {
                        console.log("value", value);
                        setFieldValue("invoiceIds", value);
                        const debt = invoiceItems
                          .filter((i) => value.find((v) => +v.value === i.id))
                          .reduce((acc, curr) => acc + curr.debt, 0);
                        setFieldValue("debt", debt);
                        const totalDebt = value.reduce((sum, item) => sum + (item.debt || 0), 0); // Toplam hesaplama
                        setFieldValue("totalDebt", totalDebt);
                      }}
                      hasErrorMessages={!!errors.invoiceIds && !!touched.invoiceIds}
                      filterFunction={(item) => item["debt"] > 0}
                    />
                  </div>
                  <div className="w-28">
                    <InputLabel id="total-debt-label" style={textStyling}>
                      {t("Total")}
                    </InputLabel>
                    <CustomTextField
                      name="totalDebt"
                      type="number"
                      value={values.totalDebt || 0}
                      disabled
                      hasErrorMessages={false}
                    />
                  </div>
                </>

              )}
              <div className="pt-4 onlyPrint">
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ mb: 1 }}
                  style={textStyling}
                >
                  {t("Məbləğ")}
                </InputLabel>
                {values.amount}
              </div>
              <div className="w-28 removeFromPrint">
                <InputLabel id="demo-simple-select-label" style={textStyling}>
                  {t("Məbləğ")}
                </InputLabel>
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
                className="p-2 px-4 mt-6 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500 tracking-widest transition shadow-lg disabled:opacity-70 flex gap-x-2 items-center removeFromPrint"
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
        );
      }}
    </Formik>
  );
};

export default Detail;
