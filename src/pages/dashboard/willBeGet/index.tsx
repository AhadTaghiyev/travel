import Container from "@mui/material/Container";
import PageTitle from "../../../components/pages/pageTitle";
import { useEffect, useState } from "react";
import { apiService } from "../../../server/apiServer";
import { ISimpleTable } from "../../../components/pages/simpleTable/types";
import InvoiceTable from "../../../components/pages/invoiceTable";

const simpleTable = {
  header: "",
  properties: [],
  values: {},
};

export default function index() {
  const [rows, setRows] = useState<ISimpleTable>(simpleTable);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get("/Report/WillBeGet");

        const newRow = {
          header: "",
          properties: [],
          values: {},
          details: {},
        };

        for (const key in response.data) {
          newRow.properties.push({
            fieldName: response.data[key]?.fieldName,
            propertyName: key,
          });

          newRow.values[key] = response.data[key]?.value;

          newRow.details[key] = "/panel/willBeGet/" + response.data[key]?.key;
        }

        newRow.header = "";

        setRows(newRow);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      <PageTitle title="Alınacaqlar" breadcrumbs={[]} />
      <div style={{ height: "65vh", width: "100%" }}>
        <InvoiceTable
          headers={rows.properties}
          tickets={[rows.values]}
          totals={{ totalAmount: 100, totalPaidAmount: 50 }}
        />
      </div>
    </Container>
  );
}
