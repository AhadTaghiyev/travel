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
  totalPrice: number;
}

export function MassIncomeTable({
  incomes,
  currency,
  totalPrice,
}: IIncomeTableProps) {
  const { t } = useTranslation();

  const totalPaidAmount = useMemo(
    () =>
      incomes.reduce((acc, income) => {
        return acc + income.paidAmount;
      }, 0),
    [incomes]
  );

  return (
    <Table className="border-solid border border-black/20 text-[11px]">
      <TableHeader>
        <TableRow className="border-solid border border-black/20">
          <TableHead className="px-2">{t("Receipt Number")}</TableHead>
          <TableHead className="px-2">{t("Invoice Number")}</TableHead>
          <TableHead className="px-2">{t("Ödəniş növü")}</TableHead>
          <TableHead className="px-2">{t("paidamount")}</TableHead>
          <TableHead className="px-2">{t("Description")}</TableHead>
          <TableHead className="px-2">{t("date")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {incomes.map((income) => (
          <TableRow key={income.id}>
            <TableCell className="font-medium py-1 px-2">
              {income.ref}
            </TableCell>
            <TableCell className="font-medium py-1 px-2">
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
            <TableCell className="py-1 px-2">{income.payment}</TableCell>
            <TableCell className="py-1 px-2">
              {(income.paidAmount * currency.value).toFixed(2)} {currency.name}
            </TableCell>
            <TableCell className="py-1 px-2 max-w-[150px] truncate">
              {income.description ?? t("No Description")}
            </TableCell>
            <TableCell className="py-1 px-2 max-w-[150px] truncate">
              {formatDate(income.date)}
            </TableCell>
          </TableRow>
        ))}
        {incomes.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-1.5 px-2">
              {t("Payment not found")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="py-1.5 px-2" colSpan={5}>
            {t("Total Paid Amount")}
          </TableCell>
          <TableCell className="text-right py-2">
            {(totalPaidAmount * currency.value).toFixed(2)} {currency.name}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="py-1.5 px-2" colSpan={5}>
            {t("Total Remaining Amount")} {/* TODO: translate */}
          </TableCell>
          {totalPrice && (
            <TableCell className="text-right py-2">
              {((totalPrice - totalPaidAmount) * currency.value).toFixed(2)}{" "}
              {currency.name}
            </TableCell>
          )}
        </TableRow>
      </TableFooter>
    </Table>
  );
}
