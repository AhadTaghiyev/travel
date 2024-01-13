// @ts-nocheck
import { useEffect, useState,Fragment,CSSProperties } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import Divider from '@mui/material/Divider';
import {Formik, Form } from 'formik';
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
import { apiService } from '../../../../server/apiServer';
import { FormHelperText } from '@mui/material';
import dayjs from 'dayjs';
// import {CorperativeTicketUpdateSchema} from '../schema';
import { ICorperativeTicket } from '../types';
import PageTitle from '../../../../components/pages/pageTitle';
import { CoorperativeTicketBreadCrumb, homeBreadCrumb, updateAgreementBreadCrumb, updateCoorperativeTicketBreadCrumb } from '../../../../routes/breadcrumbs';
import { useDynamicModal } from '../../../../hooks/useDynamicModal';
import { CustomModal } from '../../../../components/layout/main/components/modal';
import Autocomplete from '@mui/material/Autocomplete';
import ClipLoader from "react-spinners/ClipLoader";
import { DatePicker } from '@mui/x-date-pickers';
const textStyling = {
  lineHeight: '16px',
  fontWeight: '400',
  fontSize: '12px',
};
const override: CSSProperties = {
  display: "block",
  margin: "auto",
  borderColor: "gray",
};

const footer = {
  borderRadius: '2px',
  background: '#F8F9FB',
  display: 'flex',
  justifyContent: 'end',
  padding: '12px 60px',
};
const invoiceDirection: InvoiceDirection = {
  direction: '',
  flightDate: new Date(),
};

const initialValues : ICorperativeTicket = {
    ticketNo: '',
    direction: '',
    purchasePrice: 0,
    sellingPrice: 0,
    commission: 0,
    statutoryPrice: 0,
    fee: 0,
    flightDate: new Date(),
    paidAmount: 0,
    note: '',
    deadline: new Date(),
    isSupplierPaid: false,
    isCustomerPaid: false,
    airWayId: '',
    customerId: '',
    supplierId: '',
    paymentId: '',
    invoiceDirections: [invoiceDirection],
    debt:0
};

export default function Index() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState(initialValues);
  const [loading,setLoading]=useState(true)
  let [color, setColor] = useState("#ffffff");
  useEffect(() => {
    try {
      const fetchdata = async () => {
        const res = await apiService.get(`/CooperativeTicket/GetById/${id!}`);
        for(let key in initialValues){
          initialValues[key] = res.data.data[key];
        }
        initialValues.supplierId = res.data.data.supplier?.id;
        initialValues.customerId = res.data.data.customer?.id;
        initialValues.paymentId = res.data.data.payment?.id;
        initialValues.airWayId = res.data.data.airWay?.id;
  

        setTicket({...initialValues});
       await getAirways();
       await  getCustomers();
       await getPayments();
       await getSuppliers();
        setLoading(false)
      };
      fetchdata().catch(console.error);
    } catch {
      console.error;
    }
  }, []);

  const [customers, setCustomers] = useState([]);
  const [airways, setAirways] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [payments, setPayments] = useState([]);

  const getCustomers = async () => {
    const custmersFromApi = await apiService.get('Customer/GetAll/1');
    setCustomers(custmersFromApi.data.items);
  };

  const getSuppliers = async () => {
    const suppliersFromApi = await apiService.get('Supplier/GetAll/1');
    setSuppliers(suppliersFromApi.data.items);
  };

  const getAirways = async () => {
    const airwaysFromApi = await apiService.get('AirWay/GetAll/1');
    setAirways(airwaysFromApi.data.items);
  };

  const getPayments = async () => {
    const personalFromApi = await apiService.get('Payment/GetAll/1');
    setPayments(personalFromApi.data.items);
  };
   //=================
   // handle Modals
   //=================
   const {open, setOpen, modalOption, setModalOption, modalOptions} = useDynamicModal(getCustomers)

   if(loading){
    return (
      <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
     
      />
    </div>
    )
   }else{
    return (
      <>
          <Container maxWidth="xl">
          <PageTitle title='Korperativ bilet' breadcrumbs={[homeBreadCrumb, CoorperativeTicketBreadCrumb, updateCoorperativeTicketBreadCrumb]}/>
        </Container>
        <Formik
          initialValues={ticket}
          enableReinitialize= {true}
          onSubmit={async (values, {setErrors}) => {
            
            try {
              values.isCustomerPaid=false
              const res = await apiService.put(
                `/CooperativeTicket/UpdateCooperativeTicket/${id}`,
                values
              );
              if (res?.status == 200) {
                toast.success('Bilet uğurla yaradıldı!');
                navigate('/panel/corperativeTicket');
              } else {
                setErrors(res.data.errors)
              }
            } catch (err) {
              console.error(err);
            } 
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Container maxWidth="xl" >
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
                            {
                              console.log('Supplier ID:', props.values.supplierId)
                             
                            }
                            {
                               console.log('Suppliers:', suppliers)
                            }
                            <Autocomplete
    id="supplier-autocomplete"
    options={suppliers || []}
    getOptionLabel={(option) => option.name}
    onChange={(event, newValue) => {
      props.handleChange({
        target: {
          name: "supplierId",
          value: newValue ? newValue.id : ''
        }
      });
    }}
    value={suppliers.find(sup => sup.id === props.values.supplierId)}
    renderInput={(params) => (
      <TextField
        {...params}
        label=""
        variant="outlined"
        sx={{ width: '100%', mb: 1 }}
        style={textStyling}
        size='small'
      />
    )}
  />
                            {
                               props.errors && props.touched && props.touched.supplierId && (
                                <>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.supplierId}</FormHelperText>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.SupplierId}</FormHelperText>
  
                                </>
                              )
                            }
                               <InputLabel
                              id="demo-simple-select-label"
                              sx={{ mb: 1 }}
                              style={textStyling}
                            >
                              Hava yolu adı
                            </InputLabel>
                            <Autocomplete
  id="airway-autocomplete"
  options={airways || []}
  getOptionLabel={(option) => option.name}
  onChange={(event, newValue) => {
    props.handleChange({
      target: {
        name: "airWayId",
        value: newValue ? newValue.id : ''
      }
    });
  }}
  value={airways.find(aw => aw.id === props.values.airWayId)}
  renderInput={(params) => (
    <TextField
      {...params}
      label=""
      variant="outlined"
      sx={{ width: '100%', mb: 1 }}
      style={textStyling}
      size='small'
    />
  )}
/>
                            {
                               props.errors && props.touched && props.touched.airWayId && (
                                <>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.airWayId}</FormHelperText>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.AirWayId}</FormHelperText>
  
                                </>
                              )
                            }
                                <InputLabel
                              id="demo-simple-select-label"
                              sx={{ mb: 1 }}
                              style={ticket && textStyling}
                            >
                              Müştəri
                            </InputLabel>
                            <Autocomplete
  id="customer-autocomplete"
  options={customers || []}
  getOptionLabel={(option) => option.fullName}
  onChange={(event, newValue) => {
    props.handleChange({
      target: {
        name: "customerId",
        value: newValue ? newValue.id : ''
      }
    });
  }}
  value={customers.find(customer => customer.id === props.values.customerId)}
  renderInput={(params) => (
    <TextField
      {...params}
      label=""
      variant="outlined"
      sx={{ width: '100%', mb: 1 }}
      style={textStyling}
      size='small'
    />
  )}
/>
                            {
                               props.errors && props.touched.customerId && (
                                <>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.customerId}</FormHelperText>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.CustomerId}</FormHelperText>
  
                                </>
                              )
                            }
                              <Button
                                variant="text"
                                sx={{ mb: 0 }}
                                style={textStyling}
                                onClick={()=>{
                                  setOpen(true)
                                  setModalOption(modalOptions.find(x=> x.field === "Customer"))}
                                }
                              >
                                + Yeni müştəri
                              </Button>
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
                              Bilet nömrəsi
                            </InputLabel>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: '100%', mb: 1 }}
                              name={`ticketNo`}
                              value={props.values.ticketNo}
                              style={textStyling}
                              onChange={props.handleChange}
                              size='small'
                            />
                            {
                               props.errors && props.touched && props.touched.ticketNo && (
                                <>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.ticketNo}</FormHelperText>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.TicketNo}</FormHelperText>
  
                                </>
                              )
                            }
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
                              name={`fee`}
                              value={props.values.fee}
                              onChange={props.handleChange}
                              type="number"
                              size='small'
                            />
                            {
                               props.errors && props.touched && props.touched.fee && (
                                <>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.fee}</FormHelperText>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.Fee}</FormHelperText>
  
                                </>
                              )
                            }
    <InputLabel
                              id="demo-simple-select-label"
                              sx={{ mb: 1 }}
                              style={textStyling}
                            >
                              Deadline
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer  components={['DateTimePicker']} >
                                <DatePicker 
                                 slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
                                  label="" 
                                  value={dayjs(props.values.deadline)}
                                  onChange={(newValue)=> {
                                  const event = {
                                    target: {
                                      name:`deadline`,
                                      value: newValue,
                                    }};
                                    props.handleChange(event);
                                }} />
                              </DemoContainer>
                            </LocalizationProvider>
                            {
                               props.errors && props.touched.deadline && (
                                <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.deadline}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.Deadline}</FormHelperText>
  
                              </>
                              )
                            }
                            <InputLabel
                              id="demo-simple-select-label"
                              sx={{ mb: 1 }}
                              style={textStyling}
                            >
                              Invoice tarixi
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer  components={['DateTimePicker']} >
                                <DatePicker 
                                 slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
                                  label="" 
                                  value={dayjs(props.values.date)}
                                  onChange={(newValue)=> {
                                  const event = {
                                    target: {
                                      name:`date`,
                                      value: newValue,
                                    }};
                                    props.handleChange(event);
                                }} />
                              </DemoContainer>
                            </LocalizationProvider>
                            {
                               props.errors && props.touched.date && (
                                <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.date}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.date}</FormHelperText>
  
                              </>
                              )
                            }
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
                          name={`purchasePrice`}
                          value={props.values.purchasePrice}
                          onChange={props.handleChange}
                          type="number"
                          size='small'
                        />
                        {
                           props.errors && props.touched && props.touched.purchasePrice && (
                            <>
                              <FormHelperText sx={{color: 'red'}}>{props.errors.purchasePrice}</FormHelperText>
                              <FormHelperText sx={{color: 'red'}}>{props.errors.PurchasePrice}</FormHelperText>
  
                            </>
                          )
                        }
  
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
                          name={`sellingPrice`}
                          value={props.values.sellingPrice}
                          onChange={props.handleChange}
                          type="number"
                          size='small'
                        />
                        {
                           props.errors && props.touched && props.touched.sellingPrice && (
                            <>
                              <FormHelperText sx={{color: 'red'}}>{props.errors.sellingPrice}</FormHelperText>
                              <FormHelperText sx={{color: 'red'}}>{props.errors.SellingPrice}</FormHelperText>
  
                            </>
                          )
                        }
  
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
                          sx={{ width: '100%', mb: 1 }}
                          style={textStyling}
                          name={`commission`}
                          value={props.values.commission}
                          onChange={props.handleChange}
                          size='small'
                          type="number"
                        />
                        {
                           props.errors && props.touched && props.touched.commission && (
                            <>
                              <FormHelperText sx={{color: 'red'}}>{props.errors.commission}</FormHelperText>
                              <FormHelperText sx={{color: 'red'}}>{props.errors.Commission}</FormHelperText>
  
                            </>
                          )
                        }
                      
                    
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
                              size='small'
                              style={textStyling}
                              onChange={props.handleChange}
                              name={`statutoryPrice`}
                              value={props.values.statutoryPrice}
                            />
                            {
                               props.errors && props.touched.statutoryPrice && (
                                <>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.statutoryPrice}</FormHelperText>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.StatutoryPrice}</FormHelperText>
  
                                </>
                              )
                            }
                          {props.values.invoiceDirections?.map((direction, key) => (
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
      name={`invoiceDirections[${key}].direction`}
      value={direction.direction}
      style={textStyling}
      onChange={props.handleChange}
      size="small"
    />

    <InputLabel
      id="demo-simple-select-label"
      sx={{ mb: 1 }}
      style={textStyling}
    >
      Uçuş tarixi
    </InputLabel>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
         slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
          value={dayjs(direction.flightDate)}
          label=""
          onChange={(newValue) => {
            const event = {
              target: {
                name: `invoiceDirections[${key}].flightDate`,
                value: newValue,
              },
            };
            props.handleChange(event);
          }}
        />
      </DemoContainer>
    </LocalizationProvider>

    {key !== 0 && (
      <Button
        color="error"
        onClick={() => {
          const updatedDirections = [...props.values.invoiceDirections];
          updatedDirections.splice(key, 1);
          props.setFieldValue('invoiceDirections', updatedDirections);
        }}
      >
        - İstiqaməti sil
      </Button>
    )}
  </Fragment>
))}

<Button
  onClick={() => {
    const updatedDirections = [
      ...props.values.invoiceDirections,
      { direction: '', flightDate: null }, // yeni bir invoiceDirections objesi
    ];
    props.setFieldValue('invoiceDirections', updatedDirections);
  }}
>
  + Yeni İstiqamət
</Button>

                            </>
                          </Grid>
                         
                          <Grid item md={2}>
                          {props.values?.isCustomerPaid && (
                          <>
                          <InputLabel
                              id="demo-simple-select-label"
                              sx={{ mb: 1 }}
                              style={textStyling}
                            >
                              Ödənilən məbləğ
                            </InputLabel>
                            <TextField
                            disabled
                              id="outlined-basic"
                              placeholder="Yazin"
                              type="number"
                              variant="outlined"
                              sx={{ width: '100%', mb: 1 }}
                              size='small'
                              style={textStyling}
                              onChange={props.handleChange}
                              name={`paidAmount`}
                              value={props.values.paidAmount}
                            />
                            {
                               props.errors && props.touched.paidAmount && (
                                <>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.paidAmount}</FormHelperText>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.PaidAmount}</FormHelperText>
  
                                </>
                              )
                            }
                            <InputLabel
                              id="demo-simple-select-label"
                              sx={{ mb: 1,display:"none" }}
                              style={textStyling}
                            >
                              Ödəniş növü
                            </InputLabel>
  
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              name={`paymentId`}
                              onChange={props.handleChange}
                              sx={{ width: '100%', mb: 1 ,display:"none"}}
                              size='small'
                              style={textStyling}
                              placeholder="Seçin"
                              value={props.values.paymentId}
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
                            {
                               props.errors && props.touched.paymentId && (
                                <>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.paymentId}</FormHelperText>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.PaymentId}</FormHelperText>
  
                                </>
                              )
                            }
      
                            {/* <InputLabel
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
                              size='small'
                              style={textStyling}
                              onChange={props.handleChange}
                              name={`note`}
                              value={props.values.note}
  
                            />
                            {
                               props.errors && props.touched.note && (
                                <>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.note}</FormHelperText>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.Note}</FormHelperText>
  
                                </>
                              )
                            } */}
                               <InputLabel
                              id="demo-simple-select-label"
                              sx={{ mb: 1 }}
                              style={textStyling}
                            >
                              Qalıq məbləğ
                            </InputLabel>
                            <TextField
                              id="outlined-basic"
                              placeholder="Yazin"
                              type="number"
                              variant="outlined"
                              sx={{ width: '100%', mb: 1 }}
                              size='small'
                              style={textStyling}
                              onChange={props.handleChange}
                              name={`debt`}
                              disabled
                              value={props.values.debt}
                            />
                            {
                               props.errors && props.touched.debt && (
                                <>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.debt}</FormHelperText>
                                  <FormHelperText sx={{color: 'red'}}>{props.errors.debt}</FormHelperText>
  
                                </>
                              )
                            }
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
                        defaultChecked={
                          props.values.isSupplierPaid
                        }
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
        {modalOption && <CustomModal open={open} setOpen={setOpen} > <modalOption.component/> </CustomModal>} 
  
        <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
      </>
    );
   }
 
}
