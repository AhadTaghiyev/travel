import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import {
  supplierColumns,
  refundColumns,
  salaryColumns,
  expenditureColumns,
  advanceCollectsColumns,
} from "./tableColumns";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const tabs = [
  {
    id: 1,
    title: "Təchizatçı",
    hideReport: false,
    detailLink: "/panel/reports/suppliers/",
    api: "/Reports/SupplierReport",
    columns: supplierColumns,
  },
  {
    id: 2,
    title: "Refund",
    hideReport: false,
    detailLink: "/panel/reports/refunds/",
    api: "/Reports/RefundReportDetail",
    columns: refundColumns,
  },
  {
    id: 3,
    title: "Maaş",
    hideReport: false,
    detailLink: "/panel/reports/salaries/",
    api: "/Reports/SalaryReportDetail",
    columns: salaryColumns,
  },
  {
    id: 4,
    title: "Credit",
    hideReport: true,
    api: "/Reports/CreditReport",
    columns: salaryColumns,
  },
  {
    id: 5,
    title: "Xərc",
    hideReport: false,
    detailLink: "/panel/reports/expenditures/",
    api: "/Reports/ExpenditureReport",
    columns: expenditureColumns,
  },
  {
    id: 6,
    title: "Advance Receipt",
    hideReport: true,
    api: "/Reports/AdvanceCollectsReport",
    columns: advanceCollectsColumns,
  },
];

export default function Index() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    tabs.find((t) => t.id.toString() === tab) ?? tabs[0]
  );

  return (
    <Container maxWidth="xl">
      <ul className="mb-2 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400">
        {tabs.map((tab, index) => (
          <li key={index} className="me-2">
            <button
              onClick={() => {
                setSearchParams({ tab: tab.id.toString() });
                setActiveTab(tab);
              }}
              aria-current="page"
              className={cn(
                "border-none p-4 rounded-lg text-gray-600 hover:bg-gray-50",
                activeTab.id === tab.id &&
                  "bg-white hover:bg-white text-blue-500"
              )}
            >
              {t(tab.title)}
            </button>
          </li>
        ))}
      </ul>
      {tabs.map((tab) => (
        <div className={tab.id !== activeTab.id && "hidden"} key={tab.id}>
          <Table
            hideEdit
            hidePrint
            hideDelete
            api={tab.api}
            hideFilter
            root="/panel/willbepaid"
            columns={tab.columns}
            hideReport={tab.hideReport}
            detailLink={tab.detailLink}
            buttonText="Expenditure"
          />
        </div>
      ))}
    </Container>
  );
}
