import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { InputLabel } from "@mui/material";
import { FaLink } from "react-icons/fa6";
import { TFunction } from "i18next";
import { useState } from "react";

import { RefundSchema, RefundEditSchema } from "./schema";
import { IRefundModel } from "./types";
import { textStyling } from "@/styles";

import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";
import CustomDateTimePicker from "@/components/custom/datePicker";
import CustomMultiSelect from "@/components/custom/multiSelect";
import CustomTextField from "@/components/custom/input";
import CustomSelect from "@/components/custom/select";
import { Input } from "@/components/ui/input";

const getTypeOptions = (t: TFunction<"translation", undefined>) => [
  { label: t("Aviabilet satışı"), value: "aviabiletSale" },
  { label: t("Korperativ satış"), value: "cooperativeTicket" },
  { label: t("Individual Tur paket"), value: "individualTourPackage" },
  { label: t("İndividual tur satışı"), value: "tourPackage" },
  { label: t("Digər xidmətlər"), value: "otherService" },

  { label: t("Depozit"), value: "deposit" },
];

type IItem = {
  no: string;
  id: number;
  amount: number;
  paidAmount: number;
};

type FormType = "Edit" | "Create";

interface IRefundFormProps {
  formType: FormType;
  initialValues: IRefundModel;
  onSubmit: (
    values: IRefundModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const RefundForm = ({
  initialValues,
  onSubmit,
  formType,
}: IRefundFormProps) => {
  const isEdit = formType === "Edit";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [invoiceItems, setInvoiceItems] = useState<IItem[]>([]);

  const getOptions = (options: IItem[]) => {
    setInvoiceItems(options);
  };
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={isEdit ? RefundEditSchema : RefundSchema}
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
                    label={t("Məhsul tipi")}
                    optionLabel="name"
                    value={values.type ?? null}
                    change={(value) => {
                      setFieldValue("invoiceId", null);
                      setFieldValue("advancePaymentId", null);
                      setFieldValue(`type`, value ?? null);
                    }}
                    hasErrorMessages={!!errors.type && !!touched.type}
                    staticOptions={getTypeOptions(t)}
                    errorMessages={[t(errors.type?.toString())]}
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
                      setFieldValue("invoiceId", null);
                      setFieldValue("advancePaymentId", null);
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
            {!isEdit && !!values.type && !!values.customerId && (
              <div
                className="w-full flex items-center gap-x-1"
                key={`ticket-${values.type}-${values.customerId}`}
              >
                <CustomMultiSelect
                  isMultiSelect={false}
                  secondaryOptionLabel="amount"
                  api={`Invoices/GetRefundables?customerId=${values.customerId}&type=${values.type}`}
                  label={t("Məhsul nömrəsi")}
                  value={[values.invoiceId || values.advancePaymentId]}
                  change={(option: any) => {
                    const isDeposit = values.type === "deposit";
                    setFieldValue("invoiceId", isDeposit ? null : option);
                    setFieldValue(
                      "advancePaymentId",
                      !isDeposit ? null : option
                    );
                    const amount = invoiceItems.find(
                      (i) => i.id === +option.value
                    ).amount;
                    const paidAmount = invoiceItems.find(
                      (i) => i.id === +option.value
                    ).paidAmount;
                    setFieldValue("amount", amount ?? 0);
                    setFieldValue("paidAmount", paidAmount ?? 0);
                  }}
                  getOptions={getOptions}
                  hasErrorMessages={!!errors.invoiceId && !!touched.invoiceId}
                  errorMessages={[t(errors.invoiceId?.toString())]}
                  closeMenuOnSelect={false}
                  optionLabel="no"
                />
                {(values.invoiceId || values.advancePaymentId) && (
                  <Link
                    to={`/panel/${values.type}/report?tickets=${
                      values.invoiceId?.value || values.advancePaymentId.value
                    }`}
                    className="h-full py-3 px-2.5 rounded-lg mt-1 hover:opacity-80"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                    }}
                    target="_blank"
                  >
                    <FaLink className="text-blue-600" />
                  </Link>
                )}
              </div>
            )}
            {(values.invoiceId || values.advancePaymentId)||formType=="Edit" && (
              <>
                <div className="w-full">
                  <CustomTextField
                    disabled
                    name="amount"
                    type="text"
                    label={t("Məbləğ")}
                    value={values.amount}
                    change={handleChange}
                    hasErrorMessages={!!errors.amount && !!touched.amount}
                    errorMessages={[t(errors.amount?.toString())]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    disabled
                    name="paidAmount"
                    type="text"
                    label={t("Ödənilən məbləğ")}
                    value={values.paidAmount}
                    change={handleChange}
                    hasErrorMessages={
                      !!errors.paidAmount && !!touched.paidAmount
                    }
                    errorMessages={[t(errors.paidAmount?.toString())]}
                  />
                </div>
                {/* <div className="w-full">
                  <CustomAutocompleteSelect
                    api="Payments/GetAll/1"
                    label={t("Ödəniş növü")}
                    value={values.paymentId ?? null}
                    optionLabel="type"
                    change={(value) => setFieldValue("paymentId", value)}
                    hasErrorMessages={!!errors.paymentId && !!touched.paymentId}
                    errorMessages={[t(errors.paymentId?.toString() ?? "")]}
                  />
                </div> */}
                <div className="w-full">
                  <CustomTextField
                    label={t("Refund from Supplier")}
                    value={values.supplierAmount}
                    change={handleChange}
                    type="number"
                    name={`supplierAmount`}
                    hasErrorMessages={
                      !!errors.supplierAmount && !!touched.supplierAmount
                    }
                    errorMessages={[t(errors.supplierAmount?.toString())]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                      change={handleChange}
                    label={t("Cərimə")}
                    value={values.forfeit}
                    type="number"
                    name={`forfeit`}
                  />
                </div>
               
                <div className="w-full">
                  <CustomTextField
                    disabled
                    label={t("Qaytarılan məbləğ")}
                    // value={values.paidAmount-values.supplierAmount-values.fine}
                    value={ (
                      (values.paidAmount-values.amount)+(values.supplierAmount-values.forfeit)
                    )}
                    change={handleChange}
                    type="number"
                    name={`paidToCustomer`}
                    hasErrorMessages={
                      !!errors.paidToCustomer && !!touched.paidToCustomer
                    }
                    errorMessages={[t(errors.paidToCustomer?.toString())]}
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

     {
      formType!="Edit"&&(
        <div className="w-full flex gap-x-6 justify-end mb-6">
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
      )
     }
        </form>
      )}
    </Formik>
  );
};

export default RefundForm;
