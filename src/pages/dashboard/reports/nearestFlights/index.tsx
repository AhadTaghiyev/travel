import Container from "@mui/material/Container";
import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl" className="bg-white py-8">
      <h1 className="mb-8 font-bold text-3xl">{t("Yaxın uçuşlar")}</h1>
      <Table
        // hideFilter
        hideDelete
        hideCreate
        hideEdit
        hideStatus
        hideReport
        hidePrint
        columns={columns}
        detailLink="/panel/reports/NearestTravelReport/"
        api={"/Reports/NearestTravelReport"}
        root="/panel/reports/customers"
        exportLink="Reports/NearestTravelReportExport"
      />
    </Container>
  );
}
