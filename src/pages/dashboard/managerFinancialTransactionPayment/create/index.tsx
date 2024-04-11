import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { ITransactionModel } from "../types";

import TransactionForm from "../form";

const NewTransaction = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (
      values: ITransactionModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const params = {
        paymentId: +values.paymentId,
        amount: values.amount,
        date: values.date,
        note: values.note,
        status: +values.status,
        managerFinancialTransactionId: +values.managerFinancialTransactionId,
      };

      const promise = apiService
        .post(`/ManagerFinancialTransactionPayments/Create`, params)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Transaction yaradıldı"));
            navigate(`/panel/managerFinancialTransactionPayments`);
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
        {t("Transaction Yarat")}
      </h1>
      <TransactionForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          paymentId: null,
          amount: 0,
          date: new Date(),
          note: "",
          status: null,
          managerFinancialTransactionId: null,
        }}
      />
    </div>
  );
};

export default NewTransaction;
