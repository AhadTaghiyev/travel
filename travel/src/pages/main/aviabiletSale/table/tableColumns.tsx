import {GridColDef} from '@mui/x-data-grid';
import { TFunction } from 'i18next';

export const columns = (t: TFunction): GridColDef[] => [
    { field: 'No', headerName: t('no'), flex: 1, headerClassName: 'header-item'},
    { field: 'date', headerName: t('date'), flex: 1, headerClassName: 'header-item' },
    { field: 'customer', headerName: t('customer'), flex: 1, headerClassName: 'header-item', valueGetter: (params) => params.row?.customer?.fullName },
    { field: 'ticketNo', headerName: t('ticketNo'), flex: 1, headerClassName: 'header-item' },
    { field: 'airWayId', headerName: t('airWayId'), flex: 1, headerClassName: 'header-item', valueGetter: (params) => params.row?.company?.name },
    { field: 'segmentCount', headerName: t('segmentCount'), flex: 1, headerClassName: 'header-item', valueGetter: (params) => params.row?.segmentCount ?? 1 },
    { field: 'commonPrice', headerName: t('commonPrice'), flex: 1, headerClassName: 'header-item' },
];