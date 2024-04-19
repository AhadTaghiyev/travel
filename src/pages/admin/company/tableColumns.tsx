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
    field: "name",
    headerName: "Name",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
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
        {params.value ? "active" : "inactive"}
      </div>
    ),
  },
];
