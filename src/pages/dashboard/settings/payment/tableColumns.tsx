import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns: (t: TFunction) => GridColDef[] = (t: TFunction) => [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "type",
    headerName: t("Ödəniş növü"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "amount",
    headerName: t("Məbləğ"),
    flex: 1,
    headerClassName: "header-item",
  },
];
