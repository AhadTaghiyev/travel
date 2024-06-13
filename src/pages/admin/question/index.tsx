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
        api={"/Question/getall"}
        buttonText="Question"
        deleteApi="/Question/delete"
        root="/admin/Questions"
      />
    </Container>
  );
}
