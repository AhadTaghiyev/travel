import {GridColDef} from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'no', headerName: 'No', flex: 1, headerClassName: 'header-item'},
    { field: 'customer', headerName: 'Müştəri', flex: 1, headerClassName: 'header-item' , valueGetter:({value})=> value?.fullName},
    { field: 'paidAmount', headerName: 'Miqdar', flex: 1, headerClassName: 'header-item'},
    { field: 'note', headerName: 'Qeyd', flex: 1, headerClassName: 'header-item'},
    { field: 'date', headerName: 'Tarix', flex: 1, headerClassName: 'header-item',valueGetter:({value})=> value?.slice(0,10)},
];