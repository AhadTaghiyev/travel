//@ts-nocheck
import Container from '@mui/material/Container';
import PageTitle from '../../../../components/pages/pageTitle';
import { columns } from "./tableColumns";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { apiService } from '../../../../server/apiServer';



export default function index() {

    const [rows, setRows] = useState([]);

    useEffect(()=> {
        const fetchData = async () => {
            try {
              const response = await apiService.get('Document/Get');
              
              setRows(response?.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
    }, [])

    console.log(rows)


  return (
    <Container maxWidth='xl'>
        <PageTitle title='Sənədlər' breadcrumbs={[]}/>
        <div style={{ height: '65vh', width: '100%' }}>
          <DataGrid
            columns={columns}
            paginationMode="server"
            rows={rows?.map((row: any, index: number) => ({
              No: index + 1,
              ...row,
            }))}
            pageSizeOptions={[10, 50, 100]}
            disableRowSelectionOnClick={true}
            sx={{
              '& .MuiDataGrid-cell': {
                border: 1,
                borderRight: 0,
                borderTop: 0,
                borderColor: '#e0e0e0',
              },
              '& .header-item': {
                border: 1,
                borderRight: 0,
                borderTop: 0,
                borderColor: '#e0e0e0',
              },
            }}
            pagination
            checkboxSelection
          />
        </div>
    </Container>
  )
}
