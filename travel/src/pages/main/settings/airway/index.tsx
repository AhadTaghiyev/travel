import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import Divider from '@mui/material/Divider';
import Table from '../../../../components/pages/table';
import { columns } from './tableColumns';

export default function Index() {

  const breadcrumbs = [
    <Link key="1" to="/panel" className="pageLink link">
      Ana səhifə
    </Link>,
    <Link key="1" to="/panel/airways" className="currentPageLink link">
      Hava yolları
    </Link>,
  ];

  return (
    <Container maxWidth="xl">
      <>
      
        <Table columns={columns} api={'/airways/GetAll'} root={'/panel/airways'} deleteApi='/AirWays/delete' buttonText='Hava yolu'/>
      </>
    </Container>
  );
}
