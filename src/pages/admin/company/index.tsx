import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl">
      <h1 className="text-black text-3xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
        {t("Companys")}
      </h1>
      <Table
        columns={columns(t)}
        api={"/Company"}
        buttonText="Company"
        deleteApi="/Company/delete"
        root="/admin/Companys"
        detailLink="/admin/companyTransactions/"
        hideCreate
        hideDelete
        hideEdit
        hideFilter
        hidePrint
        hideStatus
        showOverflow
      />
    </Container>
  );
}
