import { formatDate, formatDateV2 } from "@/lib/utils";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";

function getNestedProperty(obj, path: string) {
  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    if (current[key] === undefined) {
      return undefined;
    } else {
      current = current[key];
    }
  }
  return current;
}

export default function Index({ headers, items, totals, currency, isTime = false }) {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" id="report-table">
        <TableHead className="bg-[#3275BB] text-[#fff] border-white">
          <TableRow>
            {headers.map((elem, index) => (
              <TableCell
                size="medium"
                align="left"
                sx={{
                  fontWeight: "bold",
                  borderLeft: "1px solid #e0e0e0",
                  padding: { xs: "10px 12px", print: "5px 6px" }, // Normalde 1.5rem, yazdırma sırasında 1rem
                  fontSize: { xs: "14px", print: "12px" },
                  color: "white",
                  "@media print": {
                    padding: "5px 6px",
                    fontSize: "12px",
                  },
                }}
                key={index}
                className="!px-3 !py-2.5 print:!px-1 report-table-cell"
              >
                {elem.fieldName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((elem, index) => (
            <TableRow key={index}>
              {headers.map((hElem, hKey) => (
                <TableCell
                  size="medium"
                  sx={{
                    borderLeft: "1px solid #e0e0e0",
                    padding: { xs: "10px 12px", print: "5px 6px" },
                    fontSize: { xs: "14px", print: "12px" },
                    "@media print": {
                      padding: "5px 6px",
                      fontSize: "12px",
                    },
                  }}
                  align="left"
                  key={hKey}
                  className="!px-3 !py-2 print:!px-1 report-table-cell"
                >
                  {hElem.propertyName === "insurance" ? (
                    elem.insurance ? t("Bəli") : t("Xeyr")
                  ) : hElem.propertyName === "invoiceDirection" ? (
                    elem.invoiceDriection?.map((iElem, ikey) => (
                      <p key={ikey}>
                        {formatDate(iElem?.flightDate) + " - " + iElem?.direction}
                      </p>
                    ))
                  ) : hElem.propertyName === "childrenadultcount" ? (
                    <span>
                      {elem.childrenCount} - {elem.adultsCount}
                    </span>
                  ) : (
                    <span>
                      {hElem.propertyName.toLowerCase().includes("date")
                        ? isTime ? formatDateV2(getNestedProperty(elem, hElem.propertyName)) : formatDate(getNestedProperty(elem, hElem.propertyName))
                        : hElem.propertyName.toLowerCase().includes("price")
                          ? `${(getNestedProperty(elem, hElem.propertyName) * currency.value).toFixed(2)} ${currency.name
                          }`
                          : getNestedProperty(elem, hElem.propertyName)}
                    </span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {totals != undefined && (
            <>
              <TableRow
                sx={{
                  width: "100%",
                  borderBottom: "1px solid #e0e0e0",
                  backgroundColor: "#F8F9FA",
                }}
              >
                <TableCell
                  size="medium"
                  sx={{
                    borderLeft: "1px solid #e0e0e0",
                    fontWeight: "bold",
                    // padding: "10px 12px",
                    padding: { xs: "10px 12px", print: "5px 6px" }, // Normalde 1.5rem, yazdırma sırasında 1rem
                    fontSize: { xs: "14px", print: "12px" },
                    "@media print": {
                      padding: "5px 6px",
                      fontSize: "12px",
                    },
                  }}
                  align="left"
                  className="report-table-cell"
                >
                  {t("Satış qiyməti")}:
                </TableCell>
                <TableCell
                  size="medium"
                  sx={{
                    borderLeft: "1px solid #e0e0e0",
                    borderRight: "1px solid #e0e0e0",
                    fontWeight: "bold",
                    // padding: "10px 12px",
                    padding: { xs: "10px 12px", print: "5px 6px" }, // Normalde 1.5rem, yazdırma sırasında 1rem
                    fontSize: { xs: "14px", print: "12px" },
                    "@media print": {
                      padding: "5px 6px",
                      fontSize: "12px",
                    },
                  }}
                  align="left"
                  className="report-table-cell"
                >
                  {(totals.totalSellingPrice * currency.value).toFixed(2)}{" "}
                  {currency.name}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  width: "100%",
                  borderBottom: "1px solid #e0e0e0",
                  backgroundColor: "#F8F9FA",
                }}
              >
                <TableCell
                  size="medium"
                  sx={{
                    borderLeft: "1px solid #e0e0e0",
                    fontWeight: "bold",
                    // padding: "10px 12px",
                    padding: { xs: "10px 12px", print: "5px 6px" }, // Normalde 1.5rem, yazdırma sırasında 1rem
                    fontSize: { xs: "14px", print: "12px" },
                    "@media print": {
                      padding: "5px 6px",
                      fontSize: "12px",
                    },
                  }}
                  align="left"
                  className="report-table-cell"
                >
                  {t("Endirim")}:
                </TableCell>
                <TableCell
                  size="medium"
                  sx={{
                    borderLeft: "1px solid #e0e0e0",
                    borderRight: "1px solid #e0e0e0",
                    fontWeight: "bold",
                    // padding: "10px 12px",
                    padding: { xs: "10px 12px", print: "5px 6px" }, // Normalde 1.5rem, yazdırma sırasında 1rem
                    fontSize: { xs: "14px", print: "12px" },
                    "@media print": {
                      padding: "5px 6px",
                      fontSize: "12px",
                    },
                  }}
                  align="left"
                  className="report-table-cell"
                >
                  {(totals.totalDiscountPrice * currency.value).toFixed(2)}{" "}
                  {currency.name}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  width: "100%",
                  borderBottom: "1px solid #e0e0e0",
                  backgroundColor: "#F8F9FA",
                }}
              >
                <TableCell
                  size="medium"
                  sx={{
                    borderLeft: "1px solid #e0e0e0",
                    fontWeight: "bold",
                    // padding: "10px 12px",
                    padding: { xs: "10px 12px", print: "5px 6px" }, // Normalde 1.5rem, yazdırma sırasında 1rem
                    fontSize: { xs: "14px", print: "12px" },
                    "@media print": {
                      padding: "5px 6px",
                      fontSize: "12px",
                    },
                  }}
                  align="left"
                  className="report-table-cell"
                >
                  {t("Net qiymət")}:
                </TableCell>
                <TableCell
                  size="medium"
                  sx={{
                    borderLeft: "1px solid #e0e0e0",
                    borderRight: "1px solid #e0e0e0",
                    fontWeight: "bold",
                    // padding: "10px 12px",
                    padding: { xs: "10px 12px", print: "5px 6px" }, // Normalde 1.5rem, yazdırma sırasında 1rem
                    fontSize: { xs: "14px", print: "12px" },
                    "@media print": {
                      padding: "5px 6px",
                      fontSize: "12px",
                    },
                  }}
                  align="left"
                  className="report-table-cell"
                >
                  {(totals.totalPrice * currency.value).toFixed(2)}{" "}
                  {currency.name}
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
