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
        api={"/PaySalarys/GetAll"}
        buttonText="Ödəniləcək maaş"
        deleteApi="/PaySalarys/Delete"
        root="/panel/salaryToBePaid"
      />
    </Container>
  );
}
