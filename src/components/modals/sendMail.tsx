import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as Yup from "yup";

import { apiService } from "@/server/apiServer";
import { useModal } from "@/hooks/useModal";

import CustomTextField from "@/components/custom/customTextField";
import { Modal } from "@/components/custom/modal";

export const SendMailSchema = Yup.object().shape({
  toEmail: Yup.string()
    .email("Email doğru formatda deyil")
    .required("Email daxil edilməlidir"),
});

const initialValues = {
  toEmail: "",
};

export const SendMailModal = () => {
  const { data, onClose, isOpen, type, setModalSuccess } = useModal();
  const { t } = useTranslation();

  const isModalOpen = isOpen && type === "sendMail";

  const isBcc = data?.isBcc;

  if (!isModalOpen) {
    return null;
  }

  const onSubmit = async (
    values,
    { setSubmitting }: FormikHelpers<FormikValues>
  ) => {
    const blob = data?.blob;
    const subject = data?.subject;
    if (!blob) return;
    setSubmitting(true);

    const formData = new FormData();
    const emails = values.toEmail.replaceAll(" ", "").split(",");
    emails.forEach((email) => {
      formData.append("toEmail", email);
    });
    formData.append("subject", subject);
    formData.append(
      "body",
      `<div> 
        <p>Dear Customer</p>
        <p>Please find the attached file.</p>
        <p>Wish you best travel experience.</p>
        <p>Kind regards</p>
      </div>`
    );
    formData.append("attachments", blob);

    let url = `Email/SendMailToPersons`;
    if (isBcc !== undefined && isBcc !== null) {
      url += `?isBcc=${isBcc}`;
    }

    const promise = apiService
      .postForm(url, formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(t("Email uğurla göndərildi"));
          setModalSuccess();
          onClose();
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
    <Modal title={t("Send Mail")} onModalClose={onClose}>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={SendMailSchema}
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
                  name="toEmail"
                  type="text"
                  label={t("Email")}
                  placeholder="test@mail.com, test2@mail.com..."
                  value={values.toEmail}
                  change={handleChange}
                  hasErrorMessages={!!errors.toEmail && !!touched.toEmail}
                  errorMessages={[t(errors.toEmail?.toString())]}
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
