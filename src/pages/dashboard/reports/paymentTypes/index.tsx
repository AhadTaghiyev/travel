// @ts-nocheck
import Container from "@mui/material/Container";
import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";
import { useEffect, useState } from "react";
import { apiService } from "../../../../server/apiServer";
export default function Index() {
 


  return (

    <Container maxWidth="xl">
      <Table
        hideDelete
        hideCreate
        hideEdit
        hidePrint
        // hideReport
        columns={columns}
        detailLink="/panel/reports/paymentTypes/"
        api={"/Reports/PaymentReport"}
        root="/panel/reports/customers"
      />
    </Container>
  );
}
