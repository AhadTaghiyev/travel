import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IPartnerModel } from "../types";

import Partner from "../form";

const NewPartner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: IPartnerModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const formData = new FormData();
      // formData.append("imageFile", values.image);
      if (values.image && values.image instanceof File) {
        formData.append("imageFile", values.image);
      }
      const promise = apiService
        .postForm(`Partner/Create`, formData)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Partner Created"));
            navigate(`/admin/Partners`);
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
        {t("Yeni Partner Yarat")}
      </h1>
      <Partner
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          image: null,
        }}
      />
    </div>
  );
};

export default NewPartner;
