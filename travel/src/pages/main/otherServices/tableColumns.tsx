import {GridColDef} from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'No', headerName: 'No', flex: 1, headerClassName: 'header-item'},
    { field: 'company', headerName: 'Müştəri', flex: 1, headerClassName: 'header-item', valueGetter: (params) => params.row?.company?.name },
    { field: 'deadline', headerName: 'Deadline', flex: 1, headerClassName: 'header-item' },
    { field: 'airWayId', headerName: 'Reys və hava yolları', flex: 1, headerClassName: 'header-item', valueGetter: (params) => params.row?.company?.name },
    { field: 'segmentCount', headerName: 'Sərnişin sayı', flex: 1, headerClassName: 'header-item', valueGetter: (params) => params.row?.segmentCount ?? 1 },
    { field: 'sellingPrice', headerName: 'Məbləğ', flex: 1, headerClassName: 'header-item' },
];