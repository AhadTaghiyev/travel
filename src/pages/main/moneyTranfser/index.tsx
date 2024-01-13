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
    <Link key="1" to="/panel/moneyTransfers" className="currentPageLink link">
      Vəsait transferi
    </Link>,
  ];

  return (
    <Container maxWidth="xl">
      <>
        <h3 className="page-title"> Vəsait transferləri</h3>
        <Breadcrumbs
          separator={<AiOutlineRight fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 1 }}
        >
          {breadcrumbs}
        </Breadcrumbs>
        <Divider sx={{ mb: 3 }} />
        <Table columns={columns} api={'/MoneyTransfer/GetAllFilter'} root={'/panel/moneyTransfers'} deleteApi='/MoneyTransfer/DeleteMoneyTransfer' buttonText='Vəsait transferi' />
      </>
    </Container>
  );
}
