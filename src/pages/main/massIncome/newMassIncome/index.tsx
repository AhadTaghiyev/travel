import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { IMassIncomeModel } from "../types";

import MassIncomeForm from "../form";
import { apiService } from "@/server/apiServer";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const NewMassIncome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (
      values: IMassIncomeModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const promise = apiService
        .post(`/MassIncomes/Create`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Mədaxil yaradıldı"));

            navigate(`/panel/massIncome`);
            // TODO: Navigate to report page
            // navigate(
            //   `/panel/IndividualTourPackages/report?tickets=${response.data}`
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
        {t("Mədaxil Yarat")}
      </h1>
      <MassIncomeForm
        onSubmit={onSubmit}
        initialValues={{
          debt: 0,
          paidAmount: 0,
          paymentId: null,
          invoiceId: null,
          customerId: null,
          ticketType: null,
        }}
      />
    </div>
  );
};

export default NewMassIncome;
