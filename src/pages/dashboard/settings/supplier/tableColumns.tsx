import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns: (t: TFunction) => GridColDef[] = (t: TFunction) => [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "name",
    headerName: t("Ad"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "balance",
    headerName: t("Balans"),
    flex: 1,
    headerClassName: "header-item",
  },
];
