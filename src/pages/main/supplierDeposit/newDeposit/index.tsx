import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IDepositModel } from "../types";

import MassIncomeForm from "../form";

const NewDeposit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: IDepositModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const promise = apiService
        .post(`/Bonuces/Create`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Bonuces yaradıldı")); // Hola
            navigate(`/panel/supplierDeposits`);
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
        {t("Depozit Yarat")} {/* Hola */}
      </h1>
      <MassIncomeForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          paymentId: null,
          paidAmount: 0,
          date: new Date(),
          description: "",
        }}
      />
    </div>
  );
};

export default NewDeposit;
