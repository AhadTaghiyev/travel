import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { TransactionSchema } from "./schema";
import { ITransactionModel } from "./types";

import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";
import CustomSelect from "@/components/custom/select";
import CustomTextField from "@/components/custom/input";
import CustomDateTimePicker from "@/components/custom/datePicker";

type FormType = "Edit" | "Create" | "View";

interface ITransactionFormProps {
  formType: FormType;
  initialValues: ITransactionModel;
  onSubmit: (
    values: ITransactionModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const TransactionForm = ({
  initialValues,
  onSubmit,
  formType,
}: ITransactionFormProps) => {
  const isView = formType === "View";
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={TransactionSchema}
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
            <div className="w-full">
              <CustomSelect
                label={t("Status")}
                optionLabel="name"
                value={values.status ?? null}
                change={(value) => {
                  setFieldValue("status", value);
                }}
                hasErrorMessages={!!errors.status && !!touched.status}
                staticOptions={[
                  { label: t("From"), value: "1" },
                  { label: t("To"), value: "0" },
                ]}
                errorMessages={[t(errors.status?.toString())]}
              />
            </div>
            <div className="w-full">
              <CustomAutocompleteSelect
                disabled={isView}
                api="ManagerFinancialTransactions/GetAll"
                label={t("Transaction")} // TODO: translate
                value={values.managerFinancialTransactionId ?? null}
                optionLabel="ref"
                change={(value) =>
                  setFieldValue("managerFinancialTransactionId", value ?? null)
                }
                hasErrorMessages={
                  !!errors.managerFinancialTransactionId &&
                  !!touched.managerFinancialTransactionId
                }
                errorMessages={[
                  t(errors.managerFinancialTransactionId?.toString() ?? ""),
                ]}
              />
            </div>
            <div className="w-full">
              <CustomAutocompleteSelect
                disabled={isView}
                api="Payments/GetAll/1"
                label={t("Ödəniş növü")}
                value={values.paymentId ?? null}
                optionLabel="type"
                change={(value) => setFieldValue("paymentId", value ?? null)}
                hasErrorMessages={!!errors.paymentId && !!touched.paymentId}
                errorMessages={[t(errors.paymentId?.toString() ?? "")]}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                label={t("Ödənilən məbləğ")}
                value={values.amount}
                change={handleChange}
                type="number"
                name={`amount`}
                disabled={isView}
                hasErrorMessages={!!errors.amount && !!touched.amount}
                errorMessages={[t(errors.amount?.toString())]}
              />
            </div>
            <div className="w-full h-full">
              <CustomDateTimePicker
                disabled={isView}
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
            <div className="w-full">
              <CustomTextField
                disabled={isView}
                name="note"
                type="text"
                label={t("Qeyd")}
                value={values.note}
                change={handleChange}
                hasErrorMessages={!!errors.note && !!touched.note}
                errorMessages={[t(errors.note?.toString())]}
              />
            </div>
          </div>
          <div className="w-full flex gap-x-6 justify-end mb-6">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => navigate(-1)}
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

export default TransactionForm;
