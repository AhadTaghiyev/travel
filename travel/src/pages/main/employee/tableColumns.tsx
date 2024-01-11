import {GridColDef} from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'no', headerName: 'No', flex: 1, headerClassName: 'header-item'},
    { field: 'fullName', headerName: 'Ad Soyad', flex: 1, headerClassName: 'header-item'},
    { field: 'email', headerName: 'Email', flex: 1, headerClassName: 'header-item'},
    { field: 'phoneNumber', headerName: 'Telefon', flex: 1, headerClassName: 'header-item'},
    { field: 'position', headerName: 'Vəzifə', flex: 1, headerClassName: 'header-item'},
    { field: 'salary', headerName: 'Əmək Haqqı', flex: 1, headerClassName: 'header-item'},
];