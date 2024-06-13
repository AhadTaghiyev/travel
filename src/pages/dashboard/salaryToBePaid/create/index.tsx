import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { ISalaryToBePaidModel } from "../types";

import SalaryToBePaidForm from "../form";

const NewSalaryToBePaid = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (
      values: ISalaryToBePaidModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const promise = apiService
        .post(`/PaySalarys/Create`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("SalaryToBePaid Created"));
            navigate(`/panel/salaryToBePaid`);
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
        {t("Maaş Ödə")}
      </h1>
      <SalaryToBePaidForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          bonus: 0,
          salary: 0,
          extraSalary: 0,
          date: new Date(),
          personalId: null,
          paymentId: null,
          note: "",
        }}
      />
    </div>
  );
};

export default NewSalaryToBePaid;
