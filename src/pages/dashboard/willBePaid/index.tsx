// @ts-nocheck
import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import {
  supplierColumns,
  refundColumns,
  // salaryColumns,
  expenditureColumns,
  advanceCollectsColumns,
  creditColumns,
} from "./tableColumns";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
import { FiPrinter } from "react-icons/fi";
import { apiService } from "@/server/apiServer";
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
    title: "Credit",
    hideReport: true,
    api: "/Reports/CreditReport",
    columns: creditColumns,
  },
  {
    id: 4,
    title: "Xərc",
    hideReport: false,
    detailLink: "/panel/reports/expenditures/",
    api: "/Reports/ExpenditureReport",
    columns: expenditureColumns,
  },
  {
    id: 5,
    title: "Advance Receipt",
    hideReport: true,
    api: "/Reports/AdvanceCollectsReport",
    columns: advanceCollectsColumns,
  },
  {
    id: 6,
    title: "Others",
    hideReport: true,
    api: "/Reports/FounderReport",
    columns: advanceCollectsColumns,
  },
];
const handlePrint = () => {
  window.print();
};

const headerStyle = {
  borderColor: "#c4c4c4",
  padding: "0px 10px",
  width: "100px",
  height: "35px",
  fontFamily: "Font Awesome 6 Pro",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "16px",
};

export default function Index() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totals, settotals] = useState();
  const tab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    tabs.find((t) => t.id.toString() === tab) ?? tabs[0]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get("/Reports/TotalWillbePaid");
        settotals(response?.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {t("Ödəniləcək")}
          </h1>
        </div>
      </div>
      <div className="flex justify-between items-center">
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
        <Button
          onClick={handlePrint}
          variant="outlined"
          sx={headerStyle}
          color="inherit"
          className="removeFromPrint"
        >
          <FiPrinter style={{ marginRight: "6px" }} />
          {t("Print")}
        </Button>
      </div>
      {tabs.map(
        (tab) =>
          tab.id === activeTab.id && (
            <div key={tab.id}>
              <Table
                hideEdit
                hidePrint
                hideDelete
                api={tab.api}
                hideFilter
                root="/panel/reports/willbepaid"
                columns={tab.columns}
                hideReport={tab.hideReport}
                detailLink={tab.detailLink}
                buttonText="Expenditure"
              />
            </div>
          )
      )}

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
              {tabs.map((tab, index) => (
                <>
                  <th scope="col" className="px-6 py-3">
                    {t(tab.title)}
                  </th>
                </>
              ))}
              <th scope="col" className="px-6 py-3">
                {t("Total")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4">{totals?.supplierTotal}</td>
              <td className="px-6 py-4">{totals?.refundTotal}</td>
              <td className="px-6 py-4">{totals?.creditTotal}</td>
              <td className="px-6 py-4">{totals?.expendutureTotal}</td>
              <td className="px-6 py-4">{totals?.advanceTotal}</td>
              <td className="px-6 py-4">{totals?.otherTotal}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {totals?.supplierTotal +
                  totals?.refundTotal +
                  totals?.creditTotal +
                  totals?.expendutureTotal +
                  totals?.advanceTotal +
                  totals?.otherTotal}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
}
