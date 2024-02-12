import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IFeeModel } from "../types";

import FeeForm from "../form";

const NewFee = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: IFeeModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const promise = apiService
        .post(`/Fees/Create`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Fee Created")); // Hola
            navigate(`/panel/fees`);
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
        {t("Xərc Yarat")} {/* Hola */}
      </h1>
      <FeeForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          name: "",
        }}
      />
    </div>
  );
};

export default NewFee;
