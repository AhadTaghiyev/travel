import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        columns={columns}
        api={"/AdvancePayments/GetAll"}
        buttonText="Deposit"
        deleteApi="/AdvancePayments/Delete"
        root="/panel/deposit"
      />
    </Container>
  );
}
