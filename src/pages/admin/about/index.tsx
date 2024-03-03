import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl">
      <Table
        hideReport
        columns={columns(t)}
        api={"/About/getall"}
        buttonText="About"
        deleteApi="/About/delete"
        root="/admin/Abouts"
      />
    </Container>
  );
}
