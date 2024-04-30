import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns: (t: TFunction) => GridColDef[] = () => [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "fullName",
    headerName: "Ad Soyad",
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
    headerName: "Telefon",
    flex: 1,
    headerClassName: "header-item",
  },
];


