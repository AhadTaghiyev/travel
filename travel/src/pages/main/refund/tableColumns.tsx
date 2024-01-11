import {GridColDef} from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'No', headerName: 'No', headerClassName: 'header-item'},
    { field: 'planeTicket', headerName: 'Avia Bilet', flex: 1, headerClassName: 'header-item', valueGetter:(params)=>params.value?.referanceNo},
    { field: 'cooperativeTicket', headerName: 'Korperativ Bilet', flex: 1, headerClassName: 'header-item', valueGetter:(params)=>params.value?.referanceNo},
    { field: 'tourPackage', headerName: 'Tur Paket', flex: 1, headerClassName: 'header-item', valueGetter:(params)=>params.value?.referanceNumber},
    { field: 'individualTour', headerName: 'Individual Tur', flex: 1, headerClassName: 'header-item', valueGetter:(params)=>params.value?.referanceNumber},
    { field: 'deposit', headerName: 'Depozit', flex: 1, headerClassName: 'header-item', valueGetter:(params)=>params.value?.customer?.fullName },
    { field: 'otherServiceTicket', headerName: 'Digər xidmətlər', flex: 1, headerClassName: 'header-item', valueGetter:(params)=>params.value?.referanceNo},
    { field: 'amount', headerName: 'Miqdar', headerClassName: 'header-item'},
    { field: 'paidToCustomer', headerName: 'Ödənilən məbləğ', headerClassName: 'header-item'},
    { field: 'forfeit', headerName: 'Cərimə', headerClassName: 'header-item'},
];