import Container from "@mui/material/Container";
import PageTitle from "../../../components/pages/pageTitle";
import SimpleTable from "../../../components/pages/simpleTable";
import { useEffect, useState } from "react";
import { apiService } from "../../../server/apiServer";
import { ISimpleTable } from "../../../components/pages/simpleTable/types";

const simpleTable: ISimpleTable = {
  header: "",
  properties: [],
  values: {},
};

export default function index() {
  const [rows, setRows] = useState<ISimpleTable>(simpleTable);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get("/Report/DepositsCustomer");

        const newRow: ISimpleTable = {
          header: "",
          properties: [],
          values: {},
        };

        response.data.customerDeposits.forEach((elem: any) => {
          newRow.properties.push({
            fieldName: elem["customerFullName"],
            propertyName: elem["customerFullName"],
          });

          newRow.values[elem["customerFullName"]] = elem.totalPaidAmount;
        });

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
      <PageTitle title="Müştəri depozitləri" breadcrumbs={[]} />
      <div style={{ height: "65vh", width: "100%" }}>
        <SimpleTable
          header={""}
          properties={rows.properties}
          values={rows.values}
        />
      </div>
    </Container>
  );
}
