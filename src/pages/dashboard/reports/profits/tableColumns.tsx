import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },

  {
    field: "type",
    headerName: "Type",
    flex: 1,
    headerClassName: "header-item",
  },

  {
    field: "count",
    headerName: "Count",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "purchasePrice",
    headerName: "Purchase Price",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "salePrice",
    headerName: "salePrice",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "profit",
    headerName: "Profits",
    flex: 1,
    headerClassName: "header-item",
  },
  
];
