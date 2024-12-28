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
import { toLocalISOString } from "@/lib/utils";

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
  // invoiceDirections: [cloneDeep(invoiceDirectionInitialValues)],
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
      const formData = new FormData();

      const now = new Date();
      const updatedDate = new Date(values.date);
      const updatedDeadline = new Date(values.deadLine);

      updatedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
      updatedDeadline.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

      formData.append("customerId", values.customerId.toString());
      formData.append("date", toLocalISOString(values.date));
      formData.append("deadLine", toLocalISOString(values.deadLine));
      formData.append("explanation", values.explanation.toString());
      formData.append("isCustomerPaid", values.isCustomerPaid.toString());
      formData.append("isSupplierPaid", values.isSupplierPaid.toString());
      formData.append("paidAmount", values.paidAmount.toString());
      formData.append("paymentId", values.paymentId ? values.paymentId.toString() : "");

      // Append each plane ticket separately
      values.otherServices.forEach((otherService, index) => {
        formData.append(`otherServices[${index}].serviceId`, otherService.serviceId.toString());
        formData.append(`otherServices[${index}].serviceName`, otherService.serviceName.toString());
        formData.append(`otherServices[${index}].commonPrice`, otherService.commonPrice.toString());
        formData.append(`otherServices[${index}].discount`, otherService.discount.toString());
        formData.append(`otherServices[${index}].supplierId`, otherService.supplierId?.toString() || "");
        formData.append(`otherServices[${index}].personalId`, otherService.personalId?.toString() || "");
        formData.append(`otherServices[${index}].purchasePrice`, otherService.purchasePrice.toString() || "");
        formData.append(`otherServices[${index}].sellingPrice`, otherService.sellingPrice.toString() || "");
      });

      // Append the receipt image
      if (values.receiptImage) {
        formData.append("receiptImage", values.receiptImage[0]);
      }
      const promise = apiService
        .postForm(`/OtherServices/Create`, formData)
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
