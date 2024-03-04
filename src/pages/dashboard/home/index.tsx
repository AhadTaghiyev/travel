import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import Grid from "@mui/material/Grid";

import NavigationItem from "@/components/pages/home/navigationItem";
import NearestFlightsReport from "./report-tables/nearest-flights";
import { navigationItems } from "./navigationItems";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeadlineReport from "./report-tables/deadline";
import PaymentTypes from "./report-tables/payment-types";
import ReciveablesReport from "./report-tables/receivables";
import SupplierPaymentsReport from "./report-tables/supplier-payments";
import FinancialStatusReport from "./report-tables/financial-status";

export default function index() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(String(currentYear));
  const { t } = useTranslation();

  const years = useMemo(() => {
    const years = [];
    for (let i = currentYear; i >= new Date(0).getFullYear(); i--) {
      years.push(i);
    }
    return years;
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {navigationItems.map((item, key) => (
          <Grid key={key} item lg={3} md={3} sm={4}>
            <NavigationItem
              text={item.text}
              path={item.path}
              color={item.color}
              Icon={item.Icon}
            />
          </Grid>
        ))}
      </Grid>
      <div className="mt-6">
        <div className="w-60">
          <Select
            defaultValue={selectedYear}
            onValueChange={(value) => setSelectedYear(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Date"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={`${year}`}>
                  {`${year} ${t("JAN")} - ${year} ${t("DEC")}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-6 mb-10">
        <h1 className="text-2xl font-bold mb-4">{t("Reports")}</h1>
        <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-5">
          <ReciveablesReport selectedYear={selectedYear} />
          <SupplierPaymentsReport selectedYear={selectedYear} />
          <PaymentTypes selectedYear={selectedYear} />
          <FinancialStatusReport />
          <DeadlineReport selectedYear={selectedYear} />
          <NearestFlightsReport />
        </div>
      </div>
    </Container>
  );
}
