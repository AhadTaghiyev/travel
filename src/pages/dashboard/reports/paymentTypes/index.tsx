import Container from "@mui/material/Container";
import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        hideDelete
        hideCreate
        hideEdit
        hidePrint
        hideReport
        columns={columns}
        detailLink="/panel/reports/customers/"
        api={"/Reports/FinancalStatusReport"}
        root="/panel/reports/customers"
      />
    </Container>
  );
}
