import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Table from '../../../../components/pages/table';
import { columns } from './tableColumns';

export default function Index() {


  return (
    <Container maxWidth="xl">
      <>
        {/* <h3 className="page-title">Müştərilər</h3> */}
        {/* <Breadcrumbs
          separator={<AiOutlineRight fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 1 }}
        >
          {breadcrumbs}
        </Breadcrumbs> */}
        <Divider sx={{ mb: 3 }} />
        <Table columns={columns} api={'/Customers/GetAll'} buttonText='Müştəri' root={'/panel/customers'} deleteApi='/Customers/Delete' />
      </>
    </Container>
  );
}
