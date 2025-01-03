import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "@/lib/utils";
import { TFunction } from "i18next";

export const getColumns = (t: TFunction): GridColDef[] => [
  {
    field: "No",
    headerName: t("no"),
    flex: 0.2,
    headerClassName: "header-item",
  },
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
    field: "customer",
    headerName: t("customer"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "supplier",
    headerName: t("supplier"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "rezervationNumbers",
    headerName: t("Rezervasiya nömrəsi"),
    flex: 1,
    headerClassName: "header-item",
  },
  // {
  //   field: "tourName",
  //   headerName: t("Tur Adı"),
  //   flex: 1,
  //   headerClassName: "header-item",
  // },
  {
    field: "hotelName",
    headerName: t("Otel adı"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "dateOfDeparture",
    headerName: t("Gediş tarixi"),
    flex: 1.5,
    headerClassName: "header-item",
    renderCell: ({ value }) => {
      return value.map((item) => formatDate(item)).join(", ");
    },
  },
  // {
  //   field: "returnDate",
  //   headerName: t("Dönüş tarixi"),
  //   flex: 1,
  //   headerClassName: "header-item",
  //   renderCell: ({ value }) => {
  //     return value.map((item) => formatDate(item)).join(", ");
  //   },
  // },
  {
    field: "totalAmount",
    headerName: t("commonPrice"),
    flex: 0.8,
    headerClassName: "header-item",
  },
  {
    field: "recivedAmount",
    headerName: t("paidamount"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "totalDebtAmount",
    headerName: t("balance"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "totalSupplierPaidAmount",
    headerName: t("Supplier Paid Amount"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "totalSupplierDebtAmount",
    headerName: t("Supplier Debt Amount"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "personal",
    headerName: t("personal"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "refundStatus",
    headerName: t("Status"),
    flex: 1,
    headerClassName: "header-item",
    cellClassName: (params) =>
      params.value ? "refund-true" : "refund-false",
    valueGetter: (params) => (params.value ? "Refunded" : "Not Refunded"),
  },
];
