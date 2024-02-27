import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl">
      <Table
        hideEdit
        hideReport
        hideCreate
        hideDelete
        columns={columns}
        api={"/WillBePaids/GetAll"}
        buttonText="WillBePaid"
        deleteApi="/WillBePaids/Delete"
        root="/panel/willBePaids"
        defaultFilterValue="supplier"
        filterOptions={[
          { label: t("supplier"), value: "supplier" },
          { label: t("Credit"), value: "credit" },
          { label: t("Geri qaytarma"), value: "refund" },
          { label: t("Xərc"), value: "fee" },
          { label: t("Maaş"), value: "salary" },
        ]}
      />
    </Container>
  );
}
