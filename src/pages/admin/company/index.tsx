import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import {AiOutlineRight} from 'react-icons/ai';
import Divider from '@mui/material/Divider';
import Table from '../../../components/pages/table';
import {columns} from './tableColumns';

export default function Index() {

    const breadcrumbs = [
        <Link key="1" to="/admin" className='pageLink link'>
            Dashboard
        </Link>,
        <Link key="1" to="/admin/company" className='currentPageLink link'>
            Kompaniyalar
        </Link>,
    ]

  return (
    <Container maxWidth='xl'>
        <>
            <h3 className='page-title'>Kompaniyalar</h3>
            <Breadcrumbs
            separator={<AiOutlineRight fontSize="small" />}
            aria-label="breadcrumb"
            sx={{mb: 1}}
            >
            {breadcrumbs}
            </Breadcrumbs>
            <Divider sx={{mb: 3}}/>
            <Table columns={columns} api={'/Company/GetAll'} root={'/admin/company'} buttonText='kompaniya' deleteApi='/Company/Delete'/>
        </>
    </Container>
  )
}
