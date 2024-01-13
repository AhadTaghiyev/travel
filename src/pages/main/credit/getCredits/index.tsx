import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import Divider from '@mui/material/Divider';
import { columns } from './tableColumns';
import Table from '../../../../components/pages/table';


export default function Index() {

  const breadcrumbs = [
    <Link key="1" to="/panel" className="pageLink link">
      Ana səhifə
    </Link>,
    <Link key="1" to="/panel/getCredits" className="currentPageLink link">
      Kreditlər Borclar
    </Link>,
  ];

  return (
    <Container maxWidth="xl">
      <>
        <h3 className="page-title">Kreditlər</h3>
        <Breadcrumbs
          separator={<AiOutlineRight fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 1 }}
        >
          {breadcrumbs}
        </Breadcrumbs>
        <Divider sx={{ mb: 3 }} />
        <Table columns={columns} api={'/GetCredit/GetAllFilter'} root={'/panel/GetCredits'} deleteApi='/GetCredit/DeleteGetCredit' buttonText='Kredit' />
      </>
    </Container>
  );
}
