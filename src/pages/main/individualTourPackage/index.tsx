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
        hidePrint={false}
        columns={columns}
        exportLink="individualTourPackages/Export/Export"
        api={"/IndividualTourPackages/GetAllFilter"}
        deleteApi="/IndividualTourPackages/Delete"
        root="/panel/individualTourPackage"
        buttonText="Individual Tur paket"
      />
    </Container>
  );
}
