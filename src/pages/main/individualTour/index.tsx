// @ts-nocheck
import Container from "@mui/material/Container";

import Table from "../../../components/pages/table";
import { columns } from "./tableColumns";
import PageTitle from "../../../components/pages/pageTitle";
import { IndividualTourBreadCrumb, homeBreadCrumb } from "../../../routes/breadcrumbs";

export default function Index() {
    return (
        <Container maxWidth="xl">
            {/* <PageTitle
                title=" İndividual Tur Paket"
                breadcrumbs={[homeBreadCrumb, IndividualTourBreadCrumb]}
            /> */}

            <Table
                columns={columns}
                api={"/IndividualTour/GetAllFilter"}
                deleteApi="/IndividualTour/DeleteTicket"
                root="/panel/individualTourPackage"
                buttonText="Individual tur bilet"
            />
        </Container>
    );
}
