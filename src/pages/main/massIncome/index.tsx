import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";
import PageTitle from "../../../components/pages/pageTitle";
import {
  MassIncomeBreadCrumb,
  homeBreadCrumb,
} from "../../../routes/breadcrumbs";

export default function Index() {
  return (
    <Container maxWidth="xl">
      <PageTitle
        title=" Mədaxil"
        breadcrumbs={[homeBreadCrumb, MassIncomeBreadCrumb]}
      />
      <Table
        columns={columns}
        api={"/MassIncomes/GetAllFilter"}
        buttonText="Mədaxil"
        deleteApi="/MassIncomes/Delete"
        root="/panel/massIncome"
      />
    </Container>
  );
}
