import Container from "@mui/material/Container";
import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        hideReport
        hideDelete
        hideCreate
        hideEdit
        hidePrint
        columns={columns}
        api={"/Reports/FlightTicketsReport"}
        root="/panel/reports/flightTickets"
      />
    </Container>
  );
}
