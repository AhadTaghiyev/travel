import Container from "@mui/material/Container";
import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <Table
        hideFilter
        hideDelete
        hideCreate
        hideEdit
        hidePrint
        hideReport
        columns={columns}
        detailLink="/panel/reports/NearestTravelReport/"
        api={"/Reports/NearestTravelReport"}
        root="/panel/reports/customers"
      />
    </Container>
  );
}