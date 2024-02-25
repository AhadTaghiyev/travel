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
        detailLink="/panel/reports/customerprofit/"
        api={"/Reports/CustomersReport"}
        root="/panel/reports/customers"
      />
    </Container>
  );
}
