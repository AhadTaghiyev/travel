import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IPersonalModel } from "../types";

import PersonalForm from "../form";

const NewPersonal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (
      values: IPersonalModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const promise = apiService
        .post(`/Personals/Create`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Personal Created"));
            navigate(`/panel/personals`);
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
        {t("Personal Yarat")}
      </h1>
      <PersonalForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          fullName: "",
          phone: "",
          email: "",
          position: "",
          salary: 0,
        }}
      />
    </div>
  );
};

export default NewPersonal;
