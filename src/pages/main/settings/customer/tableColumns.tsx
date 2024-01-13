import {GridColDef} from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'No', headerName: 'No', flex: 1, headerClassName: 'header-item'},
    { field: 'fullName', headerName: 'Müştəri', flex: 1, headerClassName: 'header-item'},
    { field: 'email', headerName: 'Email', flex: 1, headerClassName: 'header-item' },
    { field: 'phoneNumber', headerName: 'Telefon nömrəsi', flex: 1, headerClassName: 'header-item' },

];