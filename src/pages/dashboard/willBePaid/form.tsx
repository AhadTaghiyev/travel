import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { WillBePaidSchema } from "./schema";
import { IWillBePaid } from "./types";

import CustomAutocompleteSelect from "@/components/custom/autocompleteSelect";
import CustomTextField from "@/components/custom/input";
import CustomDateTimePicker from "@/components/custom/datePicker";

type FormType = "Edit" | "Create" | "View";

interface IWillBePaidProps {
  formType: FormType;
  initialValues: IWillBePaid;
  onSubmit: (values: IWillBePaid, helpers: FormikHelpers<FormikValues>) => void;
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
                api="Fees/GetAll/1"
                label={t("Xərc")}
                value={values.feeId ?? null}
                optionLabel="name"
                change={(value) => setFieldValue("feeId", value ?? null)}
                hasErrorMessages={!!errors.feeId && !!touched.feeId}
                errorMessages={[t(errors.feeId?.toString() ?? "")]}
              />
            </div>
            <div className="w-full">
              <CustomTextField
                label={t("Məbləğ")}
                value={values.totalAmount}
                change={handleChange}
                type="number"
                name={`totalAmount`}
                disabled={isView}
                hasErrorMessages={!!errors.totalAmount && !!touched.totalAmount}
                errorMessages={[t(errors.totalAmount?.toString())]}
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

export default WillBePaid;
