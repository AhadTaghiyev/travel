import Container from "@mui/material/Container";
import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        hideReport
        columns={columns}
        api={"/Airways/GetAll"}
        buttonText="Hava yolu" // Hola lər
        deleteApi="/Airways/Delete"
        root="/panel/airways"
      />
    </Container>
  );
}
