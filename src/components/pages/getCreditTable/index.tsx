import { useTranslation } from "react-i18next";

import { ICurrency } from "../report/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

interface IGetCreditProps {
  incomes: {
    id: number;
    payment: string;
    amount: number;
    restOfAmount: number;
    ref: string;
    from: string;
    description: string | null;
    creditId: string;
    date: string;
  }[];
  currency: ICurrency;
  totalPrice: number;
}

export function GetCreditTable({
  incomes,
  currency,
}: IGetCreditProps) {
  const { t } = useTranslation();


  return (
    <Table className="border-solid border border-black/20 text-[11px]">
      <TableHeader>
        <TableRow className="border-solid border border-black/20">
          <TableHead className="px-2">{t("Ref")}</TableHead>
          <TableHead className="px-2">{t("Loan From")}</TableHead>
          <TableHead className="px-2">{t("Amount")}</TableHead>
          <TableHead className="px-2">{t("RestOfAmount")}</TableHead>
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
              {income.from}
            </TableCell>
            <TableCell className="font-medium py-1 px-2">
            {(income.amount * currency.value).toFixed(2)} {currency.name}
            </TableCell>
         
            <TableCell className="py-1 px-2">
              {(income.restOfAmount * currency.value).toFixed(2)} {currency.name}
            </TableCell>
            {/* <TableCell className="py-1 px-2">{income.payment}</TableCell> */}
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
      {/* <TableFooter>
        <TableRow>
          <TableCell className="py-1.5 px-2" colSpan={6}>
            {t("Total Paid Amount")}
          </TableCell>
          <TableCell className="text-right py-2">
          {((incomes[0].amount + incomes[0].percent) * currency.value).toFixed(2)}{" "}
          </TableCell>
        </TableRow>
     
      </TableFooter> */}
    </Table>
  );
}
