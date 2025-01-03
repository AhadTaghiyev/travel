import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {

    field: "travelDates",
    headerName: "Flight Dates",
    flex: 1,
    headerClassName: "header-item",
  },
  {

    field: "ref",
    headerName: "Ref",
    flex: 1,
    headerClassName: "header-item",
  },
  {

    field: "service",
    headerName: "Service",
    flex: 1,
    headerClassName: "header-item",
  },
  {

    field: "passanger",
    headerName: "Passanger",
    flex: 1,
    headerClassName: "header-item",
  },
  {

    field: "airLine",
    headerName: "AirLine",
    flex: 1,
    headerClassName: "header-item",
  },
  {

    field: "sector",
    headerName: "Sector",
    flex: 1,
    headerClassName: "header-item",
  },

  {

    field: "customer",
    headerName: "Customer",
    flex: 1,
    headerClassName: "header-item",
  },
  {

    field: "phone",
    headerName: "Phone",
    flex: 1,
    headerClassName: "header-item",
  },
  {

    field: "personal",
    headerName: "Personal",
    flex: 1,
    headerClassName: "header-item",
  },

  // Passanger=x.PassengerName,
  // =x.TicketNo,
  // =x.Invoice.Customer.FullName,
  // Phone=x.Invoice.Customer.PhoneNumber
];
