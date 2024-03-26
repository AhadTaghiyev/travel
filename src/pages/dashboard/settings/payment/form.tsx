import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { PaymentSchema } from "./schema";
import { IPaymentModel } from "./types";

import CustomTextField from "@/components/custom/input";

type FormType = "Edit" | "Create" | "View";

interface IPaymentProps {
  formType: FormType;
  initialValues: IPaymentModel;
  onSubmit: (
    values: IPaymentModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const Payment = ({ initialValues, onSubmit, formType }: IPaymentProps) => {
  const { t } = useTranslation();
  const isEdit = formType === "Edit";
  const navigate = useNavigate();

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={PaymentSchema}
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
                label={t("Ödəniş növü")}
                value={values.type}
                change={handleChange}
                name={`type`}
                hasErrorMessages={!!errors.type && !!touched.type}
                errorMessages={[t(errors.type?.toString())]}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                label={t("Məbləğ")}
                value={values.amount}
                change={handleChange}
                name={`amount`}
                type="number"
                disabled={isEdit}
                hasErrorMessages={!!errors.amount && !!touched.amount}
                errorMessages={[t(errors.amount?.toString())]}
              />
            </div>
          </div>

          <div className="w-full flex gap-x-6 justify-end mb-6">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => navigate("/panel/payment")}
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

export default Payment;
