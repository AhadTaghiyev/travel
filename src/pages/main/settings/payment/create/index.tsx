import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IPaymentModel } from "../types";

import PaymentForm from "../form";

const NewPayment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: IPaymentModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const promise = apiService
        .post(`/Payments/Create`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Payment Created"));
            navigate(`/panel/payments`);
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
        {t("Payment Yarat")}
      </h1>
      <PaymentForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          amount: 0,
          type: "",
        }}
      />
    </div>
  );
};

export default NewPayment;
