import Container from "@mui/material/Container";
import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";
import PageTitle from "../../../components/pages/pageTitle";
import {
    CoorperativeTicketBreadCrumb,
    homeBreadCrumb,
} from "../../../routes/breadcrumbs";

export default function Index() {
    return (
        <Container maxWidth="xl">
         
            <Table
                exportLink='v1/CooperativeTicket/Export/Export'
                columns={columns}
                api={"/CooperativeTicket/GetAllFilter"}
                root={"/panel/corperativeTicket"}
                deleteApi="/CooperativeTicket/DeleteCooperativeTicket"
                buttonText="Korperativ bilet"
            />
        </Container>
    );
}
