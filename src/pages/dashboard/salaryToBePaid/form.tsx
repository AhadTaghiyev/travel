import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { SalaryToBePaidSchema } from "./schema";
import { ISalaryToBePaidModel } from "./types";

import CustomTextField from "@/components/custom/input";
import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";

type FormType = "Edit" | "Create" | "View";

interface ISalaryToBePaidProps {
  formType: FormType;
  initialValues: ISalaryToBePaidModel;
  onSubmit: (
    values: ISalaryToBePaidModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const SalaryToBePaid = ({ initialValues, onSubmit }: ISalaryToBePaidProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={SalaryToBePaidSchema}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="pt-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 items-center">
            <div className="w-full">
              <CustomAutocompleteSelect
                api="Personals/GetAll/1"
                label={t("Işçi")}
                value={values.employeeId ?? null}
                optionLabel="fullName"
                change={(value) => setFieldValue("employeeId", value)}
                hasErrorMessages={!!errors.employeeId && !!touched.employeeId}
                errorMessages={[t(errors.employeeId?.toString() ?? "")]}
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
                label={t("Maaş")}
                value={values.salary}
                change={handleChange}
                type="number"
                name={`salary`}
                hasErrorMessages={!!errors.salary && !!touched.salary}
                errorMessages={[t(errors.salary?.toString())]}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                label={t("Əlavə maaş")}
                value={values.extraSalary}
                change={handleChange}
                type="number"
                name={`extraSalary`}
                hasErrorMessages={!!errors.extraSalary && !!touched.extraSalary}
                errorMessages={[t(errors.extraSalary?.toString())]}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                label={t("Bonus")}
                value={values.bonus}
                change={handleChange}
                type="number"
                name={`bonus`}
                hasErrorMessages={!!errors.bonus && !!touched.bonus}
                errorMessages={[t(errors.bonus?.toString())]}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                disabled
                label={t("Total Amount")}
                value={values.salary + values.extraSalary + values.bonus}
                change={() => 0}
                type="number"
                name={``}
              />
            </div>
            <div className="w-full">
              <CustomTextField
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
              onClick={() => navigate("/panel/salaryToBePaid")}
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

export default SalaryToBePaid;
