import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        columns={columns}
        api={"/Bonuces/GetAll"}
        buttonText="Bonuce" // Hola
        deleteApi="/Bonuces/Delete"
        root="/panel/supplierDeposits"
      />
    </Container>
  );
}
