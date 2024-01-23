import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { useCallback } from "react";
import { toast } from "sonner";

import { IInvoiceModel, ITourPackageModel } from "../types";
import { apiService } from "@/server/apiServer";

import TourPackageForm from "../form";

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
  referenceNo: 0,
  purchasePrice: 0,
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
      const promise = apiService
        .post(`/TourPackages/Create`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("TourPackage created"));
            navigate(`/panel/tourPackages/report?tickets=${response.data}`);
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
