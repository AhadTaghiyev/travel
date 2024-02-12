import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        hideReport
        columns={columns}
        api={"/PaidCredits/GetAll"}
        buttonText="Ödənilən Kredit" // Hola
        deleteApi="/PaidCredits/Delete"
        root="/panel/paidCredits"
      />
    </Container>
  );
}
