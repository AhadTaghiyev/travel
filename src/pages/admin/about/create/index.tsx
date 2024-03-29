import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IAboutModel } from "../types";

import About from "../form";

const NewAbout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: IAboutModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const formData = new FormData();
      formData.append("titleEn", values.titleEn);
      formData.append("titleRu", values.titleRu);
      formData.append("titleAz", values.titleAz);
      formData.append("descEn", values.descEn);
      formData.append("descRu", values.descRu);
      formData.append("descAz", values.descAz);
      // formData.append("imageFile", values.image);
      if (values.image && values.image instanceof File) {
        formData.append("imageFile", values.image);
      }
      const promise = apiService
        .postForm(`About/Create`, formData)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("About Created"));
            navigate(`/admin/Abouts`);
          } else {
            toast.error(response.message || t("Something went wrong"));
          }
        })
        .finally(() => setSubmitting(false));
      toast.promise(promise, {
        loading: t("Loading..."),
      });
    },
    []
  );
  return (
    <div className="mx-1 p-4 bg-white shadow-md min-h-[500px]">
      <h1 className="text-black text-3xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
        {t("Yeni About Yarat")}
      </h1>
      <About
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          titleEn: "",
          titleRu: "",
          titleAz: "",
          descEn: "",
          descRu: "",
          descAz: "",
          image: null,
        }}
      />
    </div>
  );
};

export default NewAbout;
