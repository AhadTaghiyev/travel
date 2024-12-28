import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DEFAULT_YEAR } from "@/constants";

interface INearestFlightsReportProps {
  selectedYear: string;
}

const columns = [
  { label: "Id", name: "id" },
  { label: "Havayolu", name: "airLine" },
  { label: "Customer", name: "customer" },
  { label: "Passanger", name: "passanger" },
  { label: "Ticket Number", name: "ticketNo" },
  { label: "Phone", name: "phone" },
  { label: "Sector", name: "sector" },
  { label: "Travel Dates", name: "travelDates", className: "min-w-28" },
];

const NearestFlightsReport = ({ selectedYear }: INearestFlightsReportProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const getData = async () => {
    setLoading(true);
    setData([]);
    const searchParams = new URLSearchParams();
    searchParams.append(
      "startDate",
      new Date(selectedYear === "All" ? Number(DEFAULT_YEAR) : +selectedYear, 0, 1).toUTCString()
    );
    searchParams.append(
      "endDate",
      new Date(selectedYear === "All" ? new Date().getFullYear() : +selectedYear, 11, 31).toUTCString()
    );
    await apiService
      .get(`/Reports/NearestTravelReport/1?${searchParams.toString()}`)
      .then(({ data }) => {
        setData(data.items ?? []);
      })
      .catch((err) => {
        toast.error(err.message || t("Something went wrong!"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [selectedYear]);

  return (
    <div className="bg-white shadow-md w-full py-4 px-2 border border-solid border-gray-300 rounded-md">
      <h3 className="text-lg pl-1 pb-1 font-bold border-b border-solid border-gray-200">
        {t("Yaxın uçuşlar")}
      </h3>
      <div className="max-h-[280px] overflow-auto ">
        <Table className="mt-2 text-xs ">
          <TableHeader className="sticky top-0 rounded-t-md bg-gray-100 border-solid border-black/60">
            <TableRow className="w-full">
              <TableHead className="bg-[#3275BB] text-[#fff] border-white">{t("no")}</TableHead>
              {columns.map((column) => (
                <TableHead className="bg-[#3275BB] text-[#fff] border-white" key={column.name}>{t(column.label)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {data &&
              data.map((row, index) => (
                <TableRow className="bg-[#CF08080F] " key={row.id}>
                  <TableCell className={"py-1.5"}>{index + 1}</TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.name}
                      className={cn("py-1.5", column.className)}
                    >
                      {row?.[column.name]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {loading &&
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.name} className="py-1.5">
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {!loading && (!data || data.length === 0) && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={8} className="text-center text-base">
                  {t("No data found")}
                </TableCell>
              </TableRow>
            )}
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={8} className="text-center">
                <Link
                  to="/panel/reports/nearestFlights"
                  className="text-blue-400 text-base hover:underline"
                >
                  {t("See More")}
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NearestFlightsReport;
