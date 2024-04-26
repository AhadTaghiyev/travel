import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import { toast } from "react-toastify";
import { apiService } from "../../../../server/apiServer";
import { IDocumentModel } from "../types";
import CustomTextField from "@/components/custom/input";
import CustomTextAreaField from "@/components/custom/textArea";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { debounce } from "lodash";
import { useState } from "react";

const sendDocumentFormSchema = Yup.object().shape({
  recivedCompanyId: Yup.string().required("Şirkət daxil edilməlidir"),
  file: Yup.string().required("File daxil edilməlidir"),
  text: Yup.string().required("Mətn daxil edilməlidir"),
});

const initialValues: IDocumentModel = {
  text: "",
  file: null,
  recivedCompanyId: "",
};

export default function index() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const { t } = useTranslation();

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("recivedCompanyId", values.recivedCompanyId);
    formData.append("text", values.text);
    if (values.file)
      Object.keys(values.file).forEach((key) => {
        formData.append("file", values.file[key]);
      });
    try {
      const res = await apiService.postForm(`/Document/Send`, formData);
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

  const getCompanyName = async (companyId: string) => {
    try {
      const res = await apiService.get(`/Company/GetById/${companyId}`);
      if (res?.status == 200) {
        setCompanyName(res.data.data.name);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const debounceGetCompany = debounce(getCompanyName, 800);

  return (
    <>
      <div className="mx-1 p-4 bg-white shadow-md min-h-[500px]">
        <h1 className="text-black text-4xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
          {t("Send Document")}
        </h1>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={sendDocumentFormSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 items-center">
                <div className="w-full">
                  <CustomTextField
                    name="recivedCompanyId"
                    type="text"
                    label={t("Şirkət ID")}
                    value={values.recivedCompanyId}
                    change={(e) => {
                      setCompanyName("");
                      debounceGetCompany(e.target.value);
                      handleChange(e);
                    }}
                    hasErrorMessages={
                      !!errors.recivedCompanyId && !!touched.recivedCompanyId
                    }
                    errorMessages={[t(errors.recivedCompanyId?.toString())]}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    disabled
                    name="companyName"
                    type="text"
                    label={t("Şirkət")}
                    value={companyName}
                    change={() => 0}
                  />
                </div>
                <div className="w-full">
                  <CustomTextField
                    name="file"
                    type="file"
                    multiple
                    label={t("Attachments")}
                    value={undefined}
                    change={(e) => {
                      setFieldValue("file", e.target.files);
                    }}
                    hasErrorMessages={!!errors.file && !!touched.file}
                    errorMessages={[t(errors.file?.toString())]}
                  />
                </div>
                <div className="w-full col-span-1 sm:col-span-2 md:col-span-4">
                  <CustomTextAreaField
                    label={t("Mətn")}
                    value={values.text}
                    change={handleChange}
                    name="text"
                    hasErrorMessages={!!errors.text && !!touched.text}
                    errorMessages={[t(errors.text?.toString())]}
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
    </>
  );
}
