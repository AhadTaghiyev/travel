import {GridColDef} from '@mui/x-data-grid';
// import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

export const columns: GridColDef[] = [
    { field: 'no', headerName: 'No', flex: 1, headerClassName: 'header-item'},
    // { field: 'supplier', headerName: 'Təsisçi', flex: 1, headerClassName: 'header-item' , valueGetter:({value})=> value?.name},
    // { field: 'payment', headerName: 'Ödəniş növü', flex: 1, headerClassName: 'header-item' , valueGetter:({value})=> value?.type},
    // { field: 'isFromSupplier', headerName: 'Borc', flex: 1, headerClassName: 'header-item', renderCell:({value})=> value ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>},
    { field: 'amount', headerName: 'Miqdar', flex: 1, headerClassName: 'header-item'},
    { field: 'note', headerName: 'Qeyd', flex: 1, headerClassName: 'header-item'},
    // { field: 'date', headerName: 'Tarix', flex: 1, headerClassName: 'header-item',valueGetter:({value})=> value?.slice(0,10)},
];