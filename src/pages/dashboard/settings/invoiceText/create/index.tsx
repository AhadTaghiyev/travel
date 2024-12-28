import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IInvoiceTextModel } from "../types";

import InvoiceTextForm from "../form";

const NewInvoiceText = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: IInvoiceTextModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const promise = apiService
        .post(`/InvoiceTexts/Create`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("InvoiceText Created"));
            navigate(`/panel/InvoiceTexts`);
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
        {t("Create New InvoiceText")}
      </h1>
      <InvoiceTextForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          text: "",
        }}
      />
    </div>
  );
};

export default NewInvoiceText;
