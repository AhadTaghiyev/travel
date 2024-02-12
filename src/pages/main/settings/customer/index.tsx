import Container from "@mui/material/Container";
import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        hideReport
        columns={columns}
        api={"/Customers/GetAll"}
        buttonText="Müştəri" // Hola lər
        deleteApi="/Customers/Delete"
        root="/panel/customers"
      />
    </Container>
  );
}
