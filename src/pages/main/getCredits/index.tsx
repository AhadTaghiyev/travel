import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        hideReport
        columns={columns}
        api={"/GetCredits/GetAll"}
        buttonText="Alınan Kredit" // Hola
        deleteApi="/GetCredits/Delete"
        root="/panel/getCredits"
      />
    </Container>
  );
}
