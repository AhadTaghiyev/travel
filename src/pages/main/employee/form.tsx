import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { EmployeeSchema } from "./schema";
import { IEmployeeModel } from "./types";

import CustomTextField from "@/components/custom/input";

type FormType = "Edit" | "Create" | "View";

interface IEmployeeProps {
  formType: FormType;
  initialValues: IEmployeeModel;
  onSubmit: (
    values: IEmployeeModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const Employee = ({ initialValues, onSubmit }: IEmployeeProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={EmployeeSchema}
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
                label={t("Ad Soyad")}
                value={values.fullName}
                change={handleChange}
                name={`fullName`}
                hasErrorMessages={!!errors.fullName && !!touched.fullName}
                errorMessages={[t(errors.fullName?.toString())]}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                label={t("Email")}
                value={values.email}
                change={handleChange}
                name={`email`}
                hasErrorMessages={!!errors.email && !!touched.email}
                errorMessages={[t(errors.email?.toString())]}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                label={t("Telefon")}
                value={values.phone}
                change={handleChange}
                type="number"
                name={`phone`}
                hasErrorMessages={!!errors.phone && !!touched.phone}
                errorMessages={[t(errors.phone?.toString())]}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                label={t("Vəzifə")} /*Hola*/
                value={values.position}
                change={handleChange}
                name={`position`}
                hasErrorMessages={!!errors.position && !!touched.position}
                errorMessages={[t(errors.position?.toString())]}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                label={t("Maaş")} /*Hola*/
                value={values.salary}
                change={handleChange}
                type="number"
                name={`salary`}
                hasErrorMessages={!!errors.salary && !!touched.salary}
                errorMessages={[t(errors.salary?.toString())]}
              />
            </div>
          </div>

          <div className="w-full flex gap-x-6 justify-end mb-6">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => navigate("/panel/deposits")}
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

export default Employee;
