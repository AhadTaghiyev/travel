import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  { field: "date", headerName: "Date", flex: 1, headerClassName: "header-item" },
  {
    field: "passanger",
    headerName: "Passanger",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "ref",
    headerName: "Ref.",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "airway",
    headerName: "Havayolu",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "ticketNumber",
    headerName: "Ticket Number",
    flex: 1,
    headerClassName: "header-item",
  },

  {
    field: "segment",
    headerName: "Segment",
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
    field: "sellingPrice",
    headerName: "Selling Price",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "supplier",
    headerName: "Təchizatçı",
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
    field: "customer",
    headerName: "Customer",
    flex: 1,
    headerClassName: "header-item",
  },
];
