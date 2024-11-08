import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { useCallback } from "react";
import { toast } from "sonner";

import {
  IInvoiceDirections,
  IInvoiceModel,
  ICorporateTicketModel,
} from "../types";
import { apiService } from "@/server/apiServer";

import CorperativeTicketForm from "../form";

export const invoiceDirectionInitialValues: IInvoiceDirections = {
  flightDate: new Date(),
  direction: "",
};

export const corperativeTicketInitialValues: ICorporateTicketModel = {
  ticketNo: "",
  purchasePrice: 0,
  sellingPrice: 0,
  segmentCount: 0,
  discount: 0,
  commonPrice: 0,
  supplierId: null,
  personalId: null,
  passanger: "",
  airWayId: null,
  fare: 0,
  taxes: 0,
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
  corporativeTickets: [cloneDeep(corperativeTicketInitialValues)],
};

const NewTicket = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: IInvoiceModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const formData = new FormData();
      formData.append("customerId", values.customerId.toString());
      formData.append("date", values.date.toISOString());
      formData.append("deadLine", values.deadLine.toISOString());
      formData.append("explanation", values.explanation.toString());
      formData.append("isCustomerPaid", values.isCustomerPaid.toString());
      formData.append("isSupplierPaid", values.isSupplierPaid.toString());
      formData.append("paidAmount", values.paidAmount.toString());
      formData.append("paymentId", values.paymentId ? values.paymentId.toString() : "");

      values.corporativeTickets.forEach((ticket, index) => {
        formData.append(`corporativeTickets[${index}].ticketNo`, ticket.ticketNo);
        formData.append(`corporativeTickets[${index}].fare`, ticket.fare.toString());
        formData.append(`corporativeTickets[${index}].segmentCount`, ticket.segmentCount.toString());
        formData.append(`corporativeTickets[${index}].purchasePrice`, ticket.purchasePrice.toString());
        formData.append(`corporativeTickets[${index}].sellingPrice`, ticket.sellingPrice.toString());
        formData.append(`corporativeTickets[${index}].discount`, ticket.discount.toString());
        formData.append(`corporativeTickets[${index}].commonPrice`, ticket.commonPrice.toString());
        formData.append(`corporativeTickets[${index}].supplierId`, ticket.supplierId?.toString() || "");
        formData.append(`corporativeTickets[${index}].personalId`, ticket.personalId?.toString() || "");
        formData.append(`corporativeTickets[${index}].airWayId`, ticket.airWayId?.toString() || "");
        formData.append(`corporativeTickets[${index}].taxes`, ticket.taxes.toString() || "");
        formData.append(`corporativeTickets[${index}].passanger`, ticket.passanger.toString() || "");
        ticket.invoiceDirections.forEach((direction, directionIndex) => {
          formData.append(`corporativeTickets[${index}].invoiceDirections[${directionIndex}].direction`, direction.direction.toString() || "");
          formData.append(`corporativeTickets[${index}].invoiceDirections[${directionIndex}].flightDate`, direction.flightDate.toISOString() || "");
        });
      });

      if (values.receiptImage) {
        formData.append("receiptImage", values.receiptImage[0]);
      }

      const promise = apiService
        .postForm(`/CorporateTickets/Create`, formData)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Ticket created"));
            navigate(
              `/panel/cooperativeTicket/report?tickets=${response.data}`
            );
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
        {t("Korperativ satış")}
      </h1>
      <CorperativeTicketForm
        formType="Create"
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    </div>
  );
};

export default NewTicket;
