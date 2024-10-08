import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        columns={columns}
        api={"/Bonuces/GetAll"}
        buttonText="Bonus"
        deleteApi="/Bonuces/Delete"
        root="/panel/bonus"
        exportLink="Bonuces/export/export"
      />
    </Container>
  );
}
