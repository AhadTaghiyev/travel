import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as Yup from "yup";

import { apiService } from "@/server/apiServer";
import { useModal } from "@/hooks/useModal";

import CustomTextField from "@/components/custom/customTextField";
import { Modal } from "@/components/custom/modal";

export const CreateServiceSchema = Yup.object().shape({
  name: Yup.string().required("Tur adı daxil edilməlidir"),
});

const initialValues = {
  name: "",
};

export const CreateServiceModal = () => {
  const { onClose, isOpen, type, setModalSuccess } = useModal();
  const { t } = useTranslation();

  const isModalOpen = isOpen && type === "createService";

  if (!isModalOpen) {
    return null;
  }

  const onSubmit = async (
    values: { fullName: string },
    { setSubmitting }: FormikHelpers<FormikValues>
  ) => {
    setSubmitting(true);
    const promise = apiService
      .post(`/Services/Create`, values)
      .then((response) => {
        if (response.status === 200) {
          toast.success(t("Service Created")); // Hola
          setModalSuccess();
        } else {
          toast.error(response.message);
        }
      })
      .finally(() => setSubmitting(false));

    toast.promise(promise, {
      loading: t("Loading..."),
    });
  };

  return (
    <Modal title={t("Yeni Service Yarat")} onModalClose={onClose}>
      {" "}
      {/* Hola */}
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={CreateServiceSchema}
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
            <div className="p-4 md:p-5 space-y-4">
              <div className="w-full">
                <CustomTextField
                  name="name"
                  type="text"
                  label={t("Servis Adı")} // Hola
                  value={values.name}
                  change={handleChange}
                  hasErrorMessages={!!errors.name && !!touched.name}
                  errorMessages={[t(errors.name?.toString())]}
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
