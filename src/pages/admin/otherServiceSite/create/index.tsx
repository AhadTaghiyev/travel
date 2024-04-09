import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IOtherServiceSiteModel } from "../types";

import OtherServiceSite from "../form";

const NewOtherServiceSite = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: IOtherServiceSiteModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
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
        .postForm(`OtherServiceSite/Create`, formData)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("OtherServiceSite Created"));
            navigate(`/admin/OtherServiceSites`);
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
        {t("Yeni OtherServiceSite Yarat")}
      </h1>
      <OtherServiceSite
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

export default NewOtherServiceSite;
