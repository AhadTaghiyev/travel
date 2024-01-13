import Table from "../../../../components/pages/table";
import { columns } from "./tableColumns";

export default function Index() {
  return (
    <Table
      columns={columns}
      api={"/PlaneTickets/GetAll"}
      buttonText="Aviabilet"
      deleteApi="/PlaneTickets/DeleteTicket"
      root="/panel/aviabiletsale"
    />
  );
}
