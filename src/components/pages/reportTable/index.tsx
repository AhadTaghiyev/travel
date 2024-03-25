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
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date?.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function Index({ headers, items, totals, currency }) {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {headers.map((elem, index) => (
              <TableCell
                size="medium"
                align="left"
                sx={{
                  fontWeight: "bold",
                  borderLeft: "1px solid #e0e0e0",
                }}
                key={index}
                className="!px-3 !py-2.5 print:!px-1"
              >
                {elem.fieldName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((elem, index) => (
            <TableRow key={index}>
              {/* <TableCell sx={{borderLeft: '1px solid #e0e0e0'}} align="left">{index+1}</TableCell> */}
              {headers.map((hElem, hKey) => (
                <TableCell
                  size="medium"
                  sx={{ borderLeft: "1px solid #e0e0e0" }}
                  align="left"
                  key={hKey}
                  className="!px-3 !py-2 print:!px-1"
                >
                  {hElem.propertyName === "invoiceDirection" ? (
                    elem.invoiceDriection?.map((iElem, ikey) => (
                      <p key={ikey}>
                        {formatDate(iElem?.flightDate) +
                          " - " +
                          iElem?.direction}
                      </p>
                    ))
                  ) : (
                    <span>
                      {hElem.propertyName.toLowerCase().includes("date")
                        ? formatDate(
                            getNestedProperty(elem, hElem.propertyName)
                          )
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
                    padding: "10px 12px",
                  }}
                  align="left"
                >
                  {t("Satış qiyməti")}:
                </TableCell>
                <TableCell
                  size="medium"
                  sx={{
                    borderLeft: "1px solid #e0e0e0",
                    borderRight: "1px solid #e0e0e0",
                    fontWeight: "bold",
                    padding: "10px 12px",
                  }}
                  align="left"
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
                    padding: "10px 12px",
                  }}
                  align="left"
                >
                  {t("Endirim")}:
                </TableCell>
                <TableCell
                  size="medium"
                  sx={{
                    borderLeft: "1px solid #e0e0e0",
                    borderRight: "1px solid #e0e0e0",
                    fontWeight: "bold",
                    padding: "10px 12px",
                  }}
                  align="left"
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
                    padding: "10px 12px",
                  }}
                  align="left"
                >
                  {t("Net qiymət")}:
                </TableCell>
                <TableCell
                  size="medium"
                  sx={{
                    borderLeft: "1px solid #e0e0e0",
                    borderRight: "1px solid #e0e0e0",
                    fontWeight: "bold",
                    padding: "10px 12px",
                  }}
                  align="left"
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
