// @ts-nocheck

import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import Divider from '@mui/material/Divider';
import Table from '../../../components/pages/table';
import { columns } from './tableColumns';

export default function Index() {

  const breadcrumbs = [
    <Link key="1" to="/panel" className="pageLink link">
      Ana səhifə
    </Link>,
    <Link key="1" to="/panel/refunds" className="currentPageLink link">
      Geri Qaytarmalar
    </Link>,
  ];

  return (
    <Container maxWidth="xl">
      <>
  
        <Divider sx={{ mb: 3 }} />
        <Table columns={columns} api={'/Refund/GetAllFilter'} root={'/panel/refunds'} deleteApi='/Refund/DeleteRefund' buttonText='Geri qaytarma' />
      </>
    </Container>
  );
}
