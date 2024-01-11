import {GridColDef} from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'No', headerName: 'No', flex: 1, headerClassName: 'header-item'},
    { field: 'customerName', headerName: 'Müştəri', flex: 1, headerClassName: 'header-item'},
    { field: 'referanceNo', headerName: 'Referans nömrəsi', flex: 1, headerClassName: 'header-item'},
    { field: 'debt', headerName: 'Ümumi Borc', flex: 1, headerClassName: 'header-item' },
    { field: 'paidAmount', headerName: 'Ödənilən məbləğ', flex: 1, headerClassName: 'header-item' },
    { field: 'restOfAmount', headerName: 'Qalıq məbləğ', flex: 1, headerClassName: 'header-item' },
];