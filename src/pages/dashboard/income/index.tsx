import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        hideEdit
        hideReceipt={false}
        columns={columns}
        api={"/MassIncomes/GetAllFilter"}
        exportLink="MassIncomes/Export/Export"
        buttonText="Mədaxil"
        deleteApi="/MassIncomes/Delete"
        root="/panel/income"
      />
    </Container>
  );
}
