import { useState } from "react";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import Divider from "@mui/material/Divider";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";

const breadcrumbs = [
  <Link key="1" to="/panel" className="pageLink link">
    Ana səhifə
  </Link>,
  <Link key="1" to="/panel/willbepaid" className="currentPageLink link">
    Ödəniş
  </Link>,
];

const buttons = [
  {
    text: "Təchizatçı",
    value: "supplier",
  },
  {
    text: "Xərc",
    value: "fee",
  },
  {
    text: "Kredit",
    value: "credit",
  },
  {
    text: "Qeri qaytarmalar",
    value: "refund",
  },
  {
    text: "Maaş",
    value: "salary",
  },
];

export default function Index() {
  const [current, setCurrent] = useState(null);

  const handleCurrent = (e) => {
    setCurrent(e.value);
  };

  return (
    <Container maxWidth="xl">
      <>
        <h3 className="page-title">Ödəniş</h3>
        <Breadcrumbs
          separator={<AiOutlineRight fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 1 }}
        >
          {breadcrumbs}
        </Breadcrumbs>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2} sx={{ marginBottom: 3, marginLeft: 1 }}>
          {buttons.map((btn, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              value={btn.value}
              sx={{ marginRight: 4 }}
              onClick={(e) => handleCurrent(e.target)}
            >
              {btn.text}
            </Button>
          ))}
        </Grid>
        <Table
          columns={columns}
          api={`/WillBePaid/GetAllFilter`}
          root={"/panel/willbepaid"}
          deleteApi="/WillBePaid/DeleteWillBePaid"
          buttonText="Ödəniş"
          detailLink="/panel/willbepaid/detail/"
          current={current}
        />
      </>
    </Container>
  );
}
