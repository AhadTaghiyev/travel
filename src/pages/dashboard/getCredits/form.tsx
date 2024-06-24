import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { GetCreditSchema } from "./schema";
import { IGetCreditModel } from "./types";

import CustomDateTimePicker from "@/components/custom/datePicker";
import CustomTextField from "@/components/custom/input";
import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";

type FormType = "Edit" | "Create" | "View";

interface IMassIncomeFormProps {
  formType: FormType;
  initialValues: IGetCreditModel;
  onSubmit: (
    values: IGetCreditModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const MassIncomeForm = ({
  initialValues,
  onSubmit,
  formType,
}: IMassIncomeFormProps) => {
  const isView = formType === "View";
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={GetCreditSchema}
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
            <div className="w-full h-full">
              <CustomDateTimePicker
                label={t("date")}
                value={values.date}
                toDate={new Date()}
                change={(data) => {
                  setFieldValue("date", data ?? new Date());
                }}
                disabled={isView}
                hasErrorMessages={!!errors.date && !!touched.date}
                errorMessages={[t(errors.date?.toString())]}
              />
            </div>
            <div className="w-full relative">
              <CustomAutocompleteSelect
                api="banks/GetAll/1"
                label={t("Bank")}
                optionLabel="name"
                value={values.bankId ?? null}
                change={(value) => setFieldValue(`bankId`, value)}
                disabled={isView}
                hasErrorMessages={!!errors.bankId && !!touched.bankId}
                errorMessages={[t(errors.bankId?.toString())]}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                label={t("Məbləğ")}
                value={values.amount}
                change={handleChange}
                type="number"
                name={`amount`}
                hasErrorMessages={!!errors.amount && !!touched.amount}
                errorMessages={[t(errors.amount?.toString())]}
              />
            </div>
          </div>

          <div className="w-full flex gap-x-6 justify-end mb-6">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => navigate("/panel/getCredits")}
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
