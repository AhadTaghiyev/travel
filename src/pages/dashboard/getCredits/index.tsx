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
        api={"/GetCredits/GetAll"}
        buttonText="Alınan Kredit"
        deleteApi="/GetCredits/Delete"
        root="/panel/getCredits"
        totalProps={["amount", "restOfAmount"]}
        exportLink="GetCredits/export/export"
      />
    </Container>
  );
}
