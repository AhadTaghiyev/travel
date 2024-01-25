import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { useModal } from "@/hooks/useModal";

import CustomTextField from "@/components/custom/customTextField";
import { Modal } from "@/components/custom/modal";

export const CreateCurrencySchema = Yup.object().shape({
  value: Yup.number().required("Məzənnə daxil edilməlidir"),
  name: Yup.string().required("Ad daxil edilməlidir"),
});

const initialValues = {
  value: 1,
  name: "",
};

export const CreateCurrencyModal = () => {
  const { onClose, isOpen, type, onSuccess } = useModal();
  const { t } = useTranslation();

  const isModalOpen = isOpen && type === "createCurrency";

  if (!isModalOpen) {
    return null;
  }

  const onSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<FormikValues>
  ) => {
    onSuccess(values);
    setSubmitting(false);
    onClose();
  };

  return (
    <Modal title={t("Yeni Məzənnə Yarat")} onModalClose={onClose}>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={CreateCurrencySchema}
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
            <div className="p-4 md:p-5">
              <div className="w-full">
                <CustomTextField
                  type="text"
                  name="name"
                  label={t("Məzənnə Adı")}
                  value={values.name}
                  change={handleChange}
                  hasErrorMessages={!!errors.name && !!touched.name}
                  errorMessages={[t(errors.fullName?.toString())]}
                />
              </div>
              <div className="w-full">
                <CustomTextField
                  type="number"
                  name="value"
                  label={t("Məzənnə")}
                  value={values.value}
                  change={handleChange}
                  hasErrorMessages={!!errors.value && !!touched.value}
                  errorMessages={[t(errors.value?.toString())]}
                />
              </div>
            </div>
            <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b gap-x-4 ">
              <button
                data-modal-hide="default-modal"
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 disabled:opacity-60 "
              >
                {t("Ləğv et")}
              </button>
              <button
                data-modal-hide="default-modal"
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-60"
              >
                {t("YARAT")}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};
