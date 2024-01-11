import Container from '@mui/material/Container';
import Table from '../../../components/pages/table';
import {columns} from './tableColumns';
import PageTitle from '../../../components/pages/pageTitle';
import { homeBreadCrumb, agreementBreadCrumb } from '../../../routes/breadcrumbs';

export default function Index() {

  return (
    <Container maxWidth='xl'>
        <PageTitle title='Müqavilə' breadcrumbs={[homeBreadCrumb, agreementBreadCrumb]}/>
      <Table columns={columns} api={'/Agreement/GetAll'} root={'/panel/agreements'} deleteApi='/Agreement/DeleteAgreement' buttonText='Müqavilə'/>
    </Container>
  )
}
