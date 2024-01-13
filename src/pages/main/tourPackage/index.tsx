import Container from '@mui/material/Container';
import Table from '../../../components/pages/table';
import {columns} from './tableColumns';
import PageTitle from '../../../components/pages/pageTitle';
import { TourPackageBreadCrumb,  homeBreadCrumb } from '../../../routes/breadcrumbs';


export default function Index() {

  return (
    <Container maxWidth='xl'>
        {/* <PageTitle title='Tur Paket' breadcrumbs={[homeBreadCrumb, TourPackageBreadCrumb]}/> */}
      <Table exportLink='v1/TourPackage/Export/Export' columns={columns} api={'/TourPackage/GetAllFilter'} deleteApi='/TourPackage/DeleteTourPackage' root='/panel/tourPackages' buttonText='Tur paket'/>
    </Container>
  )
}
