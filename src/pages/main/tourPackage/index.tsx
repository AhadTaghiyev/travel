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
        exportLink="v1/TourPackages/Export/Export"
        columns={columns}
        api={"/TourPackages/GetAllFilter"}
        deleteApi="/TourPackages/Delete"
        root="/panel/tourPackages"
        buttonText="Tur paket"
      />
    </Container>
  );
}