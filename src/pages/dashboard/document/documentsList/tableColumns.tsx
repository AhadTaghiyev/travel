import { GridColDef } from "@mui/x-data-grid";
import { BiSolidFileBlank } from "react-icons/bi";
import Tooltip from "@mui/material/Tooltip";

export const columns: GridColDef[] = [
  {
    field: "No",
    headerName: "No",
    flex: 1,
    headerClassName: "header-item",
    width: 100,
    minWidth: 100,
    maxWidth: 100,
  },
  {
    field: "companyId",
    headerName: "CompanyId",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "company",
    headerName: "Company",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "phoneNumber",
    headerName: "PhoneNumber",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "text",
    headerName: "Text",
    flex: 1,
    headerClassName: "header-item",
    renderCell: (params: any) => {
      return (
        <Tooltip title={params.row.text} placement="bottom">
          <span
            style={{
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {params.row.text}
          </span>
        </Tooltip>
      );
    },
  },
  {
    field: "filePath",
    headerName: "Detail",
    flex: 1,
    headerClassName: "header-item",
    width: 100,
    minWidth: 100,
    maxWidth: 100,
    renderCell: (params: any) => {
      const handleDownload = () => {
        fetch(params.row.filePath)
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", params.row.filePath.split("/").pop());
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          })
          .catch((error) => console.error("Dosya indirme hatası:", error));
      };

      return (
        <button onClick={handleDownload}>
          <BiSolidFileBlank />
        </button>
      );
    },
  },
];
