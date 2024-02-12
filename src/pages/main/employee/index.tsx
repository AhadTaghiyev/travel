import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        hideReport
        columns={columns}
        api={"/Employees/GetAll"}
        buttonText="İşçi" // Hola lər
        deleteApi="/Employees/Delete"
        root="/panel/employees"
      />
    </Container>
  );
}
