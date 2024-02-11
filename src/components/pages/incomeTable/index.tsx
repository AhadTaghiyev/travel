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

interface IIncomeTableProps {
  incomes: {
    id: number;
    payment: string;
    paidAmount: number;
    invoiceNo: string;
    description: string | null;
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("Invoice")}</TableHead>
          <TableHead>{t("Ödəniş növü")}</TableHead>
          <TableHead>{t("paidamount")}</TableHead>
          <TableHead>{t("Description")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {incomes.map((income) => (
          <TableRow key={income.id}>
            <TableCell className="font-medium py-1.5">
              {income.invoiceNo}
            </TableCell>
            <TableCell className="py-1.5">{income.payment}</TableCell>
            <TableCell className="py-1.5">
              {(income.paidAmount * currency.value).toFixed(2)} {currency.name}
            </TableCell>
            <TableCell className="py-1.5 max-w-[150px] truncate">
              {income.description ?? t("No Description")}
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
          <TableCell className="py-2" colSpan={3}>
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
