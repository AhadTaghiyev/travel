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
            {t("Flight Tickets")}
          </h1>
        </div>
      </div>
      <Table
        hideReport
        hideDelete
        hideCreate
        hideEdit
        hidePrint
        columns={columns}
        totalProps={["purchasePrice","sellingPrice","segment"]}
        api={"/Reports/FlightTicketsReport"}
        root="/panel/reports/flightTickets"
      />
    </Container>
  );
}
