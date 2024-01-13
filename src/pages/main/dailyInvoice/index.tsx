import Container from '@mui/material/Container';
import PageTitle from '../../../components/pages/pageTitle';
import SimpleTable from "../../../components/pages/simpleTable";
import { useEffect, useState } from 'react';
import { apiService } from '../../../server/apiServer';
import {ISimpleTable} from "../../../components/pages/simpleTable/types";

const simpleTable : ISimpleTable = {
    header: '',
    properties : [],
    values : {}
};

export default function Index() {
    const [rows, setRows] = useState<ISimpleTable>(simpleTable);

    useEffect(()=> {
        const fetchData = async () => {
            try {
              const response = await apiService.get('/Report/DailyReport');

              const newRow : ISimpleTable = {
                header: '',
                properties : [],
                values : {}
              };

              for(let key in response.data){
                newRow.properties.push({
                    fieldName: response.data[key]?.fieldName,
                    propertyName: key
                })

                newRow.values[key] = response.data[key]?.value
              }

              newRow.header = 'Report'

              setRows(newRow);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
    }, [])

  return (
    <Container maxWidth='xl'>
        <PageTitle title='Gündəlik report' breadcrumbs={[]}/>
        <div style={{ height: '65vh', width: '100%' }}>
          <SimpleTable header={''} properties={rows.properties} values={rows.values}/>
        </div>
    </Container>
  )
}
