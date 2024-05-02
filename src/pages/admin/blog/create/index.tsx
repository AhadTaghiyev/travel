import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IBlogModel } from "../types";

import Blog from "../form";

const NewBlog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: IBlogModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const formData = new FormData();
      formData.append("titleEn", values.titleEn);
      formData.append("titleRu", values.titleRu);
      formData.append("titleAz", values.titleAz);
      formData.append("linkEn", values.linkEn);
      formData.append("linkRu", values.linkRu);
      formData.append("linkAz", values.linkAz);
      formData.append("descEn", values.descEn);
      formData.append("descRu", values.descRu);
      formData.append("descAz", values.descAz);
      formData.append("miniDescEn", values.miniDescEn);
      formData.append("miniDescRu", values.miniDescEn);
      formData.append("miniDescAz", values.miniDescRu);
      if (values.image && values.image instanceof File) {
        formData.append("imageFile", values.image);
      }
      const promise = apiService
        .postForm(`Blog/Create`, formData)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Blog Created"));
            navigate(`/admin/Blogs`);
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
        {t("Yeni Blog Yarat")}
      </h1>
      <Blog
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          titleEn: "",
          titleRu: "",
          titleAz: "",
          linkEn: "",
          linkRu: "",
          linkAz: "",
          descEn: "",
          descRu: "",
          descAz: "",
          image: null,
          miniDescAz: "",
          miniDescEn: "",
          miniDescRu: "",
        }}
      />
    </div>
  );
};

export default NewBlog;
