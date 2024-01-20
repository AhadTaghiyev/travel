import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import Divider from '@mui/material/Divider';
import Table from '../../../../components/pages/table';
import {GridColDef} from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'No', headerName: 'No', flex: 1, headerClassName: 'header-item'},
    { field: 'name', headerName: 'Ad', flex: 1, headerClassName: 'header-item'},
]


export default function Index() {

    const breadcrumbs = [
        <Link key="1" to="/panel" className="pageLink link">
          Ana səhifə
        </Link>,
        <Link key="1" to="/panel/fee" className="currentPageLink link">
          Xərclər
        </Link>,
      ];


  return (
    <Container maxWidth="xl">
      <>
        <h3 className="page-title">Xərclər</h3>
        <Breadcrumbs
          separator={<AiOutlineRight fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 1 }}
        >
          {breadcrumbs}
        </Breadcrumbs>
        <Divider sx={{ mb: 3 }} />
        <Table columns={columns} api={'/Fee/GetAllFilter'} root={'/panel/fee'} deleteApi='/Fee/DeleteFee' buttonText='xərc'/>
      </>
    </Container>
  )
}