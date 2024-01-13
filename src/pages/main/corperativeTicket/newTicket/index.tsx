// @ts-nocheck
import { useState, Fragment } from 'react';
import { FieldArray, Formik, Form } from 'formik';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ICorperativeTicket, InvoiceDirection } from '../types';
import { apiService } from '../../../../server/apiServer';
import { CorperativeTicketsCreateSchema } from '../schema';
import { FormHelperText } from '@mui/material';
import PageTitle from '../../../../components/pages/pageTitle';
import Autocomplete from '@mui/material/Autocomplete';
import {
  CoorperativeTicketBreadCrumb,
  homeBreadCrumb,
  newCoorperativeTicketBreadCrumb,
} from '../../../../routes/breadcrumbs';
import { useDynamicModal } from '../../../../hooks/useDynamicModal';
import { CustomModal } from '../../../../components/layout/main/components/modal';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const textStyling = {
  lineHeight: '16px',
  fontWeight: '400',
  fontSize: '12px',
};

const footer = {
  borderRadius: '2px',
  background: '#F8F9FB',
  display: 'flex',
  justifyContent: 'end',
  // width: '100%',
  padding: '12px 60px',
};

const invoiceDirection: InvoiceDirection = {
  direction: '',
  flightDate: null,
};

const initialValues: ICorperativeTicket = {
  ticketNo: '',
  direction: '',
  purchasePrice: 0,
  sellingPrice: 0,
  commission: 0,
  statutoryPrice: 0,
  fee: 0,
  paidAmount: 0,
  note: '',
  isSupplierPaid: false,
  isCustomerPaid: false,
  airWayId: '',
  customerId: '',
  supplierId: '',
  paymentId: '',
  date:null,
  deadline: null,
  invoiceDirections: [invoiceDirection],
};

export default function Index() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [airways, setAirways] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const getCustomers = async () => {
    const custmersFromApi = await apiService.get('Customer/GetAll/1');

    setCustomers(custmersFromApi.data.items.map((x)=> ({label: x.fullName, value: x.id})));
  };

  const getSuppliers = async () => {
    const suppliersFromApi = await apiService.get('Supplier/GetAll/1');
    setSuppliers(suppliersFromApi.data.items.map((x)=> ({label: x.name, value: x.id})));
  };

  const getAirways = async () => {
    const airwaysFromApi = await apiService.get('AirWay/GetAll/1');
    setAirways(airwaysFromApi.data.items.map((x)=> ({label: x.name, value: x.id})));
  };

  const getPayments = async () => {
    const personalFromApi = await apiService.get('Payment/GetAll/1');
    setPayments(personalFromApi.data.items);
  };
  const [isSupplierPaid, setIsSupplierPaid] = useState(false);

   const {open, setOpen, modalOption, setModalOption, modalOptions} = useDynamicModal(getCustomers)

  return (
    <>
      <Container maxWidth="xl">
        {/* <PageTitle
          title="Korperativ bilet"
          breadcrumbs={[
            homeBreadCrumb,
            CoorperativeTicketBreadCrumb,
            newCoorperativeTicketBreadCrumb,
          ]}
        /> */}
      </Container>
      <Formik
        initialValues={{ tickets: [initialValues] }}
        // validationSchema={CorperativeTicketsCreateSchema}
        onSubmit={async (values, { setErrors }) => {
          values.tickets.map((item) => (item.isSupplierPaid = isSupplierPaid
            
         ));

          try {
            const res = await apiService.post(
              `/CooperativeTicket/CreateCooperativeTicket`,
              values.tickets
            );
            if (res?.status == 200) {
              toast.success('Korporativ bilet uğurla yaradıldı!');
              const guids = res?.data.data.join(',');
              navigate({
                pathname: `/panel/corperativeTicket/report`,
                search: `?tickets=${guids}`
              });
            } else {
              setErrors({ tickets: res.data.errors });
            }
          } catch (err) {
            console.error(err);
          }
        }}
        render={(props) => (
          <Form style={{backgroundColor:"white"}}>
            <FieldArray
              name="tickets"
              render={(arrayHelpers) => (
                <div>
                  <Container maxWidth="xl">
                    <Button
                      variant="contained"
                      sx={{ mb: 3, mr: 3 }}
                      style={textStyling}
                      onClick={() => {
                          setIsDisabled(true)
                        arrayHelpers.push(initialValues)
                      }}
                    >
                      + Yeni Sərnişin
                    </Button>
                  </Container>
                  {props.values.tickets.map((ticket, index) => (
                    <Container maxWidth="xl" key={index}>
                      {index !== 0 && (
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ mb: 3 }}
                          style={textStyling}
                          onClick={() => arrayHelpers.remove([index])}
                        >
                          - Sil
                        </Button>
                      )}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: '70px' }}
                      >
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
                            id="combo-box-demo"
                            value={suppliers.find(supplier => supplier.value === props.values.tickets[index].supplierId) || null}
                            onChange={(event, newValue) => {
                              const newId = newValue ? newValue.value : null;
                              props.handleChange({
                                target: {
                                  name: `tickets[${index}].supplierId`,
                                  value: newId
                                }
                              });
                            }}
                            onOpen={() => getSuppliers()}
                            options={suppliers}
                            style={textStyling}
                            sx={{ width: '100%', mb: 1}}
                            size="small"
                            renderInput={(params) => <TextField {...params} label=""/>}
/>
                          {props.errors.tickets &&
                            props.touched.tickets &&
                            props.touched.tickets[index].supplierId && (
                              <>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[index]?.supplierId}
                                </FormHelperText>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {
                                    props.errors.tickets[
                                      `x[${index}].SupplierId`
                                    ]
                                  }
                                </FormHelperText>
                              </>
                            )}
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Hava yolu adı
                          </InputLabel>
                          <Autocomplete
  disablePortal
  id="combo-box-demo"
  name={`tickets[${index}].airWayId`}
  value={airways.find(airway => airway.value === props.values.tickets[index].airWayId) || null}
  onChange={(event, newValue) => {
    const newId = newValue ? newValue.value : null;
    props.handleChange({
      target: {
        name: `tickets[${index}].airWayId`,
        value: newId
      }
    });
  }}
  onOpen={() => getAirways()}
  options={airways}
  style={textStyling}
  sx={{ width: '100%', mb: 1}}
  size="small"
  renderInput={(params) => <TextField {...params} label=""/>}
/>

                          {props.errors.tickets &&
                            props.touched.tickets &&
                            props.touched.tickets[index].airWayId && (
                              <>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[index]?.airWayId}
                                </FormHelperText>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[`x[${index}].AirWayId`]}
                                </FormHelperText>
                              </>
                            )}
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={ticket && textStyling}
                          >
                            Müştəri
                          </InputLabel>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            disabled={index=== 0 ? false : true }
                            value={customers.find(customer => customer.value === props.values.tickets[0].customerId) || null}
                            onChange={(event, newValue) => {
                              const newId = newValue ? newValue.value : null;
                              props.handleChange({
                                target: {
                                  name: `tickets[${index}].customerId`,
                                  value: newId
                                }
                              });
                            }}
                            onOpen={() => getCustomers()}
                            options={customers}
                            style={textStyling}
                            sx={{ width: '100%', mb: 1}}
                            size="small"
                            renderInput={(params) => <TextField {...params} label=""/>}
                          />
                          {props.errors.tickets &&
                            props.touched.tickets &&
                            props.touched.tickets[index].customerId && (
                              <>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[index]?.customerId}
                                </FormHelperText>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {
                                    props.errors.tickets[
                                      `x[${index}].CustomerId`
                                    ]
                                  }
                                </FormHelperText>
                              </>
                            )}
                      
                                <Button
                                  variant="text"
                                  sx={{ mb: 1 }}
                                  style={textStyling}
                                  onClick={()=>{
                                    setOpen(true)
                                    setModalOption(modalOptions.find(x=> x.field === "Customer"))}
                                  }
                                >
                                  + Yeni müştəri
                                </Button>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                defaultChecked={
                                  props.values.tickets[index].isCustomerPaid
                                }
                                value={
                                  props.values.tickets[index].isCustomerPaid
                                }
                                name={`tickets[${index}].isCustomerPaid`}
                                onChange={props.handleChange}
                              />
                            }
                            label="Müştəri ödənişi"
                          />
                        </Grid>
                        <Grid item md={2}>
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Bilet nömrəsi
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '100%', mb: 1 }}
                            name={`tickets[${index}].ticketNo`}
                            value={props.values.tickets[index].ticketNo}
                            style={textStyling}
                            onChange={props.handleChange}
                            size="small"
                          />
                          {props.errors.tickets &&
                            props.touched.tickets &&
                            props.touched.tickets[index].ticketNo && (
                              <>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[index]?.ticketNo}
                                </FormHelperText>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[`x[${index}].TicketNo`]}
                                </FormHelperText>
                              </>
                            )}

                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Rüsum
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            name={`tickets[${index}].fee`}
                            value={props.values.tickets[index].fee}
                            onChange={props.handleChange}
                            type="number"
                            size="small"
                          />
                          {props.errors.tickets &&
                            props.touched.tickets &&
                            props.touched.tickets[index].fee && (
                              <>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[index]?.fee}
                                </FormHelperText>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[`x[${index}].Fee`]}
                                </FormHelperText>
                              </>
                            )}
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Deadline
                          </InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                            <DatePicker
                               slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
                                sx={{ width: '100%', mb: 1 }}
                                label=""
                                disabled={index === 0 ? false : true }
                                value={dayjs(props.values.tickets[0].deadline)} 
                                onChange={(newValue) => {
                                  const event = {
                                    target: {
                                      name: `tickets[${index}].deadline`,
                                      value: index === 0 ? newValue : props.values.tickets[0].deadline,
                                    },
                                  };
                                  props.handleChange(event);
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                          {props.errors.tickets &&
                            props.touched.tickets &&
                            props.touched.tickets[index].deadline && (
                              <>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[index]?.deadline}
                                </FormHelperText>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[`x[${index}].Deadline`]}
                                </FormHelperText>
                              </>
                            )}
                             <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                       
                          >
                            Tarix
                          </InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                            <DatePicker
                               slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
                                sx={{ width: '100%', mb: 1 }}
                                label=""
                                value={dayjs(props.values.tickets[0].date)}
                                disabled={index === 0 ? false : true }
                                onChange={(newValue) => {
                                  const event = {
                                    target: {
                                      name: `tickets[${index}].date`,
                                      value: index === 0 ? newValue : props.values.tickets[0].date,
                                    },
                                  };
                                  props.handleChange(event);
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                          {props.errors.tickets &&
                            props.touched.tickets &&
                            props.touched.tickets[index].date && (
                              <>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[index]?.date}
                                </FormHelperText>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[`x[${index}].date`]}
                                </FormHelperText>
                              </>
                            )}
                        </Grid>
                        <Grid item md={2}>
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
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            name={`tickets[${index}].purchasePrice`}
                            value={props.values.tickets[index].purchasePrice}
                            onChange={props.handleChange}
                            type="number"
                            size="small"
                          />
                          {props.errors.tickets &&
                            props.touched.tickets &&
                            props.touched.tickets[index].purchasePrice && (
                              <>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[index]?.purchasePrice}
                                </FormHelperText>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {
                                    props.errors.tickets[
                                      `x[${index}].PurchasePrice`
                                    ]
                                  }
                                </FormHelperText>
                              </>
                            )}

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
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            name={`tickets[${index}].sellingPrice`}
                            value={props.values.tickets[index].sellingPrice}
                            onChange={props.handleChange}
                            type="number"
                            size="small"
                          />
                          {props.errors.tickets &&
                            props.touched.tickets &&
                            props.touched.tickets[index].sellingPrice && (
                              <>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[index]?.sellingPrice}
                                </FormHelperText>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {
                                    props.errors.tickets[
                                      `x[${index}].SellingPrice`
                                    ]
                                  }
                                </FormHelperText>
                              </>
                            )}

                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Komissiya
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '100%', mb: 3 }}
                            style={textStyling}
                            name={`tickets[${index}].commission`}
                            value={props.values.tickets[index].commission}
                            onChange={props.handleChange}
                            size="small"
                            type="number"
                          />
                          {props.errors.tickets &&
                            props.touched.tickets &&
                            props.touched.tickets[index].commission && (
                              <>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {props.errors.tickets[index]?.commission}
                                </FormHelperText>
                                <FormHelperText sx={{ color: 'red' }}>
                                  {
                                    props.errors.tickets[
                                      `x[${index}].Commission`
                                    ]
                                  }
                                </FormHelperText>
                              </>
                            )}
                        </Grid>
                        <Grid item md={2}>
                          <>
                            <InputLabel
                              id="demo-simple-select-label"
                              sx={{ mb: 1 }}
                              style={textStyling}
                            >
                              Qanuni qiymət
                            </InputLabel>
                            <TextField
                              id="outlined-basic"
                              placeholder="Yazin"
                              type="number"
                              variant="outlined"
                              sx={{ width: '100%', mb: 1 }}
                              size="small"
                              style={textStyling}
                              onChange={props.handleChange}
                              name={`tickets[${index}].statutoryPrice`}
                              value={props.values.tickets[index].statutoryPrice}
                            />

                            {props.values.tickets[index].invoiceDirections?.map(
                              (elem, key) => (
                                <Fragment key={key}>
                                  <InputLabel
                                    id="demo-simple-select-label"
                                    sx={{ mb: 1 }}
                                    style={textStyling}
                                  >
                                    İstiqamət
                                  </InputLabel>
                                  <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    sx={{ width: '100%', mb: 1 }}
                                    name={`tickets[${index}].invoiceDirections[${key}].direction`}
                                    value={
                                      props.values.tickets[index]
                                        ?.invoiceDirections[key]?.direction
                                    }
                                    style={textStyling}
                                    onChange={props.handleChange}
                                    size="small"
                                  />
                                  {/* {props.errors.tickets &&
                                    props.touched.tickets &&
                                    props.touched.tickets[index]
                                      ?.invoiceDirections[key]?.direction && (
                                      <>
                                        <FormHelperText sx={{ color: 'red' }}>
                                          {
                                            props.errors.tickets[index]
                                              ?.invoiceDirections[key]
                                              ?.direction
                                          }
                                        </FormHelperText>
                                        <FormHelperText sx={{ color: 'red' }}>
                                          {
                                            props.errors.tickets[
                                              `[${index}].invoiceDirections[${key}].direction`
                                            ]
                                          }
                                        </FormHelperText>
                                      </>
                                    )} */}
                                  <InputLabel
                                    id="demo-simple-select-label"
                                    sx={{ mb: 1 }}
                                    style={textStyling}
                                  >
                                    Uçuş tarixi
                                  </InputLabel>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DemoContainer
                                      components={['DateTimePicker']}
                                    >
                                      <DateTimePicker
                                        slotProps={{
                                          textField: { size: 'small' },
                                        }}
                                        label=""
                                        onChange={(newValue) => {
                                          const event = {
                                            target: {
                                              name: `tickets[${index}].invoiceDirections[${key}].flightDate`,
                                              value: newValue,
                                            },
                                          };
                                          props.handleChange(event);
                                        }}
                                      />
                                    </DemoContainer>
                                  </LocalizationProvider>
                                  {/* {props.errors.tickets &&
                                    props.touched.tickets &&
                                    props.touched.tickets[index]
                                      ?.invoiceDirections[key]?.flightDate && (
                                      <>
                                        <FormHelperText sx={{ color: 'red' }}>
                                          {
                                            props.errors.tickets[index]
                                              ?.invoiceDirections[key]
                                              ?.flightDate
                                          }
                                        </FormHelperText>
                                        <FormHelperText sx={{ color: 'red' }}>
                                          {
                                            props.errors.tickets[
                                              `[${index}].invoiceDirections[${key}].flightDate`
                                            ]
                                          }
                                        </FormHelperText>
                                      </>
                                    )} */}
                                  {key !== 0 && (
                                    <Button
                                      color="error"
                                      onClick={() => {
                                        props.values.tickets[
                                          index
                                        ]?.invoiceDirections?.splice(key, 1);
                                        arrayHelpers.replace(
                                          index,
                                          props.values.tickets[index]
                                        );
                                      }}
                                    >
                                      - İstiqaməti sil
                                    </Button>
                                  )}
                                </Fragment>
                              )
                            )}
                            <Button
                              onClick={() => {
                                props.values.tickets[
                                  index
                                ]?.invoiceDirections?.push(invoiceDirection);
                                arrayHelpers.replace(
                                  index,
                                  props.values.tickets[index]
                                );
                              }}
                            >
                              + Yeni İstiqamət
                            </Button>
                          </>
                        </Grid>

                        <Grid item md={2}>
                          {props.values.tickets[index]?.isCustomerPaid && (
                            <>
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
                                name={`tickets[${index}].paymentId`}
                                onChange={props.handleChange}
                                sx={{ width: '100%', mb: 1 }}
                                size="small"
                                style={textStyling}
                                placeholder="Seçin"
                                onOpen={() => getPayments()}
                                value={props.values.tickets[index].paymentId}
                              >
                                {payments?.map((p: any, i: number) => (
                                  <MenuItem
                                    key={i}
                                    value={p.id}
                                    style={textStyling}
                                  >
                                    {p.type}
                                  </MenuItem>
                                ))}
                              </Select>
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
                                sx={{ width: '100%', mb: 1 }}
                                size="small"
                                style={textStyling}
                                onChange={props.handleChange}
                                name={`tickets[${index}].paidAmount`}
                                value={props.values.tickets[index].paidAmount}
                              />
                               <InputLabel
                                id="demo-simple-select-label"
                                sx={{ mb: 1 }}
                                style={textStyling}
                              >
                                Qalıq məbləğ
                              </InputLabel>
                              <TextField
                                id="outlined-basic"
                                disabled
                                placeholder="Avtomatik"
                                variant="outlined"
                                sx={{ width: '100%', mb: 1 }}
                                size="small"
                                style={textStyling}
                                value={
                                  props.values.tickets[index]?.sellingPrice! -
                                  props.values.tickets[index]?.paidAmount!
                                }
                              />
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
                                sx={{ width: '100%', mb: 1 }}
                                size="small"
                                style={textStyling}
                                onChange={props.handleChange}
                                name={`tickets[${index}].note`}
                                value={props.values.tickets[index].note}
                              />
                            </>
                          )}
                        </Grid>
                      </Grid>
                    </Container>
                  ))}
                </div>
              )}
            />
            <footer style={footer}>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      defaultChecked={isSupplierPaid}
                      value={isSupplierPaid}
                      onChange={() => setIsSupplierPaid(e.target.value)}
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
      />
        {modalOption && <CustomModal open={open} setOpen={setOpen} > <modalOption.component/> </CustomModal>} 

      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </>
  );
}
