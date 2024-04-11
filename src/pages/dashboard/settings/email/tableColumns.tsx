import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns: (t: TFunction) => GridColDef[] = (t: TFunction) => [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "displayName",
    headerName: t("Ad"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "email",
    headerName: t("Email"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "secretKey",
    headerName: t("Secret Key"),
    flex: 1,
    headerClassName: "header-item",
  },
];
