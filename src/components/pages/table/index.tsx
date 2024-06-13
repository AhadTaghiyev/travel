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
import { ROLES, SERVER_BASE_URL } from "@/constants";
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
  if (user?.role !== ROLES.LEADER&&user?.role !== ROLES.Admin) {
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
    : dayjs().startOf("year");
  const defaultEndDate = dayjs(searchParams.get("endDate")).isValid()
    ? dayjs(new Date(searchParams.get("endDate")))
    : dayjs().endOf("year");
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [filter, setFilter] = useState<string>(defaultFilterValue || "");
  const [open, setOpen] = useState(false);
  const idToDelete = useRef("");

  const handleStartDateChange = (newValue) => {
    setStartDate(dayjs(newValue));
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(dayjs(newValue));
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
      const promise = axios.get(`${SERVER_BASE_URL}/${exportLink}`, config);

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
    headerClassName: "header-item",
    renderCell: (params) => {
      if (params.row.id === "total") return null;
      let detailUrl = detailLink
        ? detailLink + params.row.id
        : `${root}/report?tickets=${params.row.id}`;

      if (addDateToReport) {
        detailUrl += detailUrl.includes("?") ? "&" : "?";
        detailUrl += `startDate=${startDate}&endDate=${endDate}`;
      }

      return (
        <div
          className="flex justify-between items-center gap-x-3"
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
          `${api}/${
            paginationModel.page + 1
          }?starDate=${startDate}&endDate=${endDate}&search=${search}&type=${filter}`
        );
        if (!response?.data) return;
        const { items, totalItems, totalPages, ...rest } = response.data;
        const formattedData = items.map((item) => {
          const newItem = { ...item };

          if (newItem.date) {
            newItem.date = formatDate(newItem.date);
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
  }, [paginationModel.page, startDate, endDate, search, filter, itemStatus]);

  const totalRow = useMemo(() => {
    if (!totalProps || !rows || totalProps?.length === 0 || rows?.length === 0)
      return null;
    const row = { id: "total", No: "Total" };

    totalProps?.forEach((prop) => {
      row[prop] =
        totals[`total${prop.toLowerCase()}`] ||
        rows.reduce((acc, row) => acc + row[prop], 0);
    });
    return row;
  }, [rows, totalProps]);

  const tableRows = useMemo(() => {
    const arr = rows?.map((row, index: number) => ({
      No: index + 1,
      ...row,
    }));
    if (arr.length > 0 && totalRow) {
      arr.push(totalRow);
    }
    return arr;
  });

  return (
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
                  handleStartDateChange(data ?? new Date());
                }}
              />
            </Grid>
          )}
          <Grid item md={2} className="min-w-[200px] flex items-center">
            <CustomDateTimePicker
              hideError
              value={endDate}
              change={(data) => {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.set(
                  "endDate",
                  (data ?? new Date()).toISOString()
                );
                setSearchParams(newSearchParams);
                handleEndDateChange(data ?? new Date());
              }}
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
              })),
              field,
            ]}
            paginationMode="server"
            rows={tableRows}
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
            checkboxSelection
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
