import Container from '@mui/material/Container';
import Table from '../../../components/pages/table';
import {columns} from './tableColumns';
import PageTitle from "../../../components/pages/pageTitle";
import {
    MassIncomeBreadCrumb,
    homeBreadCrumb,
} from "../../../routes/breadcrumbs";


export default function Index() {


  return (
    <Container maxWidth='xl'>
        <PageTitle
                    title=" Mədaxil"
                    breadcrumbs={[
                        homeBreadCrumb,
                        MassIncomeBreadCrumb,
                    ]}
                />
      <Table columns={columns} api={'/MassIncome/GetAllFilter'} buttonText='Mədaxil' 
      deleteApi='/MassIncome/DeleteMassIncome' 
      root='/panel/massIncome'/>
        
    </Container>
  )
}
