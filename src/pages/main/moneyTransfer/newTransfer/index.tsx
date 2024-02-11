import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { ITransferModel } from "../types";

import TransferForm from "../form";

const NewMoneyTransfer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (
      values: ITransferModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const params = {
        fromPaymentId: +values.fromPaymentId,
        toPaymentId: +values.toPaymentId,
        amount: values.amount,
        date: values.date,
        note: values.note,
      };

      const promise = apiService
        .post(`/PaymentTransfers/Create`, params)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Vəsait transferi yaradıldı"));
            navigate(`/panel/paymentTransfers`);
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
        {t("Vəsait Transferi Yarat")}
      </h1>
      <TransferForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          fromPaymentId: null,
          toPaymentId: null,
          amount: 0,
          date: new Date(),
          note: "",
        }}
      />
    </div>
  );
};

export default NewMoneyTransfer;
