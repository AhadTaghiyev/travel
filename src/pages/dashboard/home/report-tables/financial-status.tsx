import { useTranslation } from "react-i18next";
import { useEffect, useState, useContext } from "react";
import { Skeleton } from "@mui/material";

import { apiService } from "@/server/apiServer";
import { YearContext } from "@/store/YearContext";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FinancialStatusReport = () => {
  const { selectedYear } = useContext(YearContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const [payments, setPayments] = useState<any>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const totalReceiveAblePayableResultPromise = apiService.get(
        `/Reports/TotalReciveAblePayable?year=${selectedYear}`
      );
      const financalStatusReportResultPromise = apiService.get(
        `/Reports/FinancalStatusReport?year=${selectedYear}`
      );
      const [totalReceiveAblePayableResult, financalStatusReportResult] =
        await Promise.all([
          totalReceiveAblePayableResultPromise,
          financalStatusReportResultPromise,
        ]);
      setData(totalReceiveAblePayableResult.data);
      setPayments(financalStatusReportResult.data);
      setLoading(false);
    };
    fetchData();
  }, [selectedYear]);

  let totalAmount =
    payments?.items?.reduce((acc, item) => acc + item.amount, 0) || 0;
  totalAmount += data?.willBeGet;
  totalAmount -= data?.willBePaids;

  return (
    <div className="bg-white shadow-md w-full py-4 px-2 border border-solid border-gray-300 rounded-md">
      <h3 className="text-lg pl-1 pb-1 font-bold border-b border-solid border-gray-200">
        {t("Financal Status")}
      </h3>

      <div className="max-h-[280px] overflow-auto">
        <Table className="mt-2 text-xs">
          <TableHeader className="rounded-t-md bg-gray-100 border-solid border-black/60">
            <TableRow className="w-full">
              <TableHead className="bg-[#3275BB] text-[#fff] border-white" key={"payment-type"}>{t("Ödəniş növü")}</TableHead>
              <TableHead className="bg-[#3275BB] text-[#fff] border-white" key={"amount"}></TableHead>
              <TableHead className="bg-[#3275BB] text-[#fff] border-white"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments &&
              payments.items?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="py-1.5">{row.name}</TableCell>
                  <TableCell className="py-1.5">{row.amount}</TableCell>
                  <TableCell className="py-1.5"></TableCell>
                </TableRow>
              ))}
            {loading &&
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={3} className="py-1.5">
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter className="w-full">
            <TableRow className="w-full">
              <TableCell className="py-1.5" colSpan={1}>
                {t("Reciveables")}
              </TableCell>
              <TableCell className="py-1.5" colSpan={1}>
                {data.willBeGet}
              </TableCell>
              <TableCell
                className="py-1.5 border-b border-solid "
                colSpan={1}
              />
            </TableRow>
            <TableRow className="w-full">
              <TableCell className="py-1.5 border-b border-solid " colSpan={1}>
                {t("Payables")}
              </TableCell>
              <TableCell
                className="py-1.5 border-b border-solid "
                colSpan={1}
              />
              <TableCell className="py-1.5 border-b border-solid " colSpan={2}>
                {data.willBePaids}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-1.5" colSpan={1}>
                {t("Current Financal Status")}
              </TableCell>

              <TableCell className="py-1.5" colSpan={1}>
                {totalAmount}
              </TableCell>
              <TableCell
                className="py-1.5 border-b border-solid "
                colSpan={1}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default FinancialStatusReport;
