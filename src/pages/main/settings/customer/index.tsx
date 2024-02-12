import Container from "@mui/material/Container";
import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <>
        <Table
          columns={columns}
          api={"/Customers/GetAll"}
          buttonText="Müştəri"
          root={"/panel/customers"}
          deleteApi="/Customers/Delete"
        />
      </>
    </Container>
  );
}
