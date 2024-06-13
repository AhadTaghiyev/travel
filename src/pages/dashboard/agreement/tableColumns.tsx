// @ts-nocheck
import {GridColDef} from '@mui/x-data-grid';
import {FaDownload} from 'react-icons/fa';
import { apiService } from '../../../server/apiServer';
import { TFunction } from "i18next";
export const columns:  (t: TFunction) => GridColDef[] = (t: TFunction) => [
    { field: 'No', headerName: 'No', flex: 1, headerClassName: 'header-item', width: 100, maxWidth: 100},
    { field: 'ref', headerName: 'Ref', flex: 1, headerClassName: 'header-item' },
    { field: 'name', headerName: 'Müqavilə', flex: 1, headerClassName: 'header-item' },
   
  
];

