import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { ICustomerModel } from "../types";

import CustomerForm from "../form";

const NewCustomer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (
      values: ICustomerModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const promise = apiService
        .post(`/Customers/Create`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Müştəri yaradıldı"));
            navigate(`/panel/customers`);
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
        {t("Create Customer")}
      </h1>
      <CustomerForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={{
          fullName: "",
          phoneNumber: "",
          email: "",
        }}
      />
    </div>
  );
};

export default NewCustomer;
