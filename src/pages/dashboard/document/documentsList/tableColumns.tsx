// import { GridColDef } from "@mui/x-data-grid";
import { BiSolidFileBlank } from "react-icons/bi";
import Tooltip from "@mui/material/Tooltip";

export const getColumns = (t) => [
  {
    field: "No",
    headerName: t("No"),
    flex: 1,
    headerClassName: "header-item",
    width: 100,
    minWidth: 100,
    maxWidth: 100,
  },
  {
    field: "companyId",
    headerName: t("Company ID"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "company",
    headerName: t("Company"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "phoneNumber",
    headerName: t("PhoneNumber"),
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "text",
    headerName: t("Text"),
    flex: 1,
    headerClassName: "header-item",
    renderCell: (params) => {
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
    headerName: t("Detail"),
    flex: 1,
    headerClassName: "header-item",
    width: 100,
    minWidth: 100,
    maxWidth: 100,
    renderCell: (params) => {
      const handleDownload = () => {
        const filepaths = params.row.filePath;
        filepaths.forEach((filepath) => {
          fetch(filepath)
            .then((response) => response.blob())
            .then((blob) => {
              const url = window.URL.createObjectURL(new Blob([blob]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", filepath.split("/").pop());
              document.body.appendChild(link);
              link.click();
              link.parentNode.removeChild(link);
            })
            .catch((error) => console.error("Dosya indirme hatası:", error));
        });
      };

      return (
        <button onClick={handleDownload}>
          <BiSolidFileBlank />
        </button>
      );
    },
  },
];
