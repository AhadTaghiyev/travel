import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        columns={columns}
        api={"/ManagerFinancialTransactionPayments/GetAll"}
        buttonText="Təsisçidən təsisçiyə Ödəniş"
        deleteApi="/ManagerFinancialTransactionPayments/Delete"
        root="/panel/managerFinancialTransactionPayments"
        exportLink="ManagerFinancialTransactionPayments/export/export"
      />
    </Container>
  );
}
