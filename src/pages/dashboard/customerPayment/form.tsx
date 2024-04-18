import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";

import { CustomerPaymentsSchema } from "./schema";
import { useModal } from "@/hooks/useModal";
import { IcustomerPaymentModel } from "./types";

import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";
import CustomTextField from "@/components/custom/input";
import CustomDateTimePicker from "@/components/custom/datePicker";

type FormType = "Edit" | "Create" | "View";

interface IMassIncomeFormProps {
  formType: FormType;
  initialValues: IcustomerPaymentModel;
  onSubmit: (
    values: IcustomerPaymentModel,
    helpers: FormikHelpers<FormikValues>
  ) => void;
}

const MassIncomeForm = ({
  initialValues,
  onSubmit,
  formType,
}: IMassIncomeFormProps) => {
  const { type, isModalSuccess, onOpen } = useModal();
  const isView = formType === "View";
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={CustomerPaymentsSchema}
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
            <div className="w-full relative">
              <CustomAutocompleteSelect
                disabled={isView}
                api="Customers/GetAll/1"
                label={t("customer")}
                value={values.customerId ?? null}
                optionLabel="fullName"
                change={(value) => {
                  setFieldValue("customerId", value ?? null);
                }}
                refetech={!!(isModalSuccess && type === "createCustomer")}
                hasErrorMessages={!!errors.customerId && !!touched.customerId}
                errorMessages={[t(errors.customerId?.toString())]}
              />
              {!isView && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    onOpen("createCustomer");
                  }}
                  className="absolute right-0 top-0 text-blue-600 border-none bg-transparent  cursor-pointer z-20 hover:opacity-90 transition disabled:opacity-70"
                >
                  <FaPlusSquare />
                </button>
              )}
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
                value={values.paidAmount}
                change={handleChange}
                type="number"
                name={`paidAmount`}
                hasErrorMessages={!!errors.paidAmount && !!touched.paidAmount}
                errorMessages={[t(errors.paidAmount?.toString())]}
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
                name="description"
                type="text"
                label={t("Description")}
                value={values.description}
                change={handleChange}
                hasErrorMessages={!!errors.description && !!touched.description}
                errorMessages={[t(errors.description?.toString())]}
              />
            </div>
          </div>

          <div className="w-full flex gap-x-6 justify-end mb-6">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => navigate("/panel/deposit")}
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
