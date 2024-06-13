import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { TFunction } from "i18next";

import { MassIncomeEditSchema, MassIncomeSchema } from "./schema";
import { IReferanceModel } from "./types";

import CustomTextField from "@/components/custom/input";
import CustomSelect from "@/components/custom/select";
import { FaLink } from "react-icons/fa6";

const getTicketTypeOptions = (t: TFunction<"translation", undefined>) => [
  { label: t("Accept"), value: "2" },
  { label: t("Pending"), value: "0" },
  { label: t("Reject"), value: "1" },
];


type FormType = "Edit" | "Create";

interface IMassIncomeFormProps {
  formType: FormType;
  initialValues: IReferanceModel;
  onSubmit: (
    values: IReferanceModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const MassIncomeForm = ({
  initialValues,
  onSubmit,
  formType,
}: IMassIncomeFormProps) => {
  const isEdit = formType === "Edit";
  const { t } = useTranslation();
  const navigate = useNavigate();



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
                    label={t("Status")}
                    optionLabel="status"
                    value={values.status}
                    change={(value) => {
                      setFieldValue(`status`, value ?? null);
                    }}
                    hasErrorMessages={
                      !!errors.status && !!touched.status
                    }
                    staticOptions={getTicketTypeOptions(t)}
                    errorMessages={[t(errors.status?.toString())]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    name="amount"
                    type="number"
                    label={t("Amount")}
                    value={values.amount}
                    change={handleChange}
                    hasErrorMessages={!!errors.amount && !!touched.amount}
                    errorMessages={[t(errors.amount?.toString())]}
                  />
                </div>
              </>
            )}
      
          
          </div>
          <div className="w-full flex  gap-x-6 gap-y-3 justify-between mb-6">
            <div className="flex gap-2 flex-wrap">
              {values.ticketType &&
                values.invoiceIds?.map((invoice) => (
                  <Link
                    to={`/panel/${values.ticketType}/report?tickets=${invoice.value}`}
                    key={invoice.value}
                    className=" py-2 px-2.5 rounded-lg  hover:border-blue-600 border border-solid border-blue-400 flex items-center gap-x-2"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                    }}
                    target="_blank"
                  >
                    <FaLink className="text-blue-600" />
                    {invoice.label.split("~")[0]}
                  </Link>
                ))}
            </div>
            <div className="min-w-60">
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
          </div>
        </form>
      )}
    </Formik>
  );
};

export default MassIncomeForm;
