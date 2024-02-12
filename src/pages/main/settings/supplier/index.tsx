import Container from "@mui/material/Container";
import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        hideReport
        columns={columns}
        api={"/Suppliers/GetAll"}
        buttonText="Təchizatçı" // Hola lar
        deleteApi="/Suppliers/Delete"
        root="/panel/suppliers"
      />
    </Container>
  );
}
