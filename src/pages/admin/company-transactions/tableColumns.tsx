// @ts-nocheck
import { formatDate } from "@/lib/utils";
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
    field: "status",
    headerName: "Subscribe Status",
    flex: 1,
    headerClassName: "header-item",
    renderCell: (params) => (
      <div className={`${params.value ? "text-green-500" : "text-red-500"}`}>
        {params.value ? "Paid" : "Not Paid"}
      </div>
    ),
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    headerClassName: "header-item",
    renderCell: (params) => <div>{formatDate(params.value)}</div>,
  },
];
