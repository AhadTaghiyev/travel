import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IIncomeModel } from "../types";

import MassIncomeForm from "../form";

const NewIncome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: IIncomeModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const params = {
        invoiceIds: values.invoiceIds.map((item: any) => item.value),
        paymentId: values.paymentId,
        personalId: values.personalId,
        paidAmount: values.paidAmount,
        description: values.description,
      };

      const promise = apiService
        .post(`/MassIncomes/Create`, params)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Mədaxil yaradıldı"));
            navigate(`/panel/income`);
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
        {t("Mədaxil Yarat")}
      </h1>
      <MassIncomeForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          date: new Date(),
          debt: 0,
          personalId: null,
          paidAmount: 0,
          paymentId: null,
          invoiceIds: [],
          customerId: null,
          ticketType: null,
        }}
      />
    </div>
  );
};

export default NewIncome;
