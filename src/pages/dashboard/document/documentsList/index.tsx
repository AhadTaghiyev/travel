import { columns } from "./tableColumns";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { apiService } from "../../../../server/apiServer";
import { useTranslation } from "react-i18next";

export default function index() {
  const [rows, setRows] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get("Document/Get");

        setRows(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-1 p-4 bg-white shadow-md min-h-[500px]">
      <h1 className="text-black text-4xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
        {t("Sənədlər")}
      </h1>
      <div style={{ height: "65vh", width: "100%" }}>
        <DataGrid
          columns={columns}
          paginationMode="server"
          rows={rows?.map((row: any, index: number) => ({
            No: index + 1,
            ...row,
          }))}
          pageSizeOptions={[10, 50, 100]}
          disableRowSelectionOnClick={true}
          sx={{
            "& .MuiDataGrid-row": {
              width: "100%!important",
            },
            ".MuiDataGrid-columnHeaders": {
              height: "100%!important",
              minHeight: "40px!important",
              borderColor: "#00000070",
            },
            ".MuiDataGrid-columnHeader": {
              height: "40px!important",
              fontSize: "14px",
              fontWeight: "bold!important",
            },
            "&.MuiDataGrid-root": {
              padding: 0,
            },
            "& .MuiDataGrid-cell": {
              border: 1,
              borderRight: 0,
              borderTop: 0,
              borderColor: "#e0e0e0",
            },
            "& .MuiDataGrid-cell:last-child": {
              borderRight: 0,
              borderBottom: 1,
              borderColor: "#e0e0e0",
              width: "100%!important",
              maxWidth: "100%!important",
            },
            "& .MuiDataGrid-cellContent": {
              fontSize: 12,
            },
            "& .header-item": {
              borderLeft: 1,
              borderRight: 0,
              borderTop: 0,
              borderColor: "#e0e0e0",
              width: "100%",
              height: "100%",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold!important",
            },
            "& .MuiDataGrid-virtualScroller": {
              minHeight: "160px!important",
            },
            "& .MuiDataGrid-virtualScrollerRenderZone": {
              width: "100%!important",
            },
          }}
          pagination
          checkboxSelection
        />
      </div>
    </div>
  );
}
