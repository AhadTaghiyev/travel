
import Container from '@mui/material/Container';
// import { useState } from 'react';
import Table from "../../../components/pages/table";
import { columns } from "./table/tableColumns";
import { useTranslation } from 'react-i18next';
export default function Index() {
  const{t}=useTranslation();
  
  const columnsresult = columns(t);
  return (
    <Container maxWidth='xl'>
        {/* <PageTitle title='Aviabilet satışı'  breadcrumbs={[homeBreadCrumb, planeTicketBreadCrumb]}/> */}
      <Table exportLink='v1/PlaneTicket/Export/Export'  columns={columnsresult} api={'/PlaneTicket/GetAllFilter'} buttonText='Aviabilet' 
      deleteApi='/PlaneTicket/DeleteTicket' 
      root='/panel/aviabiletsale'/>
    </Container>
  )
}
