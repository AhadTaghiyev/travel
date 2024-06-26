import Container from '@mui/material/Container';
import Table from '../../../components/pages/table';
import { columns } from './tableColumns';
import { useTranslation } from "react-i18next";
export default function Index() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl">
      <Table
        detailLink='/panel/agreements/conractdetail/'
        columns={columns(t)}
        api={"/Agreements/GetAll"}
        buttonText="Müqavilə formatı"
        deleteApi="/Agreements/Delete"
        root="/panel/agreements"
      />
    </Container>
  );
}