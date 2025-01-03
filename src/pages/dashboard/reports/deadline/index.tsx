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
            {t("Deadline")}
          </h1>
        </div>
      </div>
      <Table
        hideReport
        hideDelete
        hideCreate
        hideEdit
        hidePrint
        hideOperations={true}
        columns={columns}
        api={"/Reports/DeadlindeReport"}
        root="/panel/reports/suppliers"
        totalProps={["amount"]}
        exportLink="Reports/DeadlindeReportExport"
      />
    </Container>
  );
}
