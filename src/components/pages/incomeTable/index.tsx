import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ICurrency } from "../report/types";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/utils";

interface IIncomeTableProps {
  incomes: {
    id: number;
    payment: string;
    paidAmount: number;
    ref: string;
    invoiceNo: string;
    description: string | null;
    type: string;
    date: string;
    invoiceId: number;
  }[];
  currency: ICurrency;
}

export function MassIncomeTable({ incomes, currency }: IIncomeTableProps) {
  const { t } = useTranslation();

  const total = useMemo(
    () =>
      incomes.reduce((acc, income) => {
        return acc + income.paidAmount;
      }, 0),
    [incomes]
  );

  return (
    <Table className="border-solid border border-black/20">
      <TableHeader>
        <TableRow className="border-solid border border-black/20">
          <TableHead>{t("Receipt Number")}</TableHead>
          <TableHead>{t("Invoice Number")}</TableHead>
          <TableHead>{t("Ödəniş növü")}</TableHead>
          <TableHead>{t("paidamount")}</TableHead>
          <TableHead>{t("Description")}</TableHead>
          <TableHead>{t("Date")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {incomes.map((income) => (
          <TableRow key={income.id}>
            <TableCell className="font-medium py-1.5">{income.ref}</TableCell>
            <TableCell className="font-medium py-1.5">
              {income.type ? (
                <Link
                  to={`/panel/${income.type}/report?tickets=${income.invoiceId}`}
                  className="text-blue-500 hover:underline"
                >
                  {income.invoiceNo}
                </Link>
              ) : (
                income.invoiceNo
              )}
            </TableCell>
            <TableCell className="py-1.5">{income.payment}</TableCell>
            <TableCell className="py-1.5">
              {(income.paidAmount * currency.value).toFixed(2)} {currency.name}
            </TableCell>
            <TableCell className="py-1.5 max-w-[150px] truncate">
              {income.description ?? t("No Description")}
            </TableCell>
            <TableCell className="py-1.5 max-w-[150px] truncate">
              {formatDate(income.date)}
            </TableCell>
          </TableRow>
        ))}
        {incomes.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-2">
              {t("Payment not found")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="py-2" colSpan={5}>
            {t("Total Paid Amount")}
          </TableCell>
          <TableCell className="text-right py-2">
            {(total * currency.value).toFixed(2)} {currency.name}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
