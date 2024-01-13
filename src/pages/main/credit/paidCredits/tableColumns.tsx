import {GridColDef} from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'no', headerName: 'No', flex: 1, headerClassName: 'header-item'},
    { field: 'source', headerName: 'Kredit təşkilatı', flex: 1, headerClassName: 'header-item'},
    { field: 'payment', headerName: 'Ödəniş növü', flex: 1, headerClassName: 'header-item' , valueGetter:({value})=> value?.type},
    { field: 'amount', headerName: 'Miqdar', flex: 1, headerClassName: 'header-item'},
    { field: 'date', headerName: 'Tarix', flex: 1, headerClassName: 'header-item',valueGetter:({value})=> value?.slice(0,10)},
    { field: 'note', headerName: 'Qeyd', flex: 1, headerClassName: 'header-item'},
];