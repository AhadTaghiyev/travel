// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { IMassIncomeModel } from "../types";
import { Formik, Form } from "formik";
import {
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { apiService } from "../../../../server/apiServer";
import { MassIncomeSchema } from "../schema";
import PageTitle from "../../../../components/pages/pageTitle";
import {
  MassIncomeBreadCrumb,
  homeBreadCrumb,
  newMassIncomeBreadCrumb,
} from "../../../../routes/breadcrumbs";
import { log } from "console";

const textStyling = {
  lineHeight: "16px",
  fontWeight: "400",
  fontSize: "12px",
};

const footer = {
  borderRadius: "2px",
  background: "#F8F9FB",
  display: "flex",
  justifyContent: "end",
  padding: "12px 60px",
};

const initialValues: IMassIncomeModel = {
  debt: 0,
  paidAmount: 0,
  restOfAmount: 0,
  description: "",
  paymentId: 0,
};

const ticketTypes = [
  {
    name: "Aviabilet Bilet",
    key: "PlaneTicket",
    prop: "planeTicketId",
  },
  {
    name: "Korparativ Bilet",
    key: "CooperativeTicket",
    prop: "cooperativeTicketId",
  },
  {
    name: "Individual Tur Bilet",
    key: "IndividualTour",
    prop: "individualTourId",
  },
  {
    name: "Tur Paket Bilet",
    key: "TourPackage",
    prop: "tourPackageId",
  },
  {
    name: "Digər Xidmətlər",
    key: "OtherServiceTicket",
    prop: "otherServiceTicketId",
  },
];

export default function Index() {
  const navigate = useNavigate();

  const [ticketType, setTicketType] = useState({
    name: "",
    key: "",
    prop: "",
  });
  const allTickets = useRef([]);
  const [tickets, setTickets] = useState([]);
  const [payments, setPayments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState({});
  const getPayments = async () => {
    const personalFromApi = await apiService.get("Payment/GetAll/1");
    setPayments(personalFromApi.data.items);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.get(`/${ticketType.key}/GetAll/1`);
        if (res.status === 200) {
          allTickets.current = res.data.items;
          setCurrentCustomer({});
          setCustomers(res.data.items.map((item) => item.customer));
        } else console.error;
      } catch {
        console.error;
      }
    };

    ticketType.name !== "" && fetchData();
  }, [ticketType]);

  useEffect(() => {
    setTickets(
      allTickets.current.filter((x) => x.customer?.id === currentCustomer.id)
    );
  }, [currentCustomer]);

  return (
    <>
      <Container maxWidth="xl">
        <PageTitle
          title="Mədaxil"
          breadcrumbs={[
            homeBreadCrumb,
            MassIncomeBreadCrumb,
            newMassIncomeBreadCrumb,
          ]}
        />
      </Container>
      <Formik
        initialValues={initialValues}
        validationSchema={MassIncomeSchema}
        onSubmit={async (values, { setErrors }) => {
          try {
            const res = await apiService.post(
              `/MassIncome/CreateMassIncome`,
              values
            );
            if (res?.status == 200) {
              console.log(res.data.data);

              toast.success("Uğurla yaradıldı!");
              if (res.data.data) {
                // const guids = res?.data.data.join(',');
                navigate({
                  pathname: `/panel/massIncome/report`,
                  search: `?tickets=${res.data.data.id}`,
                });
              }
            } else {
              console.log(res);
              setErrors(res.data.errors);
            }
          } catch (err) {
            toast.error("Xəta baş verdi");
          }
        }}
        render={(props) => (
          <Form>
            <Container maxWidth="xl">
              <Grid container spacing={4} style={{ marginBottom: "70px" }}>
                <Grid item md={2}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Bilet növü
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e: any) => {
                      props.values.cooperativeTicketId = "";
                      props.values.planeTicketId = "";
                      props.values.otherServiceTicketId = "";
                      props.values.individualTourId = "";
                      props.values.tourPackageId = "";

                      setTicketType(e.target.value);
                    }}
                    value={ticketType}
                    sx={{ width: "100%", mb: 1 }}
                    style={textStyling}
                    size="small"
                  >
                    {ticketTypes?.map((ticketType: any, index: number) => (
                      <MenuItem
                        key={index}
                        value={ticketType}
                        style={textStyling}
                      >
                        {ticketType.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Müştəri
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    value={currentCustomer}
                    onChange={(event, newValue) => setCurrentCustomer(newValue)}
                    getOptionLabel={(option) => option.fullName ?? ""}
                    options={customers}
                    sx={{ width: "100%", mb: 1 }}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="" />}
                  />
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Biletlər
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={ticketType.prop}
                    onChange={(e) => {
                      props.handleChange(e);
                      props.setFieldValue(
                        "debt",
                        tickets?.find((x) => x.id == e.target.value)?.debt ?? 0
                      );
                    }}
                    value={props.values[ticketType.prop]}
                    sx={{ width: "100%", mb: 1 }}
                    style={textStyling}
                    size="small"
                  >
                    {tickets?.map((ticket: any, index: number) => (
                      <MenuItem
                        key={index}
                        value={ticket.id}
                        style={textStyling}
                      >
                        {ticket.referanceNo}
                      </MenuItem>
                    ))}
                  </Select>

                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Ödəniş növü
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={`paymentId`}
                    onChange={props.handleChange}
                    sx={{ width: "100%", mb: 1 }}
                    size="small"
                    style={textStyling}
                    placeholder="Seçin"
                    onOpen={() => getPayments()}
                    value={props.values.paymentId}
                  >
                    {payments?.map((p: any, i: number) => (
                      <MenuItem key={i} value={p.id} style={textStyling}>
                        {p.type}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={2}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Borc
                  </InputLabel>
                  <TextField
                    disabled
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: "100%", mb: 1 }}
                    name={"debt"}
                    value={props.values.debt}
                    style={textStyling}
                    type="number"
                    onChange={props.handleChange}
                    size="small"
                  />
                  {props.errors && props.touched.debt && (
                    <>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.debt}
                      </FormHelperText>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.Debt}
                      </FormHelperText>
                    </>
                  )}
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Ödənilən məbləğ
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: "100%", mb: 1 }}
                    name={"paidAmount"}
                    value={props.values.paidAmount}
                    style={textStyling}
                    type="number"
                    onChange={(e) => {
                      props.handleChange(e);
                      props.setFieldValue(
                        "restOfAmount",
                        props.values.debt - e.target.value
                      );
                    }}
                    size="small"
                  />
                  {props.errors && props.touched.paidAmount && (
                    <>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.paidAmount}
                      </FormHelperText>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.PaidAmount}
                      </FormHelperText>
                    </>
                  )}
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Qalıq məbləğ
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    disabled
                    sx={{ width: "100%", mb: 1 }}
                    name={"restOfAmount"}
                    value={props.values.debt - props.values.paidAmount}
                    style={textStyling}
                    type="number"
                    onChange={props.handleChange}
                    size="small"
                  />
                  {props.errors && props.touched.restOfAmount && (
                    <>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.restOfAmount}
                      </FormHelperText>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.RestOfAmount}
                      </FormHelperText>
                    </>
                  )}
                </Grid>
                <Grid item xs={2}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Qeyd
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: "100%", mb: 1 }}
                    name={"description"}
                    value={props.values.description}
                    style={textStyling}
                    onChange={props.handleChange}
                    size="small"
                  />
                  {props.errors && props.touched.description && (
                    <>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.description}
                      </FormHelperText>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.Description}
                      </FormHelperText>
                    </>
                  )}
                </Grid>
              </Grid>
            </Container>
            <footer style={footer}>
              <div>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={() => navigate(-1)}
                >
                  Geri qayıt
                </Button>
                <Button variant="contained" type="submit">
                  Təsdiqlə
                </Button>
              </div>
            </footer>
          </Form>
        )}
      />
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </>
  );
}
