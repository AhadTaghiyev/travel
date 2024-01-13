// @ts-nocheck
import { useState, useReducer, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IStore, ITourPackage, modalOptionType } from "../types";
import { apiService } from "../../../../server/apiServer";
// import { CorperativetourPackagesCreateSchema } from '../schema';
import { Autocomplete, CircularProgress, FormHelperText } from "@mui/material";
import _ from "lodash";
import dayjs from "dayjs";
import { TourPackageSchema } from "../schema";
import PageTitle from "../../../../components/pages/pageTitle";
import {
  TourPackageBreadCrumb,
  homeBreadCrumb,
  updateTourPackageBreadCrumb,
} from "../../../../routes/breadcrumbs";
import { CustomModal } from "../../../../components/layout/main/components/modal";
// modal contents

import { useGetters } from "../../../../hooks/useGetters";
import { useDynamicModal } from "../../../../hooks/useDynamicModal";
import { DatePicker } from "@mui/x-date-pickers";

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
  // width: '100%',
  padding: "12px 60px",
};

const initialValues: ITourPackage = {
  customerId: "",
  tourId: "",
  transferId: "",
  diningId: "",
  supplierId: "",
  personalId: "",
  paymentId: "",
  youngerCount: 0,
  childrenCount: 0,
  departureDateTime: new Date(),
  arrivalDateTime: new Date(),
  hotelName: "",
  roomName: "",
  reservationNumber: null,
  purchasePrice: 0,
  sellingPrice: 0,
  discount: 0,
  commonPrice: 0,
  paidAmount: 0,
  explanation: "",
  note: "",
  deadline: new Date(),
  isInsured: true,
  isCustomerPaid: false,
  isSupplierPaid: true,
};

export default function Index() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [tourPackage, setTourPackage] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchdata = async () => {
        const res = await apiService.get(`/TourPackage/GetById/${id!}`);
        for (const key in initialValues) {
          initialValues[key] = res.data.data[key];
        }

        initialValues.supplierId = res.data.data.supplier?.id;
        initialValues.customerId = res.data.data.customer?.id;
        initialValues.personalId = res.data.data.personal?.id;
        initialValues.paymentId = res.data.data.payment?.id;
        initialValues.tourId = res.data.data.tour?.id;
        initialValues.diningId = res.data.data.dining?.id;
        initialValues.transferId = res.data.data.transfer?.id;
        initialValues.arrivalDateTime = res.data.data.arrivalDateTime;
        initialValues.departureDateTime = res.data.data.departureDateTime;
        initialValues.deadline = res.data.data.deadline;
        initialValues.reservationNumber = res.data.data.reservationNumber;
        initialValues.isCustomerPaid = res.data.data.isCustomerPaid;
        initialValues.isSupplierPaid = res.data.data.isSupplierPaid;
        setTourPackage({ ...initialValues });
      };
      fetchdata().catch(console.error);
    } catch {
      console.error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  //========================
  // Data getting functions
  //========================
  const {
    state,
    dispatch,
    getCustomers,
    getSuppliers,
    getDinings,
    getPayments,
    getPersonals,
    getTours,
    getTransfers,
  } = useGetters();
  //=================
  // handle Modals
  //=================
  const { open, setOpen, modalOption, setModalOption, modalOptions } =
    useDynamicModal(getCustomers, getDinings, getPersonals, getTours);

  // ========================
  // Get data from api
  // ========================
  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        getCustomers();
        getSuppliers();
        getPayments();
        getPersonals();
        getTransfers();
        getDinings();
        getTours();
      } catch (err) {
        console.log("🚀 ~ file: index.tsx:156 ~ err:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  if (isLoading) {
    return (
      <CircularProgress
        sx={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }

  return (
    <>
      <Container maxWidth="xl">
        <PageTitle
          title="Tur Paket"
          breadcrumbs={[
            homeBreadCrumb,
            TourPackageBreadCrumb,
            updateTourPackageBreadCrumb,
          ]}
        />
      </Container>

      <Formik
        initialValues={tourPackage}
        //  validationSchema={TourPackageSchema}
        onSubmit={async (values, { setErrors }) => {
          try {
            const res = await apiService.put(
              `/TourPackage/UpdateTourPackage/${id}`,
              values
            );
            if (res?.status == 200) {
              toast.success("Odenis uğurla yaradıldı!");
              navigate("/panel/tourPackages");
            } else {
              let errors = res.data.errors;
              // convert to camelCase
              errors = _.mapKeys(errors, (value, key) => {
                return _.camelCase(key);
              });
              console.log(
                "🚀 ~ file: index.tsx:237 ~ onSubmit={ ~ errors:",
                errors
              );

              setErrors(errors);
            }
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Container maxWidth="xl">
              <Grid container spacing={2} style={{ marginBottom: "70px" }}>
                <Grid item md={2}>
                  {/* Otel adı */}
                  <InputLabel sx={{ mb: 1 }} style={textStyling}>
                    Otel adı
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: "100%", mb: 1 }}
                    name={`hotelName`}
                    value={props.values.hotelName}
                    style={textStyling}
                    onChange={props.handleChange}
                    error={!!props.errors && !!props.errors.hotelName}
                    helperText={!!props.errors && props.errors.hotelName}
                    size="small"
                  />
                  {/* Otaq adı */}
                  <InputLabel sx={{ mb: 1 }} style={textStyling}>
                    Otaq adı
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: "100%", mb: 1 }}
                    name={`roomName`}
                    value={props.values.roomName}
                    style={textStyling}
                    onChange={props.handleChange}
                    error={!!props.errors && !!props.errors.roomName}
                    helperText={!!props.errors && props.errors.roomName}
                    size="small"
                  />
                  {/* boyuk sayi  */}
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Böyük sayı
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: "100%", mb: 1 }}
                    style={textStyling}
                    name={`youngerCount`}
                    value={props.values.youngerCount}
                    onChange={props.handleChange}
                    error={!!props.errors && !!props.errors.youngerCount}
                    helperText={props.errors && props.errors.youngerCount}
                    type="number"
                    size="small"
                  />

                  {/* Usaq sayi */}
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Uşaq sayı
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: "100%", mb: 1 }}
                    style={textStyling}
                    name={`childrenCount`}
                    value={props.values.childrenCount}
                    error={!!props.errors && !!props.errors.childrenCount}
                    onChange={props.handleChange}
                    helperText={props.errors && props.errors.childrenCount}
                    type="number"
                    size="small"
                  />
                  {/* <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                defaultChecked={
                                  props.values.isCustomerPaid
                                }
                                value={props.values.isCustomerPaid}
                                name={`isCustomerPaid`}
                                onChange={props.handleChange}
                                error={!!props.errors && !!props.errors.isCustomerPaid}
                                helperText={!!props.errors && props.errors.isCustomerPaid}
    
                              />
                            }
                            label="Müştəri ödənişi"
                          /> */}
                </Grid>
                <Grid item md={2}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Deadline
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DatePicker
                        slotProps={{
                          textField: {
                            size: "small",
                            InputProps: { sx: { fontSize: "12px" } },
                          },
                        }}
                        label=""
                        sx={{ mb: 1 }}
                        value={dayjs(props.values.deadline)}
                        onChange={(newValue) => {
                          const event = {
                            target: {
                              name: `deadline`,
                              value: newValue.$d.toISOString(),
                            },
                          };
                          props.handleChange(event);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {props.errors && props.touched && props.touched.deadline && (
                    <>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.deadline}
                      </FormHelperText>
                    </>
                  )}
                  {/* Gediş tarixi */}

                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Gediş tarixi
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        slotProps={{
                          textField: {
                            size: "small",
                            InputProps: { sx: { fontSize: "12px" } },
                          },
                        }}
                        label=""
                        sx={{ mb: 1 }}
                        value={dayjs(props.values.departureDateTime)}
                        onChange={(newValue) => {
                          const event = {
                            target: {
                              name: `departureDateTime`,
                              value: newValue.$d.toISOString(),
                            },
                          };
                          props.handleChange(event);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {props.errors &&
                    props.touched &&
                    props.touched.departureDateTime && (
                      <>
                        <FormHelperText sx={{ color: "red" }}>
                          {props.errors.departureDateTime}
                        </FormHelperText>
                      </>
                    )}

                  {/* Dönüş tarixi */}

                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Dönüş tarixi
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        slotProps={{
                          textField: {
                            size: "small",
                            InputProps: { sx: { fontSize: "12px" } },
                          },
                        }}
                        value={dayjs(props.values.arrivalDateTime)}
                        label=""
                        sx={{ mb: 1 }}
                        onChange={(newValue) => {
                          const event = {
                            target: {
                              name: `arrivalDateTime`,
                              value: newValue.$d.toISOString(),
                            },
                          };
                          props.handleChange(event);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {props.errors &&
                    props.touched &&
                    props.touched.arrivalDateTime && (
                      <>
                        <FormHelperText sx={{ color: "red" }}>
                          {props.errors.arrivalDateTime}
                        </FormHelperText>
                      </>
                    )}
                  {/* Tour  */}
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={tourPackage && textStyling}
                  >
                    Turun adı
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    value={
                      state.tours.find(
                        (tour) => tour.id === props.values.tourId
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      const newId = newValue ? newValue.id : null;
                      props.handleChange({
                        target: {
                          name: `tourId`,
                          value: newId,
                        },
                      });
                    }}
                    getOptionLabel={(option) => option.name}
                    options={state.tours}
                    style={textStyling}
                    sx={{ width: "100%", mb: 1 }}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="" />}
                  />

                  {props.errors && props.touched && props.touched.tourId && (
                    <>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.tourId}
                      </FormHelperText>
                    </>
                  )}

                  <Button
                    variant="text"
                    sx={{ mb: 1 }}
                    style={textStyling}
                    onClick={() => {
                      setOpen(true);
                      setModalOption(
                        modalOptions.find((x) => x.field === "Tour")
                      );
                    }}
                  >
                    + Yeni Tur
                  </Button>
                </Grid>
                <Grid item md={2}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Təchizatçı
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    value={
                      state.suppliers.find(
                        (supplier) => supplier.id === props.values.supplierId
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      const newId = newValue ? newValue.id : null;
                      props.handleChange({
                        target: {
                          name: `supplierId`,
                          value: newId,
                        },
                      });
                    }}
                    getOptionLabel={(option) => option.name}
                    options={state.suppliers}
                    style={textStyling}
                    sx={{ width: "100%", mb: 1 }}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="" />}
                  />
                  {props.errors &&
                    props.touched &&
                    props.touched.supplierId && (
                      <>
                        <FormHelperText sx={{ color: "red" }}>
                          {props.errors.supplierId}
                        </FormHelperText>
                      </>
                    )}
                  {/* Rezervasiya nomresi */}
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ my: 1 }}
                    style={textStyling}
                  >
                    Rezervasiya nömrəsi
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    placeholder="Yazın"
                    type="text"
                    variant="outlined"
                    sx={{ width: "100%", mb: 1 }}
                    size="small"
                    style={textStyling}
                    onChange={props.handleChange}
                    name={`reservationNumber`}
                    value={props.values.reservationNumber}
                    error={
                      !!props.errors &&
                      !!props.touched.reservationNumber &&
                      !!props.errors.reservationNumber
                    }
                    helperText={
                      !!props.errors && props.errors.reservationNumber
                    }
                  />
                  {/* Is insured */}

                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={tourPackage && textStyling}
                  >
                    Sığorta
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={`isInsured`}
                    value={props.values.isInsured}
                    onChange={props.handleChange}
                    sx={{ width: "100%", mb: 1 }}
                    style={textStyling}
                    size="small"
                  >
                    <MenuItem value={true} style={textStyling}>
                      Var{" "}
                    </MenuItem>
                    <MenuItem value={false} style={textStyling}>
                      Yoxdur{" "}
                    </MenuItem>
                  </Select>
                  {props.errors && props.touched && props.touched.isInsured && (
                    <>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.isInsured}
                      </FormHelperText>
                    </>
                  )}

                  {/* Personal  */}
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={tourPackage && textStyling}
                  >
                    Personal
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={`personalId`}
                    value={props.values.personalId}
                    onChange={props.handleChange}
                    sx={{ width: "100%", mb: 1 }}
                    style={textStyling}
                    size="small"
                  >
                    {state.personals?.map((personal: any, index: number) => (
                      <MenuItem
                        key={index}
                        value={personal.id}
                        style={textStyling}
                      >
                        {personal.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                  {props.errors &&
                    props.touched &&
                    props.touched.personalId && (
                      <>
                        <FormHelperText sx={{ color: "red" }}>
                          {props.errors.personalId}
                        </FormHelperText>
                      </>
                    )}

                  <Button
                    variant="text"
                    sx={{ mb: 3 }}
                    style={textStyling}
                    onClick={() => {
                      setOpen(true);
                      setModalOption(
                        modalOptions.find((x) => x.field === "Personal")
                      );
                    }}
                  >
                    + Yeni Personal
                  </Button>
                </Grid>
                <Grid item md={2}>
                  <>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ mb: 1 }}
                      style={textStyling}
                    >
                      Alış qiyməti
                    </InputLabel>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      sx={{ width: "100%", mb: 1 }}
                      style={textStyling}
                      name={`purchasePrice`}
                      value={props.values.purchasePrice}
                      onChange={props.handleChange}
                      type="number"
                      size="small"
                      error={!!props.errors && !!props.errors.purchasePrice}
                      helperText={!!props.errors && props.errors.purchasePrice}
                    />
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ mb: 1 }}
                      style={textStyling}
                    >
                      Satış qiyməti
                    </InputLabel>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      sx={{ width: "100%", mb: 1 }}
                      style={textStyling}
                      name={`sellingPrice`}
                      value={props.values.sellingPrice}
                      onChange={props.handleChange}
                      type="number"
                      size="small"
                      error={!!props.errors && !!props.errors.sellingPrice}
                      helperText={!!props.errors && props.errors.sellingPrice}
                    />
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ mb: 1 }}
                      style={textStyling}
                    >
                      Endirim
                    </InputLabel>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      sx={{ width: "100%", mb: 1 }}
                      style={textStyling}
                      name={`discount`}
                      value={props.values.discount}
                      onChange={props.handleChange}
                      error={!!props.errors && !!props.errors.discount}
                      helperText={!!props.errors && props.errors.discount}
                      size="small"
                      type="number"
                    />

                    {props.errors &&
                      props.touched &&
                      props.touched.discount && (
                        <>
                          <FormHelperText sx={{ color: "red" }}>
                            {props.errors.discount}
                          </FormHelperText>
                        </>
                      )}

                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ mb: 1 }}
                      style={textStyling}
                    >
                      Ümumi satış qiyməti
                    </InputLabel>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      sx={{ width: "100%", mb: 1 }}
                      style={textStyling}
                      name={`commonPrice`}
                      // value={props.values.commonPrice}
                      value={
                        props.values?.sellingPrice - props.values?.discount
                      }
                      disabled
                      onChange={props.handleChange}
                      size="small"
                      type="number"
                      error={!!props.errors && !!props.errors.commonPrice}
                      helperText={!!props.errors && props.errors.commonPrice}
                    />
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ mb: 1 }}
                      style={textStyling}
                    >
                      Invoice Tarixi
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DatePicker
                          slotProps={{
                            textField: {
                              size: "small",
                              InputProps: { sx: { fontSize: "12px" } },
                            },
                          }}
                          label=""
                          sx={{ mb: 1 }}
                          value={dayjs(props.values.date)}
                          onChange={(newValue) => {
                            const event = {
                              target: {
                                name: `date`,
                                value: newValue.$d.toISOString(),
                              },
                            };
                            props.handleChange(event);
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    {props.errors && props.touched && props.touched.date && (
                      <>
                        <FormHelperText sx={{ color: "red" }}>
                          {props.errors.date}
                        </FormHelperText>
                      </>
                    )}
                  </>
                </Grid>
                <Grid item md={2}>
                  {/*Aciqlama */}

                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Açıqlama
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    placeholder="Yazın"
                    type="text"
                    variant="outlined"
                    sx={{ width: "100%", mb: 1 }}
                    size="small"
                    style={textStyling}
                    onChange={props.handleChange}
                    name={`explanation`}
                    value={props.values.explanation}
                    error={!!props.errors && !!props.errors.explanation}
                    helperText={!!props.errors && props.errors.explanation}
                  />

                  {/* Transfer vasitəsi */}
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={tourPackage && textStyling}
                  >
                    Transfer
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    value={
                      state.transfers.find(
                        (transfer) => transfer.id === props.values.transferId
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      const newId = newValue ? newValue.id : null;
                      props.handleChange({
                        target: {
                          name: `transferId`,
                          value: newId,
                        },
                      });
                    }}
                    getOptionLabel={(option) => option.type}
                    options={state.transfers}
                    style={textStyling}
                    sx={{ width: "100%", mb: 1 }}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="" />}
                  />

                  {props.errors &&
                    props.touched &&
                    props.touched.transferId && (
                      <>
                        <FormHelperText sx={{ color: "red" }}>
                          {props.errors.transferId}
                        </FormHelperText>
                      </>
                    )}
                  <Button
                    variant="text"
                    sx={{ mb: 0 }}
                    style={textStyling}
                    onClick={() => {
                      setOpen(true);
                      setModalOption(
                        modalOptions.find((x) => x.field === "Transfer")
                      );
                    }}
                  >
                    + Yeni Transfer
                  </Button>

                  {/* Qidalanma */}

                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={tourPackage && textStyling}
                  >
                    Qidalanma
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    value={
                      state.dinings.find(
                        (dining) => dining.id === props.values.diningId
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      const newId = newValue ? newValue.id : null;
                      props.handleChange({
                        target: {
                          name: `diningId`,
                          value: newId,
                        },
                      });
                    }}
                    getOptionLabel={(option) => option.type}
                    options={state.dinings}
                    style={textStyling}
                    sx={{ width: "100%", mb: 1 }}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="" />}
                  />

                  {props.errors && props.touched && props.touched.diningId && (
                    <>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.diningId}
                      </FormHelperText>
                    </>
                  )}
                  <Button
                    variant="text"
                    sx={{ mb: 0 }}
                    style={textStyling}
                    onClick={() => {
                      setOpen(true);
                      setModalOption(
                        modalOptions.find((x) => x.field === "Dining")
                      );
                    }}
                  >
                    + Yeni Qidalanma
                  </Button>

                  {/* Customer  */}
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={tourPackage && textStyling}
                  >
                    Müştəri
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    value={
                      state.customers.find(
                        (customer) => customer.id === props.values.customerId
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      const newId = newValue ? newValue.id : null;
                      props.handleChange({
                        target: {
                          name: `customerId`,
                          value: newId,
                        },
                      });
                    }}
                    getOptionLabel={(option) => option.fullName}
                    options={state.customers}
                    style={textStyling}
                    sx={{ width: "100%", mb: 1 }}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="" />}
                  />

                  {props.errors &&
                    props.touched &&
                    props.touched.customerId && (
                      <>
                        <FormHelperText sx={{ color: "red" }}>
                          {props.errors.customerId}
                        </FormHelperText>
                      </>
                    )}
                  <Button
                    variant="text"
                    sx={{ mb: 0 }}
                    style={textStyling}
                    onClick={() => {
                      setOpen(true);
                      setModalOption(
                        modalOptions.find((x) => x.field === "Customer")
                      );
                    }}
                  >
                    + Yeni müştəri
                  </Button>
                </Grid>
                <Grid item md={2}>
                  {/*  Ödənilən məbləğ */}

                  {props.values.isCustomerPaid && (
                    <>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ mb: 1 }}
                        style={textStyling}
                      >
                        Ödənilən məbləğ
                      </InputLabel>
                      <TextField
                        id="outlined-basic"
                        placeholder="Yazin"
                        type="number"
                        variant="outlined"
                        sx={{ width: "100%", mb: 1 }}
                        size="small"
                        style={textStyling}
                        onChange={props.handleChange}
                        name={`paidAmount`}
                        value={props.values.paidAmount}
                        error={!!props.errors && !!props.errors.paidAmount}
                        helperText={!!props.errors && props.errors.paidAmount}
                      />

                      {/* qaliq */}

                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ mb: 1 }}
                        style={textStyling}
                      >
                        Qalıq
                      </InputLabel>
                      <TextField
                        id="outlined-basic"
                        type="number"
                        variant="outlined"
                        sx={{ width: "100%", mb: 1 }}
                        size="small"
                        style={textStyling}
                        value={
                          props.values.commonPrice - props.values.paidAmount
                        }
                        disabled
                      />
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ mb: 1 }}
                        style={textStyling}
                      >
                        Ödəniş növü
                      </InputLabel>

                      <Autocomplete
                        disablePortal
                        value={
                          state.payments.find(
                            (payment) => payment.id === props.values.paymentId
                          ) || null
                        }
                        onChange={(event, newValue) => {
                          const newId = newValue ? newValue.id : null;
                          props.handleChange({
                            target: {
                              name: `paymentId`,
                              value: newId,
                            },
                          });
                        }}
                        getOptionLabel={(option) => option.type}
                        options={state.payments}
                        style={textStyling}
                        sx={{ width: "100%", mb: 1 }}
                        size="small"
                        renderInput={(params) => (
                          <TextField {...params} label="" />
                        )}
                      />
                      {props.errors &&
                        props.touched &&
                        props.touched.paymentId && (
                          <>
                            <FormHelperText sx={{ color: "red" }}>
                              {props.errors.paymentId}
                            </FormHelperText>
                            <FormHelperText sx={{ color: "red" }}>
                              {props.errors.paymentId}
                            </FormHelperText>
                          </>
                        )}
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ mb: 1 }}
                        style={textStyling}
                      >
                        Qeyd
                      </InputLabel>
                      <TextField
                        id="outlined-basic"
                        placeholder="Yazin"
                        variant="outlined"
                        sx={{ width: "100%", mb: 1 }}
                        size="small"
                        style={textStyling}
                        onChange={props.handleChange}
                        name={`note`}
                        value={props.values.note}
                        error={!!props.errors && !!props.errors.note}
                        helperText={!!props.errors && props.errors.note}
                      />
                    </>
                  )}
                </Grid>
              </Grid>
            </Container>
            <footer style={footer}>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      defaultChecked={props.values.isSupplierPaid}
                      value={props.values.isSupplierPaid}
                      name={`isSupplierPaid`}
                      onChange={props.handleChange}
                    />
                  }
                  label="Təchizatçıya ödəniş"
                />
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

      {modalOption && (
        <CustomModal open={open} setOpen={setOpen}>
          {" "}
          <modalOption.component />{" "}
        </CustomModal>
      )}
    </>
  );
}
