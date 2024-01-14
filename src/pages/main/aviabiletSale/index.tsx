import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";

import Table from "../../../components/pages/table";
import { columns } from "./table/tableColumns";

export default function Index() {
  const { t } = useTranslation();

  const columnsresult = columns(t);
  return (
    <Container maxWidth="xl">
      {/* <PageTitle title='Aviabilet satışı'  breadcrumbs={[homeBreadCrumb, planeTicketBreadCrumb]}/> */}
      <Table
        exportLink="v1/PlaneTickets/Export/Export"
        columns={columnsresult}
        api={"/PlaneTickets/GetAllFilter"}
        buttonText="Aviabilet"
        deleteApi="/PlaneTickets/DeleteTicket"
        root="/panel/aviabiletsale"
      />
    </Container>
  );
}
