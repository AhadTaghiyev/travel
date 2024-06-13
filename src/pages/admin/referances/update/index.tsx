import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IReferanceModel } from "../types";

import MassIncomeForm from "../form";

const NewIncome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const onSubmit = useCallback(
    (values: IReferanceModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const params = {
        amount: values.amount,
        status:values.status
      };

      const promise = apiService
        .post(`/Referances/AddBonus?id=${id}&amount=${params.amount}&status=${params.status}`,{})
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Success"));
            navigate(`/admin/Referances`);
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
          amount: 0,
          status: 0,
        }}
      />
    </div>
  );
};

export default NewIncome;
