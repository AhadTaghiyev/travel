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
    field: "paidRef",
    headerName: t("Credit Ref"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "to",
    headerName: t("Haraya"),
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
    field: "percent",
    headerName: t("Percent"),
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
