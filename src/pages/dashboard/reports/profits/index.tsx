import Container from "@mui/material/Container";
import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {t("Profits")}
          </h1>
        </div>
      </div>
      <Table
        hideDelete
        hideCreate
        hideEdit
        hidePrint
        addDateToReport
        columns={columns}
        totalProps={["purchasePrice","salePrice","profit"]}
        detailLink="/panel/reports/profits/"
        api={"/Reports/ProfitsReport"}
        root="/panel/reports/profits"
        exportLink="reports/ProfitsReportExport"
      />
    </Container>
  );
}
