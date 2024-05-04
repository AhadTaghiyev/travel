import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        columns={columns}
        api={"/OtherPayments/GetAll"}
        buttonText="Customer Receipt"
        deleteApi="/OtherPayments/Delete"
        root="/panel/customerPayments"
      />
    </Container>
  );
}
