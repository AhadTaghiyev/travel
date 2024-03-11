// @ts-nocheck
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { apiService } from "../../../server/apiServer";
import Container from "@mui/material/Container";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FiDownload } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import img from "../../../assets/abc_home-1.jpg";
const headerStyle = {
  borderColor: "#c4c4c4",
  padding: "0px 10px",
  width: "100%",
  height: "35px",
  fontFamily: "Font Awesome 6 Pro",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "16px",
};

function getNestedProperty(obj: any, path: string): any {
  const keys = path.split(".");
  let current: any = obj;

  for (const key of keys) {
    if (current[key] === undefined) {
      return undefined;
    } else {
      current = current[key];
    }
  }
  return current;
}
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

interface ITableItemModel {
  headers?: ITableHeaderModel[];
  items?: any[];
  totals?: any;
}

interface ITableHeaderModel {
  prop: string;
  field: string;
}

export default function Index({ api, current = null }: any) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [tableItem, setTableItem] = useState<ITableItemModel>({});

  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));

  useEffect(() => {
    async function fetchData() {
      const res = await apiService.get(
        `Report/${api}?startDate=${startDate}&endDate=${endDate}&query=${current}`
      );
      if (res.status === 200) {
        const newTableItem = {
          headers: [],
          items: res.data.items,
          totals: res.data.totals,
        };

        for (const key in res.data.items[0]) {
          if (key !== "id") {
            newTableItem.headers.push({
              prop: key,
              field: key,
            });
          }
        }

        setTableItem(newTableItem);
      }
    }
    try {
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, [startDate, endDate, current]);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mb: 5, backgroundColor: "white" }}>
      <Grid
        container
        spacing={3}
        sx={{ mb: 2, width: "100%", borderTop: "1px solid #d8d3d3", mt: 1 }}
      >
        <Grid item md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DatePicker
                slotProps={{
                  textField: {
                    size: "small",
                    InputProps: { sx: { fontSize: "12px" } },
                  },
                }}
                sx={{ width: "100%", mb: 1 }}
                label=""
                onChange={(newValue) => {
                  const event = {
                    target: {
                      value: newValue,
                    },
                  };
                  handleStartDateChange(event.target.value);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>

        <Grid item md={3} sx={{ mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DatePicker
                slotProps={{
                  textField: {
                    size: "small",
                    InputProps: { sx: { fontSize: "12px" } },
                  },
                }}
                sx={{ width: "100%", mb: 1 }}
                label=""
                onChange={(newValue) => {
                  const event = {
                    target: {
                      value: newValue,
                    },
                  };
                  handleEndDateChange(event.target.value);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
          {/* <Button variant="text" color='inherit' sx={{ml: 4, fontSize: '12px', lineHeight: '16px'}}><BsWhatsapp style={{marginRight: '8px'}}/> Whatsapp-a göndər</Button> */}
          <Button
            variant="text"
            color="inherit"
            sx={{ ml: 4, fontSize: "12px", lineHeight: "16px" }}
          >
            {" "}
            <AiOutlineMail style={{ marginRight: "8px" }} /> Send mail
          </Button>
          <Button
            onClick={handlePrint}
            variant="text"
            color="inherit"
            sx={{ ml: 4, fontSize: "12px", lineHeight: "16px" }}
          >
            <FiDownload style={{ marginRight: "8px" }} /> Print
          </Button>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={3}>
            <img src={img} style={{ width: "100%" }} />
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item style={{ paddingLeft: 0 }}>
          {/* <Button
            onClick={handlePrint}
            variant="outlined"
            sx={headerStyle}
            color="inherit"
            >
            <FiDownload style={{ marginRight: '6px' }} />
            Export
            </Button> */}
        </Grid>

        <TableContainer ref={componentRef} component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                  size="medium"
                  align="left"
                  sx={{ fontWeight: "bold", borderLeft: "1px solid #e0e0e0" }}
                >
                  No
                </TableCell>
                {tableItem?.headers?.map((elem, index) => (
                  <TableCell
                    size="medium"
                    align="left"
                    sx={{ fontWeight: "bold", borderLeft: "1px solid #e0e0e0" }}
                    key={index}
                  >
                    {elem.field}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableItem?.items?.map((elem, index) => (
                <TableRow key={index}>
                  <TableCell
                    size="medium"
                    sx={{ borderLeft: "1px solid #e0e0e0" }}
                    align="left"
                    key={index}
                  >
                    {index + 1}
                  </TableCell>

                  {tableItem?.headers?.map((hElem, hKey) => (
                    <TableCell
                      size="medium"
                      sx={{ borderLeft: "1px solid #e0e0e0" }}
                      align="left"
                      key={hKey}
                    >
                      {hElem.prop === "date"
                        ? formatDate(getNestedProperty(elem, hElem.prop))
                        : getNestedProperty(elem, hElem.prop)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {tableItem.totals && (
                <TableRow
                  sx={{
                    width: "100%",
                    borderBottom: "1px solid #e0e0e0",
                    backgroundColor: "#F8F9FA",
                  }}
                >
                  <TableCell
                    sx={{
                      borderLeft: "1px solid #e0e0e0",
                      backgroundColor: "#F8F9FA",
                    }}
                  />
                  {tableItem?.headers?.map((hElem, hKey) => (
                    <TableCell
                      key={hKey}
                      sx={{
                        borderLeft: "1px solid #e0e0e0",
                        backgroundColor: "#F8F9FA",
                        fontWeight: "bold",
                      }}
                    >
                      {tableItem.totals[hElem.prop]
                        ? tableItem.totals[hElem.prop]
                        : ""}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
}
