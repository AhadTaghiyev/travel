import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";

import Table from "@/components/pages/table";
import { columns } from "./columns";

export default function Index() {
  const { t } = useTranslation();

  const columnsresult = columns(t);
  return (
    <Container maxWidth="xl">
      {/* <PageTitle title='Aviabilet satışı'  breadcrumbs={[homeBreadCrumb, planeTicketBreadCrumb]}/> */}
      <Table
        showPrint
        exportLink="CorporateTickets/Export/Export"
        columns={columnsresult}
        api={"/CorporateTickets/GetAllFilter"}
        buttonText="Corporative Ticket"
        deleteApi="/CorporateTickets/Delete"
        root="/panel/corperativeTicket"
      />
    </Container>
  );
}
