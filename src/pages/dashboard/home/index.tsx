import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import { useContext, useMemo, useState } from "react";
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
import { UserContext } from "@/store/UserContext";
import { Link } from "react-router-dom";
import { ROLES } from "@/constants";
import { apiService } from "@/server/apiServer";

export default function index() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(String(currentYear));
  const { t } = useTranslation();
  const { user } = useContext(UserContext);


  const onPay = async () => {
    const res = await apiService.get("/Company/Pay");

    if (res?.status === 200) {
      window.location.replace(res.data.data);
    } else {
    }
  };

  const isManagerUser =
    user?.role === ROLES.LEADER || user?.role === ROLES.ACCOUNTANT;

  const years = useMemo(() => {
    const years = [];
    for (let i = currentYear; i >= new Date(2023, 0, 1, 0).getFullYear(); i--) {
      years.push(i);
    }
    return years;
  }, []);

  if (user.expireDate < 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-red-500 mb-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
        <h1 className="text-3xl font-bold mb-2">{t("Subscription Expired")}</h1>
        <p className="text-gray-600 mb-4">
          {t("Please renew your subscription.")}
        </p>
        <Link
          onClick={async () => await onPay()}
          to="#"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {t("Renew Subscription")}
        </Link>
      </div>
    );
  }

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
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          {isManagerUser && <ReciveablesReport selectedYear={selectedYear} />}
          {isManagerUser && (
            <SupplierPaymentsReport selectedYear={selectedYear} />
          )}
          {isManagerUser && <PaymentTypes selectedYear={selectedYear} />}
          {isManagerUser && <FinancialStatusReport />}
          <DeadlineReport selectedYear={selectedYear} />
          <NearestFlightsReport />
        </div>
      </div>
    </Container>
  );
}
