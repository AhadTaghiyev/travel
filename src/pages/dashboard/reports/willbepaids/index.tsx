import {useState} from 'react';
import { Grid, Button } from '@mui/material';
import Reports from '../../../../components/pages/reports';

const buttons = [
  {
    text: 'Təchizatçı',
    value: 'supplier'
  },
  {
    text: 'Xərc',
    value: 'fee'
  },
  {
    text: 'Kredit',
    value: 'credit'
  },
  {
    text: 'Qeri qaytarmalar',
    value: 'refund'
  },
  {
    text: 'Maaş',
    value: 'salary'
  },
]

export default function Index() {

  const [current, setCurrent] = useState(null);

  const handleCurrent = (e) => {
    setCurrent(e.value)
  }


  return (
    <>
      <Grid container spacing={2} sx={{marginBottom: 3, marginLeft: 1, marginTop: 2}}>
            {
              buttons.map((btn, index)=> (
                
              <Button 
                key={index} 
                variant="contained" 
                color={current==btn.value?"primary":"inherit"}
                value={btn.value} 
                sx={{marginRight: 4}}
                onClick={(e)=> handleCurrent(e.target)}>{btn.text}</Button>
                
              ))
            }
          </Grid>
      <Reports api='PaidReport' current={current}/>
    </>
  )
}
