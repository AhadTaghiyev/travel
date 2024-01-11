// @ts-nocheck
import Table from '../../../../components/pages/table';
import {columns} from './tableColumns';

export default function Index() {
  return (
    <Table columns={columns} api={'/PlaneTicket/GetAll'} buttonText='Aviabilet' 
    deleteApi='/PlaneTicket/DeleteTicket' 
    root='/panel/aviabiletsale'/>
  )
}
