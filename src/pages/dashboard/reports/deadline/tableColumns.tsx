import { formatDate } from "@/lib/utils";
import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "ref",
    headerName: "Ref.",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "beneficiery",
    headerName: "Ad Soyad",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "amount",
    headerName: "Məbləğ",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "service",
    headerName: "Service",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "personal",
    headerName: "Personal",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "dueDate",
    headerName: "Due Date", // dueDate
    flex: 1,
    headerClassName: "header-item",
    renderCell: ({ value }) => {
      return value && formatDate(value);
    },
  },
];
