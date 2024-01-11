import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell} from '@mui/material';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react';

function getNestedProperty(obj: any, path: string): any {
    const keys = path.split('.');
    let current: any = obj;

    for (const key of keys) {
        if (current[key] === undefined) {
            return undefined; 
        } else {
            current = current[key];
        }
    }
    return current;
}
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date?.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function Index({headers, tickets, totals}: any) {

    const [emptyCells, setEmptyCells] = useState<any>([]);

    useEffect(()=> {
        const emptCells = [];

        for(let i = 0; i< (headers.length - 2)/2; i++){
            emptCells.push(<TableCell sx={{borderLeft: '1px solid #e0e0e0', backgroundColor: '#F8F9FA'}}/>)
        }

        setEmptyCells(emptCells)   
    }, [])


  return (
    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        
                        <TableHead>
                            <TableRow >
                                {/* <TableCell align="left" sx={{fontWeight: 'bold', fontSize: '17px', borderLeft: '1px solid #e0e0e0'}}>Invoice No</TableCell> */}
                                {headers.map((elem, index)=> (
                                    <TableCell size='medium' align="left" sx={{fontWeight: 'bold',  borderLeft: '1px solid #e0e0e0'}} key={index}>{elem.fieldName}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tickets.map((elem, index)=> (
                                    <TableRow key={index} >
                                        {/* <TableCell sx={{borderLeft: '1px solid #e0e0e0'}} align="left">{index+1}</TableCell> */}
                                        {
                                            headers.map((hElem, hKey) => (
                                                <TableCell size='medium' sx={{borderLeft: '1px solid #e0e0e0'}} align="left" key={hKey}>
                                                    {
                                                        hElem.propertyName === 'invoiceDirections' ? (
                                                            elem.invoiceDirections?.map((iElem, ikey)=> (
                                                                <p key={ikey}>{formatDate(iElem?.flightDate) + ' - ' + iElem?.direction}</p>
                                                            ))
                                                        ) : (
                                                            <span>{hElem.propertyName === "date" ? formatDate(getNestedProperty(elem, hElem.propertyName)) : getNestedProperty(elem, hElem.propertyName)}</span>
                                                        )
                                                    }
                                                </TableCell>
                                            ))
                                        }

                                    </TableRow>
                                ))
                            }
                            {
                                totals != undefined && (
                                    <>
                                    <TableRow  sx={{width: '100%', borderBottom: '1px solid #e0e0e0', backgroundColor: '#F8F9FA'}}>
                                        {emptyCells}
                                        <TableCell size='medium' sx={{borderLeft: '1px solid #e0e0e0', fontWeight: 'bold'}} align="left">Satış qiyməti: </TableCell>
                                        <TableCell size='medium' sx={{ borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', fontWeight: 'bold'}} align="left">{totals.totalAmount}</TableCell>
                                        {emptyCells}
                                    </TableRow>
                                    <TableRow sx={{width: '100%', borderBottom: '1px solid #e0e0e0', backgroundColor: '#F8F9FA'}}>
                                        {emptyCells}
                                        <TableCell size='medium' sx={{borderLeft: '1px solid #e0e0e0', fontWeight: 'bold'}} align="left">Endirim: </TableCell>
                                        <TableCell size='medium' sx={{ borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', fontWeight: 'bold'}} align="left">{totals.totalPaidAmount}</TableCell>
                                        {emptyCells}
                                    </TableRow>
                                    <TableRow sx={{width: '100%', borderBottom: '1px solid #e0e0e0', backgroundColor: '#F8F9FA'}}>
                                        {emptyCells}
                                        <TableCell size='medium' sx={{borderLeft: '1px solid #e0e0e0', fontWeight: 'bold'}} align="left">Net qiymət: </TableCell>
                                        <TableCell size='medium' sx={{ borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', fontWeight: 'bold'}} align="left">{totals.totalDebt}</TableCell>
                                        {emptyCells}
                                    </TableRow>
                                    </>
                                )
                            }
                            
                         
                        </TableBody>
                    </Table>
                </TableContainer>
  )
}
