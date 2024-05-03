import Container from "@mui/material/Container";
import PageTitle from "../../../components/pages/pageTitle";
import { useEffect, useState } from "react";
import { apiService } from "../../../server/apiServer";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";

const footerStyle = {
  background: "#F8F9FA",
  padding: "10px 4px",
};

interface IPaidSalaryModel {
  salaries: [];
  totalPaidSalary: number;
}

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "employeeName",
    headerName: "İşçi",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "paidsalary",
    headerName: "Ödənilən",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "bonus",
    headerName: "Bonus",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "extraSalary",
    headerName: "Əlavə",
    flex: 1,
    headerClassName: "header-item",
  },
];

export default function Index() {
  const [rows, setRows] = useState<IPaidSalaryModel>({
    salaries: [],
    totalPaidSalary: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get("/Report/PaidSalary");

        setRows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      <PageTitle title="Ödənilən maaşlar" breadcrumbs={[]} />
      <div style={{ height: "65vh", width: "100%" }}>
        <DataGrid
          columns={columns}
          paginationMode="server"
          rows={rows?.salaries?.map((row: any, index: number) => ({
            No: index + 1,
            ...row,
          }))}
          getRowId={() => uuidv4()}
          pageSizeOptions={[10, 50, 100]}
          disableRowSelectionOnClick={true}
          sx={{
            "& .MuiDataGrid-cell": {
              border: 1,
              borderRight: 0,
              borderTop: 0,
              borderColor: "#e0e0e0",
            },
            "& .header-item": {
              border: 1,
              borderRight: 0,
              borderTop: 0,
              borderColor: "#e0e0e0",
            },
          }}
          pagination
          checkboxSelection
        />
      </div>
      <footer style={footerStyle}>
        <span style={{ fontWeight: "600", marginRight: "116px" }}>Yekun</span>
        <span>{rows.totalPaidSalary}</span>
      </footer>
    </Container>
  );
}
