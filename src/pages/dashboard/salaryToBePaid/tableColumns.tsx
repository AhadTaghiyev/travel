import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns: (t: TFunction) => GridColDef[] = (t: TFunction) => [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "employee",
    headerName: t("Staff"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "ref",
    headerName: t("Ref. No."),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "salary",
    headerName: t("Maaş"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "extraSalary",
    headerName: t("Əlavə maaş"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "bonus",
    headerName: t("Bonus"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "total",
    headerName: t("Total"),
    flex: 1,
    headerClassName: "header-item",
    valueGetter: (params) => 
      (params.row.salary || 0) + (params.row.extraSalary || 0) + (params.row.bonus || 0),
  },
  {
    field: "date",
    headerName: t("date"),
    flex: 1,
    headerClassName: "header-item",
  },
];
