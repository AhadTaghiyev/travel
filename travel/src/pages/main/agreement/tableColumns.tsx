import {GridColDef} from '@mui/x-data-grid';
import {FaDownload} from 'react-icons/fa';
import { apiService } from '../../../server/apiServer';

export const columns: GridColDef[] = [
    { field: 'No', headerName: 'No', flex: 1, headerClassName: 'header-item', width: 100, maxWidth: 100},
    { field: 'fileName', headerName: 'Müqavilə', flex: 1, headerClassName: 'header-item' },
    { field: 'filePath', headerName: 'Yüklə', flex: 1, headerClassName: 'header-item', renderCell: (params: any) => {
        return (
          <FaDownload style={{cursor: 'pointer'}} onClick={()=> apiService.download(params.row.filePath, params.row.fileName)}/>
        )
    } },
];