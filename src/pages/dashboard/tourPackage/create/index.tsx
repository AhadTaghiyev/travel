import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { useCallback } from "react";
import { toast } from "sonner";

import { IInvoiceModel, ITourPackageModel } from "../types";
import { apiService } from "@/server/apiServer";

import TourPackageForm from "../form";
import { toLocalISOString, toLocalISOStringV2 } from "@/lib/utils";

export const tourPackageInitialValues: ITourPackageModel = {
  otelName: "",
  roomName: "",
  rezervationNumber: "",
  childrenCount: 0,
  adultCount: 0,
  dateOfDeparture: new Date(),
  returnDate: new Date(),
  insurance: null,
  supplierId: null,
  personalId: null,
  tourId: null,
  transferId: null,
  diningId: null,
  netPrice: 0,
  systemPrice: 0,
  systemCommision: 0,
  sellingPrice: 0,
  discount: 0,
  commonPrice: 0,
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
  tourPackages: [cloneDeep(tourPackageInitialValues)],
};

const NewTicket = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: IInvoiceModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      console.log("submit", values);
      const formData = new FormData();

      const now = new Date();
      const updatedDate = new Date(values.date);
      const updatedDeadline = new Date(values.deadLine);

      updatedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
      updatedDeadline.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
      values.date = updatedDate;
      values.deadLine = updatedDeadline;
      formData.append("customerId", values.customerId.toString());
      formData.append("date", toLocalISOString(values.date));
      formData.append("deadLine", toLocalISOString(values.deadLine));
      formData.append("explanation", values.explanation.toString());
      formData.append("isCustomerPaid", values.isCustomerPaid.toString());
      formData.append("isSupplierPaid", values.isSupplierPaid.toString());
      formData.append("paidAmount", values.paidAmount.toString());
      formData.append("paymentId", values.paymentId ? values.paymentId.toString() : "");

      // Append each plane ticket separately
      values.tourPackages.forEach((tourPackage, index) => {
        formData.append(`tourPackages[${index}].adultCount`, tourPackage.adultCount.toString());
        formData.append(`tourPackages[${index}].childrenCount`, tourPackage.childrenCount.toString());
        formData.append(`tourPackages[${index}].commonPrice`, tourPackage.commonPrice.toString());
        formData.append(`tourPackages[${index}].dateOfDeparture`, toLocalISOStringV2(tourPackage.dateOfDeparture));
        formData.append(`tourPackages[${index}].diningId`, tourPackage.diningId.toString());
        formData.append(`tourPackages[${index}].discount`, tourPackage.discount.toString());
        formData.append(`tourPackages[${index}].supplierId`, tourPackage.supplierId?.toString() || "");
        formData.append(`tourPackages[${index}].personalId`, tourPackage.personalId?.toString() || "");
        formData.append(`tourPackages[${index}].insurance`, tourPackage.insurance?.toString() || "");
        formData.append(`tourPackages[${index}].otelName`, tourPackage.otelName || "");
        formData.append(`tourPackages[${index}].netPrice`, tourPackage.netPrice.toString() || "");
        formData.append(`tourPackages[${index}].systemPrice`, tourPackage.systemPrice.toString() || "");
        formData.append(`tourPackages[${index}].systemCommision`, tourPackage.systemCommision.toString() || "");
        formData.append(`tourPackages[${index}].returnDate`, toLocalISOStringV2(tourPackage.returnDate));
        formData.append(`tourPackages[${index}].rezervationNumber`, tourPackage.rezervationNumber || "");
        formData.append(`tourPackages[${index}].roomName`, tourPackage.roomName || "");
        formData.append(`tourPackages[${index}].sellingPrice`, tourPackage.sellingPrice.toString() || "");
        formData.append(`tourPackages[${index}].tourId`, tourPackage.tourId.toString() || "");
        formData.append(`tourPackages[${index}].transferId`, tourPackage.transferId.toString() || "");
      });

      // Append the receipt image
      if (values.receiptImage) {
        formData.append("receiptImage", values.receiptImage[0]);
      }
      const promise = apiService
        .postForm(`/TourPackages/Create`, formData)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("TourPackage created"));
            navigate(`/panel/tourPackage/report?tickets=${response.data}`);
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
      <h1 className="text-black text-3xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
        {t("Tur Paket satışı")}
      </h1>
      <TourPackageForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    </div>
  );
};

export default NewTicket;
