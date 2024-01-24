import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "@/lib/utils";
import { TFunction } from "i18next";

export const getColumns = (t: TFunction): GridColDef[] => [
  { field: "No", headerName: t("no"), flex: 1, headerClassName: "header-item" },
  {
    field: "date",
    headerName: t("date"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "invoiceNo",
    headerName: "Inv. Ref.",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "dateOfDeparture",
    headerName: t("Gediş tarixi"),
    flex: 1,
    headerClassName: "header-item",
    renderCell: ({ value }) => {
      return value.map((item) => formatDate(item)).join(", ");
    },
  },
  {
    field: "returnDate",
    headerName: t("Dönüş tarixi"),
    flex: 1,
    headerClassName: "header-item",
    renderCell: ({ value }) => {
      return value.map((item) => formatDate(item)).join(", ");
    },
  },
  {
    field: "totalAmount",
    headerName: t("commonPrice"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "totalPaidAmount",
    headerName: t("paidamount"), // Hola
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "personal",
    headerName: t("personal"),
    flex: 1,
    headerClassName: "header-item",
  },
];
