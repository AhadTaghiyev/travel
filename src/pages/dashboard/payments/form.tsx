import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { WillBePaidSchema } from "./schema";
import { IPay } from "./types";

import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";
import CustomTextField from "@/components/custom/input";

type FormType = "Edit" | "Create" | "View";

interface IWillBePaidProps {
  formType: FormType;
  initialValues: IPay;
  onSubmit: (values: IPay, helpers: FormikHelpers<FormikValues>) => void;
}

const WillBePaid = ({
  initialValues,
  onSubmit,
  formType,
}: IWillBePaidProps) => {
  const isView = formType === "View";
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={WillBePaidSchema}
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
                label={t("Payment")}
                value={values.paymentId ?? null}
                optionLabel="type"
                change={(value) => setFieldValue("paymentId", value ?? null)}
                hasErrorMessages={!!errors.paymentId && !!touched.paymentId}
                errorMessages={[t(errors.paymentId?.toString() ?? "")]}
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

export default WillBePaid;
