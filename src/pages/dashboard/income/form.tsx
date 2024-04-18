import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { InputLabel } from "@mui/material";
import { TFunction } from "i18next";
import { useState } from "react";

import { MassIncomeEditSchema, MassIncomeSchema } from "./schema";
import { IIncomeModel } from "./types";
import { textStyling } from "@/styles";

import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";
import CustomMultiSelect from "@/components/custom/multiSelect";
import CustomTextField from "@/components/custom/input";
import CustomSelect from "@/components/custom/select";
import { Input } from "@/components/ui/input";
import { FaLink } from "react-icons/fa6";
import CustomDateTimePicker from "@/components/custom/datePicker";

const getTicketTypeOptions = (t: TFunction<"translation", undefined>) => [
  { label: t("Aviabilet satışı"), value: "aviabiletSale" },
  { label: t("Korperativ satış"), value: "cooperativeTicket" },
  { label: t("Individual Tur paket"), value: "individualTourPackage" },
  { label: t("İndividual tur satışı"), value: "tourPackage" },
  { label: t("Digər xidmətlər"), value: "otherService" },
];

type InvoiceItem = {
  invoiceNo: string;
  id: number;
  debt: number;
};

type FormType = "Edit" | "Create";

interface IMassIncomeFormProps {
  formType: FormType;
  initialValues: IIncomeModel;
  onSubmit: (
    values: IIncomeModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const MassIncomeForm = ({
  initialValues,
  onSubmit,
  formType,
}: IMassIncomeFormProps) => {
  const isEdit = formType === "Edit";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

  const getOptions = (options: InvoiceItem[]) => {
    setInvoiceItems(options);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={isEdit ? MassIncomeEditSchema : MassIncomeSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="pt-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 items-center">
            {!isEdit && (
              <>
                <div className="w-full">
                  <CustomSelect
                    label={t("Bilet növü")}
                    optionLabel="name"
                    value={values.ticketType ?? null}
                    change={(value) => {
                      setFieldValue("invoiceIds", []);
                      setFieldValue(`ticketType`, value ?? null);
                    }}
                    hasErrorMessages={
                      !!errors.ticketType && !!touched.ticketType
                    }
                    staticOptions={getTicketTypeOptions(t)}
                    errorMessages={[t(errors.ticketType?.toString())]}
                  />
                </div>
                <div className="w-full relative">
                  <CustomAutocompleteSelect
                    api="Personals/GetAll/1"
                    label={t("personal")}
                    optionLabel="fullName"
                    value={values.personalId ?? null}
                    change={(value) =>
                      setFieldValue(`personalId`, value ?? null)
                    }
                    hasErrorMessages={
                      !!errors.personalId && !!touched.personalId
                    }
                    errorMessages={[t(errors.personalId?.toString())]}
                  />
                </div>
                <div className="w-full relative">
                  <CustomAutocompleteSelect
                    api="Customers/GetAll/1"
                    label={t("customer")}
                    disabled={isEdit}
                    value={values.customerId ?? null}
                    optionLabel="fullName"
                    change={(value) => {
                      setFieldValue("invoiceIds", []);
                      setFieldValue("customerId", value ?? null);
                    }}
                    hasErrorMessages={
                      !!errors.customerId && !!touched.customerId
                    }
                    errorMessages={[t(errors.customerId?.toString())]}
                  />
                </div>
              </>
            )}
            {isEdit && (
              <>
                <div className="w-full flex flex-col mb-5">
                  <InputLabel sx={{ mb: 1 }} style={textStyling}>
                    {t("customer")}
                  </InputLabel>
                  <Input value={values.customer} disabled />
                </div>
                <div className="w-full flex flex-col mb-5">
                  <InputLabel sx={{ mb: 1 }} style={textStyling}>
                    {t("Invoice")}
                  </InputLabel>
                  <Input value={values.invoiceNo} disabled />
                </div>
              </>
            )}
            {!isEdit && !!values.ticketType && !!values.customerId && (
              <div
                className="w-full"
                key={`ticket-${values.ticketType}-${values.customerId}`}
              >
                <CustomMultiSelect
                  secondaryOptionLabel="debt"
                  api={`Invoices/GetAll?customerId=${values.customerId}&ticketType=${values.ticketType}`}
                  label={t("Invoice")}
                  value={values.invoiceIds ?? []}
                  change={(value) => {
                    setFieldValue("invoiceIds", value);
                    const debt = invoiceItems
                      .filter((i) => value.find((v) => +v.value === i.id))
                      .reduce((acc, curr) => acc + curr.debt, 0);
                    setFieldValue("debt", debt);
                  }}
                  getOptions={getOptions}
                  hasErrorMessages={!!errors.invoiceIds && !!touched.invoiceIds}
                  errorMessages={[t(errors.invoiceIds?.toString())]}
                  closeMenuOnSelect={false}
                  optionLabel="invoiceNo"
                />
              </div>
            )}
            {values.invoiceIds?.length > 0 && (
              <>
                <div className="w-full">
                  <CustomTextField
                    disabled
                    name="debt"
                    type="text"
                    label={t("Borc")}
                    value={values.debt}
                    change={handleChange}
                    hasErrorMessages={!!errors.debt && !!touched.debt}
                    errorMessages={[t(errors.debt?.toString())]}
                  />
                </div>
                <div className="w-full">
                  <CustomAutocompleteSelect
                    api="Payments/GetAll/1"
                    label={t("Ödəniş növü")}
                    value={values.paymentId ?? null}
                    optionLabel="type"
                    change={(value) => setFieldValue("paymentId", value)}
                    hasErrorMessages={!!errors.paymentId && !!touched.paymentId}
                    errorMessages={[t(errors.paymentId?.toString() ?? "")]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    label={t("Ödənilən məbləğ")}
                    value={values.paidAmount}
                    change={handleChange}
                    type="number"
                    name={`paidAmount`}
                    hasErrorMessages={
                      !!errors.paidAmount && !!touched.paidAmount
                    }
                    errorMessages={[t(errors.paidAmount?.toString())]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    disabled
                    label={t("Qalıq məbləğ")}
                    value={Math.max(values.debt - values.paidAmount, 0)}
                    change={() => 0}
                    type="number"
                    name={``}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    name="description"
                    type="text"
                    label={t("Description")}
                    value={values.description}
                    change={handleChange}
                    hasErrorMessages={
                      !!errors.description && !!touched.description
                    }
                    errorMessages={[t(errors.description?.toString())]}
                  />
                </div>
                <div className="w-full h-full">
              <CustomDateTimePicker
                label={t("date")}
                value={values.date}
                toDate={new Date()}
                change={(data) => {
                  setFieldValue("date", data ?? new Date());
                }}
                hasErrorMessages={!!errors.date && !!touched.date}
                errorMessages={[t(errors.date?.toString())]}
              />
            </div>
              </>
            )}
          </div>
          <div className="w-full flex  gap-x-6 gap-y-3 justify-between mb-6">
            <div className="flex gap-2 flex-wrap">
              {values.ticketType &&
                values.invoiceIds?.map((invoice) => (
                  <Link
                    to={`/panel/${values.ticketType}/report?tickets=${invoice.value}`}
                    key={invoice.value}
                    className=" py-2 px-2.5 rounded-lg  hover:border-blue-600 border border-solid border-blue-400 flex items-center gap-x-2"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                    }}
                    target="_blank"
                  >
                    <FaLink className="text-blue-600" />
                    {invoice.label.split("~")[0]}
                  </Link>
                ))}
            </div>
            <div className="min-w-60">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => navigate("/panel/income")}
                className="p-2 bg-gray-600 text-white rounded-md uppercase hover:bg-blue-500 tracking-widest transition shadow-lg disabled:opacity-70"
              >
                {t("goBack")}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="p-2 bg-blue-600 text-white rounded-md uppercase hover:bg-blue-500 tracking-widest transition shadow-lg disabled:opacity-70"
              >
                {t("confirm")}
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default MassIncomeForm;
