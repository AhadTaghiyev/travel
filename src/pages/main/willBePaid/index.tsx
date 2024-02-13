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
        columns={columns}
        api={"/WillBePaids/GetAll"}
        buttonText="WillBePaid" // Hola
        deleteApi="/WillBePaids/Delete"
        root="/panel/willBePaids"
        filterOptions={[
          { label: t("supplier"), value: "supplier" },
          { label: t("Kredit"), value: "credit" }, // Hola
          { label: t("Geri qaytarma"), value: "refund" }, // Hola
          { label: t("Xərc"), value: "fee" }, // Hola
          { label: t("Maaş"), value: "salary" }, // Hola
        ]}
      />
    </Container>
  );
}
