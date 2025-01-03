// @ts-nocheck
import { useEffect, useState, useRef, useMemo, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Paper, Button } from "@mui/material";
import { InputBase, Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useSearchParams } from "react-router-dom";
import { ITableObject } from "./types";
import { toast } from "sonner";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//icons
import { AiOutlineSearch } from "react-icons/ai";
import { FiDownload, FiPrinter } from "react-icons/fi";
import { FaPrint } from "react-icons/fa";
import {
  BsCameraFill,
  BsCheckAll,
  BsEyeFill,
  BsFillTrashFill,
  BsPencilFill,
} from "react-icons/bs";

import { GridPagination } from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";
import { apiService } from "../../../server/apiServer";
import dayjs from "dayjs";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { DEFAULT_YEAR, ROLES, SERVER_BASE_URL } from "@/constants";
import { formatDate } from "@/lib/utils";
import CustomDateTimePicker from "@/components/custom/datePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isNil } from "lodash";
import { UserContext } from "@/store/UserContext";
import { YearContext } from "@/store/YearContext";

const headerStyle = {
  borderColor: "#c4c4c4",
  width: "100%",
  height: "35px",
  fontFamily: "Font Awesome 6 Pro",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "16px",
  px: 2,
};

const handlePrint = () => {
  window.print();
};
export default function Index({
  columns,
  api,
  deleteApi,
  root,
  hideFilter,
  hideEdit,
  hideCreate,
  hidePrint = true,
  hideReport,
  hideDelete,
  hideReceipt = true,
  hideOperations = false,
  isDetailedTotal = false,
  buttonText,
  exportLink,
  detailLink,
  filterOptions,
  hideStartDate,
  hideStatus = true,
  statusApi,
  onCreateClick,
  addDateToReport,
  defaultFilterValue,
  totalProps,
  showOverflow,
}: ITableObject) {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { selectedYear } = useContext(YearContext);
  if (user?.role !== ROLES.LEADER && user?.role !== ROLES.Admin) {
    hideEdit = true;
    hideDelete = true;
  }
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totals, setTotals] = useState();
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemStatus, setItemStatus] = useState(null);
  const defaultStartDate = dayjs(searchParams.get("startDate")).isValid()
    ? dayjs(new Date(searchParams.get("startDate")))
    : selectedYear
      ? dayjs(new Date(String(selectedYear === "All" ? Number(DEFAULT_YEAR) : selectedYear))).startOf("year")
      : dayjs().startOf("year");
  const defaultEndDate = dayjs(searchParams.get("endDate")).isValid()
    ? dayjs(new Date(searchParams.get("endDate")))
    : dayjs(new Date(String(selectedYear === "All" ? new Date().getFullYear() : selectedYear))).endOf("year");;
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [filter, setFilter] = useState<string>(defaultFilterValue || "");
  const [open, setOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const idToDelete = useRef("");

  const handleStartDateChange = (newValue) => {
    setStartDate(dayjs(newValue));
  };

  const handleEndDateChange = (newValue) => {
    const adjustedEndDate = dayjs(newValue)
      .hour(23)
      .minute(59)
      .second(59)
      .millisecond(999);

    const formattedEndDate = adjustedEndDate.format('YYYY-MM-DDTHH:mm:ss.SSS');

    setEndDate(adjustedEndDate);
  };

  useEffect(() => {
    setStartDate(dayjs(new Date(String(selectedYear === "All" ? Number(DEFAULT_YEAR) : selectedYear))).startOf("year"))
    setEndDate(dayjs(new Date(String(selectedYear === "All" ? new Date().getFullYear() : selectedYear))).endOf("year"))
  }, [selectedYear])

  const handleCameraClick = (image) => {
    setImageUrl(image);
    setImageModalOpen(true);
  };

  const { t } = useTranslation();
  async function deleteItem(id: string): Promise<any> {
    try {
      const res = await apiService.delete(deleteApi!, id);
      if (res.status === 200) setRows(rows.filter((x: any) => x.id !== id));
    } catch {
      console.error;
    }
  }

  async function changeItem(id: string): Promise<any> {
    try {
      const res = await apiService.patch(statusApi!, id);
      setItemStatus(res);
    } catch {
      console.error;
    }
  }

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token"); // Replace "your_token_key" with the actual key you used to store the token
      if (!token) {
        console.error("Token is not found");
        return;
      }

      const config = {
        responseType: "blob", // Binary data as the response
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const promise = axios.get(`${SERVER_BASE_URL}/${exportLink}?search=${search}&startDate=${startDate}&endDate=${endDate}`, config);

      toast.promise(promise, {
        loading: t("Loading..."),
      });

      const response = await promise;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${buttonText}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("An error occurred while downloading the data: ", error);
    }
  };

  const field = {
    field: "procedures",
    headerName: t("operations"),
    headerStyle: {
      color: "#fff",
    },
    minWidth: 120,
    headerClassName: "header-item super-app-theme--header",
    renderCell: (params) => {
      if (params.row.id === "total" && !isDetailedTotal) return null;
      let detailUrl = detailLink
        ? detailLink + params.row.id
        : `${root}/report?tickets=${params.row.id}`;

      if (addDateToReport) {
        detailUrl += detailUrl.includes("?") ? "&" : "?";
        detailUrl += `startDate=${startDate}&endDate=${endDate}`;
      }

      return (
        <div
          className="flex justify-between items-center gap-x-2"
          style={{ cursor: "pointer" }}
        >
          {!hideEdit && (
            <Link
              to={`${root}/update/${params.row.id}`}
              className="hover:opacity-70 transition"
            >
              <BsPencilFill />
            </Link>
          )}
          {!hideReport && (
            <Link to={detailUrl} className="hover:opacity-70 transition">
              <BsEyeFill />
            </Link>
          )}
          {!hideReceipt && (
            <button className="hover:opacity-70 transition" onClick={() => handleCameraClick(params.row.receiptImage)}>
              <BsCameraFill />
            </button>
          )}
          {!hidePrint && (
            <Link
              to={`${root}/view/${params.row.id}`}
              className="hover:opacity-70 transition"
            >
              <FaPrint />
            </Link>
          )}
          {!hideDelete && (
            <BsFillTrashFill
              onClick={() => {
                setOpen(true);
                idToDelete.current = params.row.id;
              }}
              className="hover:opacity-70 transition"
            />
          )}
          {!hideStatus && (
            <BsCheckAll
              onClick={() => {
                changeItem(params.row.id);
              }}
              className="hover:opacity-70 transition"
            />
          )}
        </div>
      );
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `${api}/${paginationModel.page + 1
          }?starDate=${startDate}&endDate=${endDate}&search=${search}&isPaginated=${!isFiltering}&type=${filter}`
        );
        if (!response?.data) return;
        const { items, totalItems, totalPages, ...rest } = response.data;
        const formattedData = items.map((item) => {
          const newItem = { ...item };

          if (newItem.date) {
            newItem.date = formatDate(newItem.date);
          }

          if (newItem.status) {
            newItem.status = t(newItem.status);
          }

          if (newItem.type) {
            newItem.type = t(newItem.type);
          }

          return newItem;
        });
        setRows(formattedData);
        setTotalRows(totalItems);
        setTotalPages(totalPages);
        setTotals({ ...rest });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [paginationModel.page, startDate, endDate, search, filter, itemStatus, isFiltering]);

  const totalRow = useMemo(() => {
    if (!rows || rows.length === 0 || !totalProps || totalProps?.length === 0) return null;

    if (isDetailedTotal) {
      // Detaylı toplam
      const row = { id: "total", No: t("Total"), type: t("All Tickets") };

      row["count"] = rows.reduce((acc, curr) => acc + (Number(curr.count) || 0), 0);

      totalProps?.forEach((prop) => {
        if (prop !== "count") {
          row[prop] =
            totals?.[`total${prop.toLowerCase()}`] ||
            rows.reduce((acc, curr) => acc + (Number(curr[prop]) || 0), 0);
        }
      });

      return row;
    } else {
      // Basit toplam
      const row = { id: "total", No: t("Total") };

      totalProps?.forEach((prop) => {
        row[prop] =
          totals?.[`total${prop.toLowerCase()}`] ||
          rows.reduce((acc, curr) => acc + (Number(curr[prop]) || 0), 0);
      });

      return row;
    }
  }, [rows, totalProps, totals, isDetailedTotal]);

  const tableRows = useMemo(() => {
    const arr = rows?.map((row, index: number) => ({
      No: index + 1,
      ...row,
      category: row.id === 0 && row.category === "Founder/Debt" ? t("Others") : row.category,
      fullName: row.id === 0 && row.category === "Founder/Debt" ? t("Others") : row.fullName,
    }));

    if (arr.length > 0 && totalRow) {
      arr.push(totalRow);
    }

    return arr;
  }, [rows, totalRow, isDetailedTotal]);


  const handleFilterModelChange = (filterModel) => {
    const isFilterActive = filterModel.items.some((item) => item.value && item.value.trim() !== "");

    if (isFilterActive) {
      setIsFiltering(true);
    } else {
      setIsFiltering(false);
    }
  };

  return (
    <>
      <Grid container spacing={1} className="items-center w-full gap-2 pt-1">
        {!hideCreate && (
          <Grid item md={2}>
            {onCreateClick ? (
              <Button
                onClick={onCreateClick}
                variant="contained"
                color="primary"
                sx={headerStyle}
              >
                + {t(buttonText)}
              </Button>
            ) : (
              <Link to={`${root}/new`}>
                <Button variant="contained" color="primary" sx={headerStyle}>
                  + {t(buttonText)}
                </Button>
              </Link>
            )}
          </Grid>
        )}
        {!hideFilter && (
          <Grid item md={2} style={{ justifyContent: "center" }}>
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                boxShadow: "none",
                border: "1px solid #c4c4c4",
                height: "36px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: "12px" }}
                placeholder={t("Axtar")}
                inputProps={{ "aria-label": "axtar" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton type="button" sx={{ p: 0 }} aria-label="search">
                <AiOutlineSearch style={{ fontSize: "15px", padding: 0 }} />
              </IconButton>
            </Paper>
          </Grid>
        )}
        {filterOptions && (
          <Grid item md={2} className="items-center">
            <Select
              onValueChange={(value) => {
                setFilter(value);
              }}
              defaultValue={defaultFilterValue}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("Select option")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value={null}
                  disabled={true}
                  className="hidden last:block"
                >
                  {isNil(filterOptions) ? t("Loading...") : t("No item found")}
                </SelectItem>
                {filterOptions?.map((option) => (
                  <SelectItem
                    value={String(option.value)}
                    key={String(option.value)}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Grid>
        )}
        {!hideFilter && (
          <>
            {!hideStartDate && (
              <Grid item md={2} className="min-w-[200px] flex items-center">
                <CustomDateTimePicker
                  hideError
                  value={startDate}
                  change={(data) => {
                    const newSearchParams = new URLSearchParams(searchParams);
                    newSearchParams.set(
                      "startDate",
                      (data ?? new Date()).toISOString()
                    );
                    setSearchParams(newSearchParams);
                    handleStartDateChange(data ?? startDate);
                  }}
                  isStartDate={true}
                />
              </Grid>
            )}
            <Grid item md={2} className="min-w-[200px] flex items-center">
              <CustomDateTimePicker
                hideError
                value={endDate}
                change={(data) => {
                  console.log("data", data)
                  const newSearchParams = new URLSearchParams(searchParams);
                  newSearchParams.set(
                    "endDate",
                    (data ?? new Date(selectedYear === "All" ? new Date().getFullYear() : selectedYear, 11, 31)).toISOString()
                  );
                  setSearchParams(newSearchParams);
                  handleEndDateChange(data ?? new Date());
                }}
                isStartDate={false}
              />
            </Grid>
            <Grid item className="removeFromPrint">
              <Button
                onClick={handleDownload}
                variant="outlined"
                sx={headerStyle}
                style={{ fontSize: "9px" }}
                color="inherit"
              >
                <FiDownload style={{ marginRight: "6px" }} />
                {t("Export")}
              </Button>
            </Grid>
            <Grid item className="removeFromPrint">
              <Button
                onClick={handlePrint}
                variant="outlined"
                sx={headerStyle}
                style={{ fontSize: "9px" }}
                color="inherit"
              >
                <FiPrinter style={{ marginRight: "6px" }} />
                {t("Print")}
              </Button>
            </Grid>
          </>
        )}
        <Grid sx={{ backgroundColor: "white" }} item xs={12}>
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              rowHeight={35}
              loading={loading}
              columns={[
                ...columns.map((col) => ({
                  ...col,
                  headerName: t(col.headerName),
                  headerClassName: "super-app-theme--header"
                })),
                ...(!hideOperations ? [field] : []),
              ]}
              paginationMode="server"
              rows={tableRows}
              pageSizeOptions={[5, 10, 50]}
              disableRowSelectionOnClick={true}
              onFilterModelChange={handleFilterModelChange}
              sx={{
                '& .super-app-theme--header': {
                  backgroundColor: '#3275BB',
                  color: "#fff"
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#3275BB',
                  color: "#fff",
                },
                "& .MuiDataGrid-columnHeaderTitleContainer": {
                  borderRight: "1px solid #fff",
                },
                "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnHeaderTitleContainer": {
                  borderRight: "none", // Son kolon için border-right kaldırıldı
                },
                "& .MuiDataGrid-columnHeader:nth-last-of-type(2) .MuiDataGrid-columnHeaderTitleContainer": {
                  borderRight: "none", // Sondan bir önceki kolon için border-right kaldırıldı
                },
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
                  overflow: `${showOverflow ? "visible" : "hidden"} !important`,
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
              rowCount={totalRows}
              pagination
              slots={{
                pagination: CustomPagination,
              }}
              slotProps={{
                pagination: {
                  count: totalPages,
                },
              }}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            // checkboxSelection
            />
          </div>
        </Grid>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Əminsiniz?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("Silindikdən sonra qeri qaytarmaq mümkün deyil")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Xeyr</Button>
            <Button
              onClick={() => {
                deleteItem(idToDelete.current);
                setOpen(false);
              }}
              autoFocus
            >
              {t("Bəli")}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      {imageModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-xl w-full max-h-[80vh] overflow-hidden">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setImageModalOpen(false)}
            >
              &times;
            </button>
            <div className="flex justify-center items-center h-full">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Receipt"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <p className="text-center text-gray-600">No receipt image available</p>
              )}
            </div>
          </div>
        </div>
      )}


    </>
  );
}

function Pagination({
  page,
  onPageChange,
  className,
  count,
}: Pick<
  TablePaginationProps,
  "page" | "onPageChange" | "className" | "count"
>) {
  const res = (
    <MuiPagination
      color="primary"
      className={className}
      count={count}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
  return res;
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
