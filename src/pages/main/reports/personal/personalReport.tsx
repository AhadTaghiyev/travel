import { useParams } from 'react-router-dom';
import Reports from '../../../../components/pages/reports';

export default function Index() {

  const {id} = useParams();

  return (
    <Reports api={`GetPersonalDetail/${id}`}/>
  )
}