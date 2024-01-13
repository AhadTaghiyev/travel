// @ts-nocheck

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Breadcrumbs,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { useState, useReducer, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import { Form, Link, useNavigate } from "react-router-dom";
import { apiService } from "../../../../server/apiServer";
import { IStore, Option, RefundType } from "../types";
import { CircularProgress } from "@mui/material";
import { AiOutlineRight } from "react-icons/ai";
import { RefundSchema } from "../refundSchema";
import _ from "lodash";

const breadcrumbs = [
  <Link key="1" to="/panel" className="pageLink link">
    Ana səhifə
  </Link>,
  <Link key="1" to="/panel/tourPackages" className="pageLink link">
    Geri Qaytarmalar
  </Link>,
  <Link key="1" to="/panel/tourPackages" className="currentPageLink link">
    Yeni geri qaytarma yarat
  </Link>,
];
const textStyling = {
  lineHeight: "16px",
  fontWeight: "400",
  fontSize: "12px",
  width: "100%",
};

const footer = {
  borderRadius: "2px",
  background: "#F8F9FB",
  display: "flex",
  justifyContent: "end",
  // width: '100%',
  padding: "12px 60px",
};

const initialValues: RefundType = {
  planeTicketId: null,
  cooperativeTicketId: null,
  individualTourId: null,
  tourPackageId: null,
  otherServiceTicketId: null,
  depositId: null,
  amount: 0,
  paidToCustomer: 0,
  forfeit: 0,
};

const reducerActions = {
  planeTickets: "SET_planeTickets",
  cooperativeTickets: "SET_cooperativeTickets",
  individualTours: "SET_individualTours",
  tourPackages: "SET_tourPackages",
  deposits: "SET_deposits",
  otherServiceTickets: "SET_otherServiceTickets",
};

const initialState: IStore = {
  planeTickets: [],
  cooperativeTickets: [],
  individualTours: [],
  tourPackages: [],
  otherServiceTickets: [],
  deposits: [],
};
const reducer = (state: IStore, action: { type: string; payload: any }) => {
  switch (action.type) {
    case reducerActions.planeTickets:
      return { ...state, planeTickets: action.payload };
    case reducerActions.cooperativeTickets:
      return { ...state, cooperativeTickets: action.payload };
    case reducerActions.individualTours:
      return { ...state, individualTours: action.payload };
    case reducerActions.tourPackages:
      return { ...state, tourPackages: action.payload };
    case reducerActions.otherServiceTickets:
      return { ...state, otherServiceTickets: action.payload };

    case reducerActions.deposits:
      return { ...state, deposits: action.payload };

    default:
      return state;
  }
};

export default function CreatePopup() {
  //======================
  // Get data from api
  //======================

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  //======================
  //  get data functions
  //======================

  const getPlaneTickets = async () => {
    const planeTicketsFromApi = await apiService.get("PlaneTickets/GetAll/1");
    dispatch({
      type: reducerActions.planeTickets,
      payload: planeTicketsFromApi.data.items,
    });
  };

  const getCoorperativeTickets = async () => {
    const cooperativeTicketsFromApi = await apiService.get(
      "CooperativeTicket/GetAll/1"
    );
    dispatch({
      type: reducerActions.cooperativeTickets,
      payload: cooperativeTicketsFromApi.data.items,
    });
  };

  const getIndividualTours = async () => {
    const individualToursFromApi = await apiService.get(
      "IndividualTour/GetAll/1"
    );
    dispatch({
      type: reducerActions.individualTours,
      payload: individualToursFromApi.data.items,
    });
  };

  const getOtherServices = async () => {
    const otherServiceTicketsFromApi = await apiService.get(
      "otherServiceTicket/GetAll/1"
    );
    dispatch({
      type: reducerActions.otherServiceTickets,
      payload: otherServiceTicketsFromApi.data.items,
    });
  };

  const getTourPackages = async () => {
    const tourPackagesFromApi = await apiService.get("tourPackage/GetAll/1");
    dispatch({
      type: reducerActions.tourPackages,
      payload: tourPackagesFromApi.data.items,
    });
  };

  const getDeposits = async () => {
    const depositsFromApi = await apiService.get("deposit/GetAll/1");
    dispatch({
      type: reducerActions.deposits,
      payload: depositsFromApi.data.items,
    });
  };

  //======================
  // handle user select
  // Istifadeci bir option select etdiyində [handle user select] useEffect calisir
  //      ve hemin optionun getData metodu calisir
  // yeni bir fayla cixarmaq olar seliqeli olsun deye
  //======================

  const options: Array<Option> = [
    {
      id: 1, // manual id
      text: "Avia Bilet", // input label
      name: "planeTicketId", // input name
      stateName: "planeTickets", // reducer state name
      propToShow: "referanceNo", // property to show when looping state
      getData: getPlaneTickets, // get data from api
    },
    {
      id: 2,
      text: "Korperativ Bilet",
      name: "cooperativeTicketId",
      stateName: "cooperativeTickets",
      propToShow: "referanceNo",
      getData: getCoorperativeTickets,
    },
    {
      id: 3,
      text: "Individual Tur Bilet",
      name: "individualTourId",
      stateName: "individualTours",
      propToShow: "referanceNumber",
      getData: getIndividualTours,
    },
    {
      id: 4,
      text: "Tur Paket Bilet",
      name: "tourPackageId",
      stateName: "tourPackages",
      propToShow: "referanceNumber",
      getData: getTourPackages,
    },
    {
      id: 5,
      text: "Depozit",
      name: "depositId",
      stateName: "deposits",
      propToShow: "customer.fullName",
      getData: getDeposits,
    },
    {
      id: 6,
      text: "Digət xidmət",
      name: "otherServiceTicketId",
      stateName: "otherServiceTickets",
      propToShow: "referanceNo",
      getData: getOtherServices,
    },
  ];

  //======================
  // handle user select
  //======================

  const [option, setOption] = useState<Option>(options[0]);

  useEffect(() => {
    setIsLoading(true);
    try {
      option.getData();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [option]);

  //======================
  // Handle form submit
  //======================

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <CircularProgress
        sx={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }

  return (
    <>
      {/* <Container maxWidth="xl">
                <h3 className="page-title">Geri Qaytarmalar</h3>
                <Breadcrumbs
                    separator={<AiOutlineRight fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ mb: 1 }}
                >
                    {breadcrumbs}
                </Breadcrumbs>
                <Divider sx={{ mb: 3 }} />
            </Container> */}

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={RefundSchema}
        onSubmit={async (values, { setErrors }) => {
          try {
            const res = await apiService.post(`/Refund/CreateRefund`, {
              ...values,
              amount: state?.[option.stateName].find(
                (x) => x.id === values[option.name]
              )?.paidAmount,
              forfeit:
                state?.[option.stateName].find(
                  (x) => x.id === values[option.name]
                )?.paidAmount - values.paidToCustomer,
            });
            if (res?.status == 200) {
              toast.success("Geri qaytarma uğurla yaradıldı!");
              navigate("/panel/refunds");
            } else {
              let errors = res.data.errors;
              // convert to camelCase
              errors = _.mapKeys(errors, (value, key) => {
                return _.camelCase(key);
              });
              setErrors(errors);
            }
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {(props) => (
          <Form
            style={{ backgroundColor: "white" }}
            onSubmit={props.handleSubmit}
          >
            <Container maxWidth="xl">
              <Grid container spacing={2} style={{ marginBottom: "70px" }}>
                <Grid item md={3}>
                  {/* Bilet novu */}
                  {/* <FormControl fullWidth> */}
                  <InputLabel id="demo-simple-select-label" style={textStyling}>
                    Bilet növü
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={option.id}
                    style={textStyling}
                    sx={{ width: "100%", mb: 1 }}
                    onChange={(e) => {
                      const option = options.find(
                        (x) => x.id === e.target.value
                      );
                      option && setOption(option);
                    }}
                  >
                    {options.map((item) => (
                      <MenuItem
                        key={item.id}
                        style={textStyling}
                        value={item.id}
                      >
                        {item.text}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* </FormControl> */}

                  {/* Miqdar*/}
                  <Box>
                    <InputLabel
                      id="demo-simple-select-label"
                      style={textStyling}
                    >
                      Miqdar
                    </InputLabel>
                    <TextField
                      disabled
                      id="outlined-basic"
                      variant="outlined"
                      sx={{ width: "100%", mb: 1 }}
                      style={textStyling}
                      name={`amount`}
                      value={
                        state?.[option.stateName].find(
                          (x) => x.id === props.values[option.name]
                        )?.paidAmount
                      }
                      onChange={props.handleChange}
                      error={!!props.errors && !!props.errors?.amount}
                      helperText={props.errors && props.errors?.amount}
                      type="number"
                      size="small"
                    />
                  </Box>

                  {/* tutulma*/}
                  <Box>
                    <InputLabel
                      id="demo-simple-select-label"
                      style={textStyling}
                    >
                      Cərimə
                    </InputLabel>
                    <TextField
                      disabled
                      id="outlined-basic"
                      variant="outlined"
                      sx={{ width: "100%", mb: 1 }}
                      style={textStyling}
                      name={`forfeit`}
                      value={
                        state?.[option.stateName].find(
                          (x) => x.id === props.values[option.name]
                        )?.paidAmount - props.values.paidToCustomer
                      }
                      onChange={props.handleChange}
                      error={!!props.errors && !!props.errors?.forfeit}
                      helperText={props.errors && props.errors?.forfeit}
                      type="number"
                      size="small"
                    />
                  </Box>
                </Grid>

                <Grid item md={3}>
                  {/* Referans nomresi dinamik field */}
                  {/* <FormControl fullWidth> */}
                  <InputLabel id="demo-simple-select-label" style={textStyling}>
                    {option.text} Referans
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.values[option.name]}
                    label={`${option.text}  Referans `}
                    sx={{ width: "100%", mb: 1 }}
                    style={textStyling}
                    onChange={(e) => {
                      props.resetForm(); // set other values null *REQUIRED
                      props.setFieldValue(option.name, e.target.value);
                      props.handleChange(e);
                    }}
                  >
                    {state?.[option.stateName]?.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        style={textStyling}
                      >
                        {_.get(item, option.propToShow)}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* </FormControl> */}

                  {/* odənilən məbləğ */}
                  <Box>
                    <InputLabel
                      id="demo-simple-select-label"
                      style={textStyling}
                    >
                      Ödənilən məbləğ
                    </InputLabel>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      style={textStyling}
                      name={`paidToCustomer`}
                      value={props.values.paidToCustomer}
                      onChange={props.handleChange}
                      error={!!props.errors && !!props.errors?.paidToCustomer}
                      helperText={props.errors && props.errors?.paidToCustomer}
                      type="number"
                      size="small"
                    />
                  </Box>
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
      </Formik>

      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </>
  );
}
