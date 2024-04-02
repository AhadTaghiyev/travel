import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns: (t: TFunction) => GridColDef[] = (t: TFunction) => [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "text",
    headerName: t("Ad"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "status",
    headerName: t("Status"),
    flex: 1,
    headerClassName: "header-item",
  },
];
