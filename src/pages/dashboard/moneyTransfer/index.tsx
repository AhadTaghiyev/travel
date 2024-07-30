import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        columns={columns}
        api={"/PaymentTransfers/GetAll"}
        buttonText="Vəsait transferi"
        deleteApi="/PaymentTransfers/Delete"
        root="/panel/paymentTransfers"
        exportLink="PaymentTransfers/export/export"
      />
    </Container>
  );
}
