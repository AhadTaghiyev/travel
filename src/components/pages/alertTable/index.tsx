import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { IconType } from "react-icons";
import { Fragment } from 'react';
import {Link} from 'react-router-dom';

export interface IAlertTableHeadingsModel {
    fieldName: string;
    propertyName: string;
}

export interface IAlertTableHeading{
    text: string;
    icon?: IconType;
    style?: object;
    iconColor?: string;
}

export interface IAlertTableModel{
    heading?: IAlertTableHeading;
    tableHeadings?: IAlertTableHeadingsModel[];
    rows?: any[];
    link?: string;
}   



export default function index({tableHeadings, rows, link, heading}: IAlertTableModel) {
  return (
    <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow sx={{width: '100%', borderBottom: '1px solid #e0e0e0'}}>
                    <TableCell size='small' style={heading?.style} sx={{width: '100%', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', borderBottom: 0}}>
                        {
                            heading?.icon && <heading.icon color={heading.iconColor} style={{marginRight: '10px', fontSize: '25px'}}/>
                        }
                        {heading?.text}

                    </TableCell>
                </TableRow>
                <TableRow>
                    {
                        tableHeadings?.map((item, index)=> (
                            <Fragment key={index}>
                                <TableCell size='small' sx={{backgroundColor: '#F8F9FA', fontWeight: 'bold'}}>{item.fieldName}</TableCell>
                            </Fragment>
                        ))
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    rows?.map((item, index)=> (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {
                                tableHeadings?.map((prop, propIndex)=> (
                                    <TableCell size='small' key={propIndex} sx={{width: '30%'}} align="left">{ item[prop.propertyName]}</TableCell>
                                ))
                            }
                        </TableRow>
                    ))
                }
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell size='small' align='left' sx={{width: '100%', fontWeight: 'bold'}}><Link to={link} style={{color: '#59C1FF'}}>Show more</Link></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
  )
}
