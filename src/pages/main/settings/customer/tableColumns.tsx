import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns: (t: TFunction) => GridColDef[] = (t: TFunction) => [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "fullName",
    headerName: t("Ad Soyad"), // Hola
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "email",
    headerName: t("Email"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "phoneNumber",
    headerName: t("Telefon"),
    flex: 1,
    headerClassName: "header-item",
  },
];
