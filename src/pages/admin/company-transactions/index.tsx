import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function Index() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  return (
    <Container maxWidth="xl">
      <h1 className="text-black text-3xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
        {t("Company Transactions")}
      </h1>
      <Table
        columns={columns(t)}
        api={`/Transaction/${id}`}
        root="/admin/companyTransactions"
        hideReport
        hideCreate
        hideDelete
        hideEdit
        hideFilter
        hidePrint
        hideStatus
      />
    </Container>
  );
}
