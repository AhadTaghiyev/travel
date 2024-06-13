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
        // hideReport
        api={"/Blog/getall"}
        buttonText="Blog"
        deleteApi="/Blog/delete"
        root="/admin/Blogs"
      />
    </Container>
  );
}
