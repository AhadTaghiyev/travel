import Container from "@mui/material/Container";
import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        hideReport
        columns={columns}
        api={"/Personals/GetAll"}
        buttonText="Personal" // Hola lar
        deleteApi="/Personals/Delete"
        root="/panel/personals"
      />
    </Container>
  );
}
