import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import {
  supplierColumns,
  refundColumns,
  salaryColumns,
  expenditureColumns,
  advanceCollectsColumns,
  creditColumns,
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
    detailLink: "/panel/invoices/supplierpayemnts/",
    editLink: "/panel/payments",
    api: "/Reports/SupplierReportDetailAll",
    columns: supplierColumns,
  },
  {
    id: 2,
    title: "Refund",
    hideReport: false,
    detailLink: "/panel/invoices/refundpayments/",
    editLink: "/panel/payments",
    api: "/Reports/RefundPaymentDetail",
    columns: refundColumns,
  },
  {
    id: 3,
    title: "Credit",
    hideReport: false,
    api: "/PaidCredits/GetAll",
    editLink: "/panel/paidCredits",
    detailLink: "/panel/paidCredits/report?tickets=",
    columns: creditColumns,
  },
  {
    id: 4,
    title: "Xərc",
    hideReport: false,
    detailLink: "/panel/invoices/expenditures/",
    editLink: "/panel/payments",
    api: "/Reports/ExpenditureAllReportDetail",
    columns: expenditureColumns,
  },

  {
    id: 7,
    title: "Maaş",
    hideReport: false,
    api: "/PaySalarys/GetAll",
    editLink: "/panel/salaryToBePaid",
    detailLink: "/panel/salaryToBePaid/report?tickets=",
    columns: salaryColumns,
  },
  {
    id: 8,
    title: "To Founder",
    hideReport: false,
    api: "/ManagerFinancialTransactionPayments/GetAllV2",
    detailLink: "/panel/managerFinancialTransactionPayments/report?tickets=",
    editLink: "/panel/paymentTransfers",
    columns: advanceCollectsColumns,
  },
];

export default function Index() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  // const [ settotals] = useState();
  const [activeTab, setActiveTab] = useState(
    tabs.find((t) => t.id.toString() === tab) ?? tabs[0]
  );

  // useEffect(()=>{
  //   const fetchData = async () => {

  //     try {
  //       const response = await apiService.get("/Reports/TotalWillbePaid")
  //       // settotals(response?.data)
  //     } catch (error) {

  //     }
  //   }

  //   fetchData()
  // },[])

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
      {tabs.map(
        (tab) =>
          tab.id === activeTab.id && (
            <div key={tab.id}>
              <Table
                hidePrint
                hideCreate
                hideDelete
                api={tab.api}
                // hideFilter
            
                root={tab.editLink}
                columns={tab.columns}
                hideReport={tab.hideReport}
                detailLink={tab.detailLink}
                buttonText="Expenditure"
              />
            </div>
          )
      )}
      {/* <div className="relative overflow-x-auto">
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
                <td className="px-6 py-4">
                  {totals?.supplierTotal}
                </td>
                <td className="px-6 py-4">
                  {totals?.refundTotal}
                </td>
                <td className="px-6 py-4">
                  {totals?.creditTotal}
                </td>
                <td className="px-6 py-4">
                  {totals?.expendutureTotal}
                </td>
                <td className="px-6 py-4">
                  {totals?.advanceTotal}
                </td>
                <td className="px-6 py-4">
                  {totals?.otherTotal}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {totals?.supplierTotal+totals?.refundTotal+totals?.creditTotal+totals?.expendutureTotal+totals?.advanceTotal+totals?.otherTotal}
                </th>
           
            </tr>
        </tbody>
    </table>
</div> */}
    </Container>
  );
}
