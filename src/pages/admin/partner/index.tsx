import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl">
      <Table
        columns={columns(t)}
        api={"/Partner/getall"}
        buttonText="Partner"
        deleteApi="/Partner/delete"
        root="/admin/Partners"
      />
    </Container>
  );
}
