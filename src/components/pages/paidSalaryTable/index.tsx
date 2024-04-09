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
import { formatDate } from "@/lib/utils";

interface IPaidSalaryProps {
  incomes: {
    id: number;
    payment: string;
    employee: string;
    salary: number;
    extraSalary: number;
    bonus: number;
    date: string;
  }[];
  currency: ICurrency;
  totalPrice: number;
}

export function PaidSalaryTable({
  incomes,
  currency,
}: IPaidSalaryProps) {
  const { t } = useTranslation();



  return (
    <Table className="border-solid border border-black/20 text-[11px]">
      <TableHeader>
        <TableRow className="border-solid border border-black/20">
          <TableHead className="px-2">{t("Ref")}</TableHead>
          <TableHead className="px-2">{t("Personal")}</TableHead>
          <TableHead className="px-2">{t("Ödəniş növü")}</TableHead>
          <TableHead className="px-2">{t("Salary")}</TableHead>
          <TableHead className="px-2">{t("Extra Salary")}</TableHead>
          <TableHead className="px-2">{t("bonus")}</TableHead>
          <TableHead className="px-2">{t("date")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {incomes.map((income) => (
          <TableRow key={income.id}>
            <TableCell className="font-medium py-1 px-2">
            P-{income.id}
            </TableCell>
            <TableCell className="py-1 px-2">{income.employee}</TableCell>
            <TableCell className="py-1 px-2">{income.payment}</TableCell>
            <TableCell className="py-1 px-2">        {(income.salary * currency.value).toFixed(2)} {currency.name}</TableCell>
    
         
            <TableCell className="py-1 px-2">
              {(income.extraSalary * currency.value).toFixed(2)} {currency.name}
            </TableCell>
            <TableCell className="py-1 px-2">
              {(income.bonus * currency.value).toFixed(2)} {currency.name}
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
          <TableCell className="py-1.5 px-2" colSpan={6}>
            {t("Total Paid Amount")}
          </TableCell>
          <TableCell className="text-right py-2">
          {((incomes[0].salary + incomes[0].extraSalary+incomes[0].bonus) * currency.value).toFixed(2)}{" "}
          </TableCell>
        </TableRow>
     
      </TableFooter>
    </Table>
  );
}
