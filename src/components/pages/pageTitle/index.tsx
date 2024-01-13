import Breadcrumbs from '@mui/material/Breadcrumbs';
import {AiOutlineRight} from 'react-icons/ai';
import Divider from '@mui/material/Divider';

interface IPageTitleModel {
  title: string,
  breadcrumbs : any
}

export default function Index({title, breadcrumbs} : IPageTitleModel) {

  return (
    <>
        <p style={{display:"none"}}>
         {title}
        </p>
        <Breadcrumbs
            separator={<AiOutlineRight fontSize="small" />}
            aria-label="breadcrumb"
            sx={{mb: 1,fontSize:12}}
            >
            {breadcrumbs}
        </Breadcrumbs>
        <Divider sx={{mb: 3}}/>
    
    </>
  )
}
