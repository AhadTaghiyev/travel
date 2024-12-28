import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { useCallback } from "react";
import { toast } from "sonner";

import { IInvoiceDirections, IInvoiceModel, IPlaneTicketModel } from "../types";
import { apiService } from "@/server/apiServer";

import AviabiletTicketForm from "../form";
import { toLocalISOString, toLocalISOStringV2 } from "@/lib/utils";

export const invoiceDirectionInitialValues: IInvoiceDirections = {
  flightDate: new Date(),
  direction: "",
};

export const planeTicketInitialValues: IPlaneTicketModel = {
  ticketNo: "",
  passengerName: "",
  segmentCount: 0,
  purchasePrice: 0,
  sellingPrice: 0,
  discount: 0,
  commonPrice: 0,
  supplierId: null,
  personalId: null,
  airWayId: null,
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
  planeTickets: [cloneDeep(planeTicketInitialValues)],
};

const NewTicket = () => {
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

      values.date = updatedDate;
      values.deadLine = updatedDeadline;
      console.log("values.date", values.date)
      console.log("values.deadLine", values.deadLine)
      formData.append("customerId", values.customerId.toString());
      formData.append("date", toLocalISOString(values.date));
      formData.append("deadLine", toLocalISOString(values.deadLine));
      formData.append("explanation", values.explanation.toString());
      formData.append("isCustomerPaid", values.isCustomerPaid.toString());
      formData.append("isSupplierPaid", values.isSupplierPaid.toString());
      formData.append("paidAmount", values.paidAmount.toString());
      formData.append("paymentId", values.paymentId ? values.paymentId.toString() : "");

      // Append each plane ticket separately
      values.planeTickets.forEach((ticket, index) => {
        formData.append(`planeTickets[${index}].ticketNo`, ticket.ticketNo);
        formData.append(`planeTickets[${index}].passengerName`, ticket.passengerName);
        formData.append(`planeTickets[${index}].segmentCount`, ticket.segmentCount.toString());
        formData.append(`planeTickets[${index}].purchasePrice`, ticket.purchasePrice.toString());
        formData.append(`planeTickets[${index}].sellingPrice`, ticket.sellingPrice.toString());
        formData.append(`planeTickets[${index}].discount`, ticket.discount.toString());
        formData.append(`planeTickets[${index}].commonPrice`, ticket.commonPrice.toString());
        formData.append(`planeTickets[${index}].supplierId`, ticket.supplierId?.toString() || "");
        formData.append(`planeTickets[${index}].personalId`, ticket.personalId?.toString() || "");
        formData.append(`planeTickets[${index}].airWayId`, ticket.airWayId?.toString() || "");

        // Append each direction within the ticket
        ticket.invoiceDirections.forEach((direction, dirIndex) => {
          formData.append(`planeTickets[${index}].invoiceDirections[${dirIndex}].flightDate`, toLocalISOStringV2(direction.flightDate));
          formData.append(`planeTickets[${index}].invoiceDirections[${dirIndex}].direction`, direction.direction);
        });
      });

      // Append the receipt image
      if (values.receiptImage) {
        formData.append("receiptImage", values.receiptImage[0]);
      }
      const promise = apiService
        .postForm(`/PlaneTickets/Create`, formData)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Ticket created"));
            navigate(`/panel/aviabiletsale/report?tickets=${response.data}`);
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
        {t("Aviabilet satışı")}
      </h1>
      <AviabiletTicketForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    </div>
  );
};

export default NewTicket;
