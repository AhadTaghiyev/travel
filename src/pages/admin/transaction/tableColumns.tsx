// @ts-nocheck
import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns: (t: TFunction) => GridColDef[] = (t: TFunction) => [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "id",
    headerName: "Id",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "company",
    headerName: "Company",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    headerClassName: "header-item",
  },
  
  {
    field: "status",
    headerName: "Payment Status",
    flex: 1,
    headerClassName: "header-item",
  },
];
