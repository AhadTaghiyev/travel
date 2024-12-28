import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IGetCreditModel } from "../types";

import GetCreditForm from "../form";

const NewGetCredit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (
      values: IGetCreditModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const promise = apiService
        .post(`/GetCredits/Create`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Received Loan"));
            navigate(`/panel/getCredits`);
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
        {t("Received Loan")}
      </h1>
      <GetCreditForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          bankId: null,
          amount: 0,
          date: new Date(),
        }}
      />
    </div>
  );
};

export default NewGetCredit;
