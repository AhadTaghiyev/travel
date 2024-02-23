import {GridColDef} from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'No', headerName: 'No', flex: 1, headerClassName: 'header-item'},
    { field: 'Company', headerName: 'Müştəri', flex: 1, headerClassName: 'header-item', valueGetter: (params) => params.row?.company?.name },
    { field: 'Müştəri', headerName: 'Telefon', flex: 1, headerClassName: 'header-item', valueGetter: (params) => params.row?.company?.name },
    { field: 'Status', headerName: 'Status', flex: 1, headerClassName: 'header-item', valueGetter: (params) => params.row?.company?.name },

];