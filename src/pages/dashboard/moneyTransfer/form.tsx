import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { TransferSchema } from "./schema";
import { ITransferModel } from "./types";

import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";
import CustomTextField from "@/components/custom/input";
import CustomDateTimePicker from "@/components/custom/datePicker";

type FormType = "Edit" | "Create" | "View";

interface ITransferFormProps {
  formType: FormType;
  initialValues: ITransferModel;
  onSubmit: (
    values: ITransferModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const TransferForm = ({
  initialValues,
  onSubmit,
  formType,
}: ITransferFormProps) => {
  const isView = formType === "View";
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={TransferSchema}
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
              <CustomAutocompleteSelect
                disabled={isView}
                api="Payments/GetAll/1"
                label={t("Haradan")}
                value={values.fromPaymentId ?? null}
                optionLabel="type"
                change={(value) =>
                  setFieldValue("fromPaymentId", value ?? null)
                }
                hasErrorMessages={
                  !!errors.fromPaymentId && !!touched.fromPaymentId
                }
                errorMessages={[t(errors.fromPaymentId?.toString() ?? "")]}
              />
            </div>
            <div className="w-full">
              <CustomAutocompleteSelect
                disabled={isView}
                api="Payments/GetAll/1"
                label={t("Haraya")}
                value={values.toPaymentId ?? null}
                optionLabel="type"
                change={(value) => setFieldValue("toPaymentId", value ?? null)}
                hasErrorMessages={!!errors.toPaymentId && !!touched.toPaymentId}
                errorMessages={[t(errors.toPaymentId?.toString() ?? "")]}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                label={t("Məbləğ")}
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

export default TransferForm;
