// @ts-nocheck
import Container from "@mui/material/Container";
import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";
import { useEffect, useState } from "react";
import { apiService } from "../../../../server/apiServer";
export default function Index() {
  const[data,setData]=useState({});
  const[payments,setPayments]=useState([]);
   let number=0;
  useEffect( ()=>{
    const fetchData=async ()=>{
      const res =await apiService.get('/Reports/TotalReciveAblePayable');
      setData(res.data)
    }
    fetchData();
  },[])



  useEffect( ()=>{
    const fetchData=async ()=>{
      const res =await apiService.get('/Reports/FinancalStatusReport');
      setPayments(res.data)


    }
    fetchData();
  },[])
  let totalAmount = payments.items?.reduce((acc, item) => acc + item.amount, 0) || 0;
  totalAmount+=data.willBeGet;
  totalAmount-=data.willBePaids;

  return (

    <Container maxWidth="xl">
      {/* <Table
        hideDelete
        hideCreate
        hideEdit
        hidePrint
        hideReport
        columns={columns}
        detailLink="/panel/reports/customers/"
        api={"/Reports/FinancalStatusReport"}
        root="/panel/reports/customers"
      /> */}



      <div style={{
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e0e0e0",
    maxWidth: "400px",
    margin: "20px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
}}>
      <div style={{fontSize: "18px", fontWeight: "600"}}>CurrentFinancalStatus: <span style={{fontWeight: "400"}}>{totalAmount}</span></div>
      <hr></hr>
      <br></br>
  {payments.items&&payments?.items.map((item,index)=>(
        <div style={{fontSize: "18px", fontWeight: "600", marginBottom: "8px"}}>{item.name}: <span style={{fontWeight: "400"}}>{item.amount}</span></div>
 
  ))}
    <div style={{fontSize: "18px", fontWeight: "600", marginBottom: "8px"}}>ReciveAbles: <span style={{fontWeight: "400"}}>{data.willBeGet}</span></div>
    <div style={{fontSize: "18px", fontWeight: "600"}}>Payables: <span style={{fontWeight: "400"}}>{data.willBePaids}</span></div>
</div>

      
    </Container>
  );
}
