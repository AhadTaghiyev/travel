import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns: (t: TFunction) => GridColDef[] = (t: TFunction) => [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "employee",
    headerName: t("İşçi"),
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
    field: "date",
    headerName: t("date"),
    flex: 1,
    headerClassName: "header-item",
  },
];
