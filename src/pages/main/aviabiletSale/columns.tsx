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
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "totalPaidAmount",
    headerName: t("commonPrice"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "personal",
    headerName: t("personal"),
    flex: 1,
    headerClassName: "header-item",
  },
 
];
