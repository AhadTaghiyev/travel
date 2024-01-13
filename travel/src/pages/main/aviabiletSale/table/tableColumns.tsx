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
    valueGetter: (params) => params.row?.customer?.fullName,
  },
  {
    field: "ticketNo",
    headerName: t("ticketNo"),
    flex: 1,
    headerClassName: "header-item",
    valueGetter: (params) =>
      params.row?.planeTickets.map((item, index) => item.ticketNo).join(),
  },
  {
    field: "passengerName",
    headerName: t("passengerName"),
    flex: 1,
    headerClassName: "header-item",
    valueGetter: (params) =>
      params.row?.planeTickets.map((item, index) => item.passengerName).join(),
  },
  {
    field: "Amount",
    headerName: t("commonPrice"),
    flex: 1,
    headerClassName: "header-item",
    valueGetter: (params) =>
      params.row?.planeTickets.reduce((acc, item) => acc + item.commonPrice, 0),
  },
  {
    field: "personal",
    headerName: t("personal"),
    flex: 1,
    headerClassName: "header-item",
    valueGetter: (params) =>
      params.row?.planeTickets
        .map((item, index) => item.personal.fullName)
        .join(),
  },
];
