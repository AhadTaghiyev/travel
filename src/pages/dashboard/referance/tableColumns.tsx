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
    field: "status",
    headerName: t("Status"),
    flex: 1,
    headerClassName: "header-item",
    renderCell: (params) => {
      const id = params.row.id;
     

      return (
        <div>
        <div
          className={cn(
            "flex border-none items-center gap-x-4 font-semibold",
            params.value ? "text-green-500" : "text-red-500"
          )}
        >
          {params.value ? "Approval" : "Pending"}
        </div>
      </div>
      );
    },
  },
  {
    field: "balance",
    headerName: t("Balance"),
    flex: 1,
    headerClassName: "header-item",
  },
];
