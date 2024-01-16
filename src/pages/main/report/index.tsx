import Container from "@mui/material/Container";
// import { useState } from 'react';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import Table from "../../../components/pages/table";
import { columns } from "./table/tableColumns";
import PageTitle from "../../../components/pages/pageTitle";
import {
  homeBreadCrumb,
  planeTicketBreadCrumb,
} from "../../../routes/breadcrumbs";
// exportLink='v1/PlaneTickets/Export/Export'

export default function Index() {
  const breadcrumbs = useBreadcrumbs();
  console.log(breadcrumbs);

  // const [breadcrumb, setBreadcrumbs] = useState([homeBreadCrumb,
  //   planeTicketBreadCrumb])

  // function GetBreadCrumbs(breadcrumbs? : any){
  //   return[

  //     breadcrumbs
  //   ]
  // }

  return (
    <Container maxWidth="xl">
      <PageTitle
        title="Hesabat"
        breadcrumbs={[homeBreadCrumb, planeTicketBreadCrumb]}
      />
      <Table
        exportLink="v1/PlaneTickets/Export/Export"
        columns={columns}
        api={"/PlaneTickets/GetAll"}
        buttonText="Hesabat"
        deleteApi="/PlaneTickets/Delete"
        root="/panel/aviabiletsale"
      />
    </Container>
  );
}
