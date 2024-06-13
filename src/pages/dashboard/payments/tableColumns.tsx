import { GridColDef } from "@mui/x-data-grid";

export const supplierColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },

  {
    field: "ref",
    headerName: "Ref.",
    flex: 1,
    headerClassName: "header-item",
  },

  {
    field: "supplier",
    headerName: "Supplier",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "debit",
    headerName: "Amount",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "details",
    headerName: "Detail.",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    headerClassName: "header-item",
  },
];
export const refundColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "customer",
    headerName: "Customer",
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
    field: "refundRef",
    headerName: "Refund Ref.", // Hola
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
    field: "date",
    headerName: "Date",
    flex: 1,
    headerClassName: "header-item",
  },
];
export const salaryColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "employee",
    headerName: "İşçi",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "salary",
    headerName: "Maaş",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "extraSalary",
    headerName: "Əlavə maaş",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "bonus",
    headerName: "Bonus",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "date",
    headerName: "date",
    flex: 1,
    headerClassName: "header-item",
  },
];
export const creditColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "ref",
    headerName: "Ref",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "to",
    headerName: "Haraya",
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
    field: "percent",
    headerName: "Percent",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    headerClassName: "header-item",
  },
];
export const expenditureColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  // {
  //   field: "ref",
  //   headerName: "Ref",
  //   flex: 1,
  //   headerClassName: "header-item",
  // },
  {
    field: "name",
    headerName: "Ad",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "debit",
    headerName: "Amount",
    flex: 1,
    headerClassName: "header-item",
  },

];

export const advanceCollectsColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    headerClassName: "header-item",
  },
  


  {
    field: "note",
    headerName: "Qeyd",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "amount",
    headerName: "Məbləğ",
    flex: 1,
    headerClassName: "header-item",
  }
];
export const othersColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "ref",
    headerName: "Ref.",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "name",
    headerName: "Ad",
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
    field: "description",
    headerName: "Description",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    headerClassName: "header-item",
  },
];

