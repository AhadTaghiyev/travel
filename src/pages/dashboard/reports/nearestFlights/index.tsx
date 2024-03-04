import Container from "@mui/material/Container";
import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";
import { useTranslation } from "react-i18next";
import img from "@/assets/abc_home-1.jpg";

export default function Index() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl" className="bg-white">
      <img src={img} style={{ width: "300px" }} />
      <h1 className="text-center mb-8 font-bold text-2xl">
        {t("Yaxın uçuşlar")}
      </h1>
      <Table
        hideFilter
        hideDelete
        hideCreate
        hideEdit
        hidePrint
        hideReport
        columns={columns}
        detailLink="/panel/reports/NearestTravelReport/"
        api={"/Reports/NearestTravelReport"}
        root="/panel/reports/customers"
      />
    </Container>
  );
}
