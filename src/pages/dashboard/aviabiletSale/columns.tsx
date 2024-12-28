import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns = (t: TFunction): GridColDef[] => [
  { field: "No", headerName: t("no"), flex: 0.3, headerClassName: "header-item" },
  {
    field: "date",
    headerName: t("date"),
    flex: 0.95,
    headerClassName: "header-item",
  },
  {
    field: "invoiceNo",
    headerName: t("Inv. Ref."),
    flex: 0.8,
    headerClassName: "header-item",
  },
  {
    field: "cutomerName",
    headerName: t("customer"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "supplierName",
    headerName: t("supplier"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "ticketNo",
    headerName: t("ticketNo"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "passangerNames",
    headerName: t("passengerName"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "totalAmount",
    headerName: t("commonPrice"),
    flex: 0.7,
    headerClassName: "header-item",
  },
  {
    field: "totalPaidAmount",
    headerName: t("paidamount"),
    flex: 0.8,
    headerClassName: "header-item",
  },
  {
    field: "totalDebtAmount",
    headerName: t("balance"),
    flex: 0.8,
    headerClassName: "header-item",
  },
  {
    field: "totalSupplierPaidAmount",
    headerName: t("Supplier Paid Amount"),
    flex: 1.2,
    headerClassName: "header-item",
  },
  {
    field: "totalSupplierDebtAmount",
    headerName: t("Supplier Debt Amount"),
    flex: 1.2,
    headerClassName: "header-item",
  },
  {
    field: "personal",
    headerName: t("personal"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "refundStatus",
    headerName: t("Status"),
    flex: 1,
    headerClassName: "header-item",
    cellClassName: (params) =>
      params.value ? "refund-true" : "refund-false",
    valueGetter: (params) => (params.value ? "Refunded" : "Not Refunded"),
  },
];
