import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import Divider from '@mui/material/Divider';
import Table from '../../../../components/pages/table';
import { columns } from './tableColumns';

export default function Index() {
  return (
    <Container maxWidth="xl">
      <>
        <Divider sx={{ mb: 3 }} />
        <Table columns={columns} 
            api={'/Payments/GetAll'} 
            deleteApi='/Payments/Delete' 
            buttonText='Ödəniş' 
            root={'/panel/payments'}
            detailLink={'report/'} />
      </>
    </Container>
  );
}
