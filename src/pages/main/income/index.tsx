import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        hasEditBtn={false}
        columns={columns}
        api={"/MassIncomes/GetAllFilter"}
        buttonText="Mədaxil"
        deleteApi="/MassIncomes/Delete"
        root="/panel/income"
      />
    </Container>
  );
}
