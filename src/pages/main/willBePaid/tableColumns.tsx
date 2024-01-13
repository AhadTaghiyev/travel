import {GridColDef} from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'no', headerName: 'No', flex: 1, headerClassName: 'header-item'},
    { field: 'date', headerName: 'Tarix', flex: 1, headerClassName: 'header-item'},
    { field: 'amount', headerName: 'Miqdar', flex: 1, headerClassName: 'header-item'},
    { field: 'isPaid', headerName: 'odenildi', flex: 1, headerClassName: 'header-item'},
    
];