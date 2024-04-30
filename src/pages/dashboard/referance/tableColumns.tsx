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
    field: "phone",
    headerName: t("Phone"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "city",
    headerName: t("City"),
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
    field: "status",
    headerName: t("Status"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "balance",
    headerName: t("Balance"),
    flex: 1,
    headerClassName: "header-item",
  },
];
