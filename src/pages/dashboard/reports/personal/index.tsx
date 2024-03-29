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
        columns={columns}
        addDateToReport
        detailLink="/panel/reports/personals/"
        api={"/Reports/PersonalsReport"}
        root="/panel/reports/customers"
      />
    </Container>
  );
}
