import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        columns={columns}
        api={"/Refunds/GetAll"}
        buttonText="Refund"
        deleteApi="/Refunds/Delete"
        hideEdit
      hidePrint={false}
        root="/panel/refunds"
        exportLink="Refunds/export/export"
      />
    </Container>
  );
}
