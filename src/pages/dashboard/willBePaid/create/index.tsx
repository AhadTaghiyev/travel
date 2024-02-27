import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IWillBePaidModel } from "../types";

import MassIncomeForm from "../form";

const NewIncome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (
      values: IWillBePaidModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const params = {
        paidToCustomer: values.paidToCustomer,
        amount: values.amount,
        forfeit: values.amount - values.paidToCustomer,
        invoiceId: values.invoiceId?.value ?? undefined,
        advancePaymentId: values.advancePaymentId?.value ?? undefined,
        date: values.date,
        paymentId: +values.paymentId,
      };

      const promise = apiService
        .post(`/WillBePaids/Create`, params)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Mədaxil yaradıldı"));
            navigate(`/panel/willBePaids`);
            // TODO: Navigate to report page
            // navigate(
            //   `/panel/IndividualTourPackage/report?tickets=${response.data}`
            // );
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
        {t("WillBePaid Yarat")}
      </h1>
      <MassIncomeForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          type: null,
          amount: 0,
          forfeit: 0,
          invoiceId: null,
          paymentId: null,
          date: new Date(),
          customerId: null,
          paidToCustomer: 0,
          advancePaymentId: null,
        }}
      />
    </div>
  );
};

export default NewIncome;
