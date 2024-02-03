import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { InputLabel } from "@mui/material";
import { TFunction } from "i18next";
import { useState } from "react";
import { toast } from "sonner";

import { MassIncomeEditSchema, MassIncomeSchema } from "./schema";
import { IIncomeModel, TicketType } from "./types";
import { apiService } from "@/server/apiServer";
import { textStyling } from "@/styles";

import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";
import CustomTextField from "@/components/custom/input";
import CustomSelect from "@/components/custom/select";
import { Input } from "@/components/ui/input";

const getTicketTypeOptions = (t: TFunction<"translation", undefined>) => [
  { label: t("Aviabilet"), value: "planeTicket" },
  { label: t("Corporative Ticket"), value: "cooperativeTicket" },
  { label: t("Individual Tur paket"), value: "individualTour" },
  { label: t("Tur paket"), value: "tourPackage" },
  { label: t("Digər xidmətlər"), value: "otherServiceTicket" },
];

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
  const [debtLoading, setDebtLoading] = useState(false);
  const isEdit = formType === "Edit";
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getDebt = async (values: {
    invoiceId: string;
    ticketType: TicketType;
  }) => {
    const response = await apiService.get(
      `/Invoices/GetDebt?invoiceId=${values.invoiceId}&ticketType=${values.ticketType}`
    );
    if (response.status === 200) {
      const {
        data: { totaDebt },
      } = response.data;
      return totaDebt;
    } else {
      toast.error(t("Something went wrong"));
      return 0;
    }
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
                      setFieldValue("invoiceId", null);
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
                    api="Customers/GetAll/1"
                    label={t("customer")}
                    disabled={isEdit}
                    value={values.customerId ?? null}
                    optionLabel="fullName"
                    change={(value) => {
                      setFieldValue("invoiceId", null);
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
                <CustomAutocompleteSelect
                  api={`Invoices/GetAll?customerId=${values.customerId}&ticketType=${values.ticketType}`}
                  label={t("Invoice")}
                  value={values.invoiceId ?? null}
                  optionLabel="invoiceNo"
                  change={async (value) => {
                    setFieldValue("invoiceId", value ?? null);
                    setDebtLoading(true);
                    const debt = await getDebt({
                      invoiceId: value,
                      ticketType: values.ticketType,
                    });
                    setFieldValue("debt", debt);
                    setDebtLoading(false);
                  }}
                  hasErrorMessages={!!errors.invoiceId && !!touched.invoiceId}
                  errorMessages={[t(errors.invoiceId?.toString())]}
                />
              </div>
            )}
            {!!values.invoiceId && (
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
              </>
            )}
            {debtLoading && (
              <div className="flex justify-center items-center w-full">
                <ClipLoader
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}
          </div>

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
        </form>
      )}
    </Formik>
  );
};

export default MassIncomeForm;
