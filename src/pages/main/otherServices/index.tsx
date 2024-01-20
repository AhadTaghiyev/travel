import Container from '@mui/material/Container';
import Table from '../../../components/pages/table';
import {columns} from './tableColumns';


export default function Index() {
  return (
    <Container maxWidth='xl'>
         {/* <PageTitle
                    title=" Digər xidmətlər"
                    breadcrumbs={[
                        homeBreadCrumb,
                        OtherServicesBreadCrumb,
                    ]}
                /> */}
      <Table columns={columns} api={'/OtherServiceTicket/GetAllFilter'} deleteApi='/OtherServiceTicket/DeleteOtherServiceTicket' root='/panel/otherServices' buttonText='Xidmət'/>
    </Container>
  )
}
