import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IRefundModel } from "../types";

import MassIncomeForm from "../form";

const NewIncome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: IRefundModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const params = {
        paidToCustomer:  (
          (values.paidAmount-values.amount)+(values.supplierAmount-values.forfeit)
        ),
        supplierAmount:values.supplierAmount,
        amount: values.amount,
        forfeit:values.forfeit,
        invoiceId: values.invoiceId?.value ?? undefined,
        advancePaymentId: values.advancePaymentId?.value ?? undefined,
        date: values.date,
        personalId: values.personalId
      };

      const promise = apiService
        .post(`/Refunds/Create`, params)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Mədaxil yaradıldı"));
            navigate(`/panel/refunds`);
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
        {t("Refund Yarat")}
      </h1>
      <MassIncomeForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          type: null,
          amount: 0,
          paidAmount: 0,
          forfeit: 0,
          invoiceId: null,
          // paymentId: null,
          date: new Date(),
          customerId: null,
          paidToCustomer: 0,
          advancePaymentId: null,
          supplierAmount:0,
          personalId: 0
        }}
      />
    </div>
  );
};

export default NewIncome;
