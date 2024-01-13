import {GridColDef} from '@mui/x-data-grid';
import { Link } from '@mui/material';
import {BiSolidFileBlank} from 'react-icons/bi';
import Tooltip from '@mui/material/Tooltip';


export const columns: GridColDef[] = [
    { field: 'No', headerName: 'No', flex: 1, headerClassName: 'header-item', width: 100, minWidth: 100, maxWidth: 100},
    { field: 'file', headerName: 'File Adı', flex: 1, headerClassName: 'header-item'},
    { field: 'text', headerName: 'Text', flex: 1, headerClassName: 'header-item', renderCell: (params: any) => {
        return (
          <Tooltip title={params.row.text} placement="bottom">
                <span style={{width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{params.row.text}</span>
          </Tooltip>
        )
    }},
    { field: 'filePath', headerName: 'Detail', flex: 1, headerClassName: 'header-item' , width: 100, minWidth: 100, maxWidth: 100, renderCell: (params:any) =>{return (
        <Link href={params.row.filePath} target="_blank"><BiSolidFileBlank/></Link>
    )}},
];