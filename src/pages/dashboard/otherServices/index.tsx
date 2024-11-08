import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";

import { columns } from "./columns";

import Table from "@/components/pages/table";

export default function Index() {
  const { t } = useTranslation();

  const columnsresult = columns(t);
  return (
    <Container maxWidth="xl">
      <Table
        hidePrint={false}
        hideReceipt={true}
        exportLink="OtherServices/Export/Export"
        columns={columnsresult}
        api={"/OtherServices/GetAllFilter"}
        buttonText="Digər Xidmət"
        deleteApi="/OtherServices/Delete"
        root="/panel/otherService"
      />
    </Container>
  );
}
