import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { IEmailModel } from "./types";
import { useTranslation } from "react-i18next";
import CustomTextField from "@/components/custom/input";
import CustomTextAreaField from "@/components/custom/textArea";
import * as Yup from "yup";
import { toast } from "sonner";
import { apiService } from "@/server/apiServer";

const initialValues: IEmailModel = {
  body: "",
  attachments: null,
  subject: "",
  toEmail: "",
};
const sendEmailFormSchema = Yup.object().shape({
  toEmail: Yup.string().required("Email daxil edilməlidir"), // TODO: translate
  subject: Yup.string().required("Subject daxil edilməlidir"), // TODO: translate
});

export default function index() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("toEmail", values.toEmail);
    formData.append("subject", values.subject);
    formData.append("body", values.body);
    formData.append("attachments", values.attachments);
    try {
      const res = await apiService.postForm(
        `Email/SendMailToPersons`,
        formData
      );
      if (res?.status == 200) {
        toast.success("Uğurla yaradıldı!");
        navigate("/panel/documents");
      } else {
        toast.error(t("Something went wrong"));
      }
    } catch (err) {
      toast.error(t("Something went wrong"));
    }
  };

  return (
    <div className="mx-1 p-4 bg-white shadow-md min-h-[500px]">
      <h1 className="text-black text-4xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
        {t("Send Email")} {/** TODO: translate */}
      </h1>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={sendEmailFormSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          // isSubmitting,
          // setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 items-center">
              <div className="w-full">
                <CustomTextField
                  name="toEmail"
                  type="text"
                  label={t("Email")}
                  value={values.toEmail}
                  change={handleChange}
                  hasErrorMessages={!!errors.toEmail && !!touched.toEmail}
                  errorMessages={[t(errors.toEmail?.toString())]}
                />
              </div>
              <div className="w-full">
                <CustomTextField
                  name="subject"
                  type="text"
                  label={t("Subject")} // TODO: translate
                  value={values.subject}
                  change={handleChange}
                  hasErrorMessages={!!errors.subject && !!touched.subject}
                  errorMessages={[t(errors.subject?.toString())]}
                />
              </div>
              <div className="w-full">
                <CustomTextField
                  name="attachments"
                  type="file"
                  label={t("Attachments")} // TODO: translate
                  value={undefined}
                  change={(e) => {
                    setFieldValue("attachments", e.target.files[0]);
                  }}
                  hasErrorMessages={
                    !!errors.attachments && !!touched.attachments
                  }
                  errorMessages={[t(errors.attachments?.toString())]}
                />
              </div>
              <div className="w-full col-span-1 sm:col-span-2 md:col-span-3">
                <CustomTextAreaField
                  label={t("Body")} // TODO: translate
                  value={values.body}
                  change={handleChange}
                  name="body"
                />
              </div>
            </div>
            <div className="w-full flex gap-x-6 justify-end mb-6">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => navigate("/panel")}
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
    </div>
  );
}
