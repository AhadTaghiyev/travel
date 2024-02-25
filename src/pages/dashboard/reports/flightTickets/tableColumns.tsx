import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "passanger",
    headerName: "Passanger", // Hola
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "ref",
    headerName: "Ref.", //  Hola
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "airway",
    headerName: "Havayolu", //  Hola
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "ticketNumber",
    headerName: "Ticket Number", //  Hola
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "segment",
    headerName: "Segment", //  Hola
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "purchasePrice",
    headerName: "Purchase Price", //  Hola
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "sellingPrice",
    headerName: "Selling Price", //  Hola
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "supplier",
    headerName: "Təchizatçı",
    flex: 1,
    headerClassName: "header-item",
  },
];
