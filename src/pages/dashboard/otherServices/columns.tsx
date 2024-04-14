import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns = (t: TFunction): GridColDef[] => [
  { field: "No", headerName: t("no"), flex: 1, headerClassName: "header-item" },
  {
    field: "date",
    headerName: t("date"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "invoiceNo",
    headerName: "Inv. Ref.",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "customer",
    headerName: t("customer"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "service",
    headerName: t("Servis Adı"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "totalAmount",
    headerName: t("commonPrice"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "totalPaidAmount",
    headerName: t("paidamount"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "totalDebtAmount",
    headerName: t("balance"),
    flex: 1,
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
