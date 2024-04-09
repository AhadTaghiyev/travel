import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { InvoiceTextSchema } from "./schema";
import { IInvoiceTextModel } from "./types";

import CustomTextField from "@/components/custom/input";

type FormType = "Edit" | "Create" | "View";

interface IInvoiceTextProps {
  formType: FormType;
  initialValues: IInvoiceTextModel;
  onSubmit: (
    values: IInvoiceTextModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const InvoiceText = ({ initialValues, onSubmit }: IInvoiceTextProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={InvoiceTextSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="pt-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 items-center">
            <div className="w-full">
              <CustomTextField
                label={t("text")}
                value={values.name}
                change={handleChange}
                name={`text`}
                hasErrorMessages={!!errors.name && !!touched.name}
                errorMessages={[t(errors.name?.toString())]}
              />
            </div>
          </div>

          <div className="w-full flex gap-x-6 justify-end mb-6">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => navigate("/panel/InvoiceTexts")}
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

export default InvoiceText;