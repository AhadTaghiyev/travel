import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns: (t: TFunction) => GridColDef[] = (t: TFunction) => [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "from",
    headerName: t("Haradan"),
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
    field: "date",
    headerName: t("Date"),
    flex: 1,
    headerClassName: "header-item",
  },
];
