import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { useCallback } from "react";
import { toast } from "sonner";

import {
  IInvoiceDirections,
  IInvoiceModel,
  IOtherServiceModal,
} from "../types";
import { apiService } from "@/server/apiServer";

import OtherServicesForm from "../form";

export const invoiceDirectionInitialValues: IInvoiceDirections = {
  flightDate: new Date(),
  direction: "",
};

export const otherServicesInitialValues: IOtherServiceModal = {
  serviceName: "",
  purchasePrice: 0,
  sellingPrice: 0,
  discount: 0,
  commonPrice: 0,
  supplierId: null,
  personalId: null,
  serviceId: null,
  invoiceDirections: [cloneDeep(invoiceDirectionInitialValues)],
  key: "AluUqcIjj",
};

const initialValues: IInvoiceModel = {
  customerId: null,
  date: new Date(),
  deadLine: new Date(),
  explanation: "",
  isSupplierPaid: false,
  isCustomerPaid: false,
  paymentId: null,
  paidAmount: 0,
  otherServices: [cloneDeep(otherServicesInitialValues)],
};

const NewOtherService = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: IInvoiceModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const promise = apiService
        .post(`/OtherServices/Create`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Digər xidmət yaradıldı"));
            navigate(`/panel/otherService/report?tickets=${response.data}`);
          } else {
            toast.error(response.message);
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
      <h1 className="text-black text-4xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
        {t("Digər xidmətlər")}
      </h1>
      <OtherServicesForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    </div>
  );
};

export default NewOtherService;
