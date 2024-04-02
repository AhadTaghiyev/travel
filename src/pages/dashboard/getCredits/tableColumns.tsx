import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns: (t: TFunction) => GridColDef[] = (t: TFunction) => [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "ref",
    headerName: t("Ref"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "from",
    headerName: t("Loan From"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "amount",
    headerName: t("Məbləğ"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "restOfAmount",
    headerName: t("restOfAmount"),
    flex: 1,
    headerClassName: "header-item",
  },
  
  {
    field: "date",
    headerName: t("Date"),
    flex: 1,
    headerClassName: "header-item",
  },
];
