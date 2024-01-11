import Reports from '../../../../../components/pages/reports';
import { useParams } from 'react-router-dom';

export default function Index() {

    const {id} = useParams();

  return (
    <Reports api={`GetFeeDetail/${id}`}/>
  )
}