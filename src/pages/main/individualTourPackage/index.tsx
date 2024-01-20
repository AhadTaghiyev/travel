import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";

import { getColumns } from "./columns";

import Table from "@/components/pages/table";

export default function Index() {
  const { t } = useTranslation();

  const columns = getColumns(t);
  return (
    <Container maxWidth="xl">
      <Table
        columns={columns}
        exportLink="v1/individualTourPackages/Export/Export"
        api={"/IndividualTourPackages/GetAllFilter"}
        deleteApi="/IndividualTourPackages/Delete"
        root="/panel/individualTourPackages"
        buttonText="Individual Tur paket"
      />
    </Container>
  );
}
