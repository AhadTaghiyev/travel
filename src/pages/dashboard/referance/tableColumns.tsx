import { cn } from "@/lib/utils";
import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const columns: (t: TFunction) => GridColDef[] = (t: TFunction) => [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "name",
    headerName: t("Ad"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "phone",
    headerName: t("Phone"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "city",
    headerName: t("Adress"),
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
    field: "amount",
    headerName: t("Balance"),
    flex: 1,
    headerClassName: "header-item",
  },

  {
    field: "referanceStatus",
    headerName: "Status",
    flex: 1,
    headerClassName: "header-item",
    renderCell: (params) => {
      return (
        <div>
          <div
            className={cn(
              "flex border-none items-center gap-x-4 font-semibold",
              // params.value ? "text-green-500" : "text-red-500"
              params.value==0 ?"Pending":params.value==1? "text-red-500" : "text-green-500"
            )}
          >
            {params.value==0 ?"Pending":params.value==1? "Rejected" : "Compleete"}
          </div>
        </div>
      );
    },
  },
];
