import {GridColDef} from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'No', headerName: 'No', flex: 1, headerClassName: 'header-item'},
    { field: 'customer', headerName: 'Müştəri', flex: 1, headerClassName: 'header-item' , valueGetter:(params) =>  params.value.fullName },
    { field: 'tour', headerName: 'Tur adı', flex: 1, headerClassName: 'header-item' , valueGetter:(params) =>  params.value.name },
    { field: 'referanceNumber', headerName: 'Referans nömrəsi', flex: 1, headerClassName: 'header-item' },
    { field: 'departureDateTime', headerName: 'Uçus tarixi', flex: 1, headerClassName: 'header-item' , valueGetter:(params) =>  params.value.slice(0, 10)},
    { field: 'arrivalDateTime', headerName: 'Dönüş tarixi', flex: 1, headerClassName: 'header-item' , valueGetter:(params) =>  params.value.slice(0, 10)},
    { field: 'youngerCount', headerName: 'Böyük sayı', flex: 1, headerClassName: 'header-item' },
    { field: 'childrenCount', headerName: 'Uşaq sayı', flex: 1, headerClassName: 'header-item' },
    { field: 'commonPrice', headerName: 'Məbləğ', flex: 1, headerClassName: 'header-item' },
];