//@ts-nocheck
import { useEffect, useState ,Fragment,CSSProperties} from 'react';
import { Link, useActionData, useParams } from 'react-router-dom';
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
import {PlaneTicketUpdateSchema} from '../schema';
import { Ticket } from '../types';
import { updatePlaneTicketBreadCrumb, homeBreadCrumb, planeTicketBreadCrumb } from '../../../../routes/breadcrumbs';
import PageTitle from '../../../../components/pages/pageTitle';
import { CustomModal } from '../../../../components/layout/main/components/modal';
import { useDynamicModal } from '../../../../hooks/useDynamicModal';
import Autocomplete from '@mui/material/Autocomplete';
import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from 'react-i18next';
const breadcrumbs = [
  <Link key="1" to="/panel" className="pageLink link">
    Ana səhifə
  </Link>,
  <Link key="1" to="/panel/aviabiletSale" className="pageLink link">
    Aviabilet satışı
  </Link>,
  <Link key="1" to="" className="currentPageLink link">
    Aviabileti dəyiş
  </Link>,
];
const override: CSSProperties = {
  display: "block",
  margin: "auto",
  borderColor: "gray",
};
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
  padding: '12px 60px',
};
const invoiceDirection: InvoiceDirection = {
  direction: '',
  flightDate: new Date(),
};
const initialValues : Ticket = {
  ticketNo: '',
  passengerName: '',
  segmentCount: 0,
  purchasePrice: 0,
  deadline: new Date(),
  discount: 0,
  commonPrice: 0,
  paidAmount: 0,
  explanation: '',
  note: '',
  sellingPrice: 0,
  isCustomerPaid: false,
  isSupplierPaid: false,
  supplierId: '',
  customerId: '',
  personalId: '',
  airWayId: '',
  paymentId: '',
  invoiceDirections: [invoiceDirection],
};

export default function Index() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState(initialValues);
   const [loading,setLoading]=useState(true)
   const [color, setColor] = useState("#ffffff");
   const { t } = useTranslation();
  useEffect(() => {
    try {
      const fetchdata = async () => {
        const res = await apiService.get(`/PlaneTicket/GetById/${id!}`);
        for(const key in initialValues){
          initialValues[key] = res.data.data[key];
        }
        initialValues.invoiceDirections = res.data.data.invoiceDirections || [invoiceDirection];
        initialValues.supplierId = res.data.data.supplier?.id;
        initialValues.customerId = res.data.data.customer?.id;
        initialValues.personalId = res.data.data.personal?.id;
        initialValues.paymentId = res.data.data.payment?.id;
        initialValues.airWayId = res.data.data.airWay?.id;


        setTicket({...initialValues});
       await getAirways();
       await  getCustomers();
       await getPayments();
       await getPersonal();
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
  const [personal, setPersonal] = useState([]);
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

  const getPersonal = async () => {
    const personalFromApi = await apiService.get('Personal/GetAll/1');
    setPersonal(personalFromApi.data.items);
  };

  const getPayments = async () => {
    const personalFromApi = await apiService.get('Payment/GetAll/1');
    setPayments(personalFromApi.data.items);
  };
  const {open, setOpen, modalOption, setModalOption, modalOptions} = useDynamicModal(getCustomers)

 if(loading==false){
  return (
    
    <>
   
      {/* <Container maxWidth="xl">
        <PageTitle title='Aviabilet satışı' breadcrumbs={[homeBreadCrumb, planeTicketBreadCrumb, updatePlaneTicketBreadCrumb]}/>
      </Container> */}
      <Formik
   
        initialValues={ticket}
        enableReinitialize= {true}
        // validationSchema={PlaneTicketUpdateSchema}
        onSubmit={async (values, {setErrors}) => {
          try {
            const res = await apiService.put(
              `/PlaneTicket/UpdatePlaneTicket/${id}`,
              values
            );
            if (res?.status == 200) {
              toast.success('Odenis uğurla yaradıldı!');
              navigate('/panel/aviabiletsale');
            } else {
              setErrors(res.data.errors)
            }
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {(props) => (
          <Form    style={{backgroundColor:"white",padding:"10px"}} onSubmit={props.handleSubmit}>
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
                            {t("Personal")}
                          </InputLabel>
                          <Autocomplete
                            value={personal.find(per => per.id === props.values.personalId)}
                            onChange={(event, newValue) => {
                              props.setFieldValue('personalId', newValue ? newValue.id : '');
                            }}
                            options={personal}
                            getOptionLabel={(option) => option.fullName}
                            renderInput={(params) => <TextField {...params} label="" style={textStyling} size="small" />}
                          />
                          
                          
                          {
                            props.errors && props.touched.personalId && (
                              <FormHelperText sx={{color: 'red'}}>{props.errors.personalId}</FormHelperText>
                            )
                          }
                                 <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                       {t('supplier')}
                          </InputLabel>
                          <Autocomplete
  value={suppliers.find(sup => sup.id === props.values.supplierId)}
  onChange={(event, newValue) => {
    props.setFieldValue('supplierId', newValue ? newValue.id : '');
  }}
  options={suppliers}
  getOptionLabel={(option) => option.name}
  renderInput={(params) => <TextField {...params} label="" style={textStyling} size="small" />}
/>


{
  props.errors && props.touched.supplierId && (
    <FormHelperText sx={{color: 'red'}}>{props.errors.supplierId}</FormHelperText>
  )
}
                              <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={ticket && textStyling}
                          >
                         {t('customer')}
                          </InputLabel>
                          <Autocomplete
  value={customers.find(customer => customer.id === props.values.customerId)}
  options={customers}
  getOptionLabel={(option) => option.fullName}
  onChange={(event, newValue) => {
    props.handleChange({
      target: {
        name: 'customerId',
        value: newValue ? newValue.id : null
      }
    });
  }}
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
    <FormHelperText sx={{color: 'red'}}>{props.errors.customerId}</FormHelperText>
  )
}
                            <Button
                              variant="text"
                              sx={{ mb: 0 }}
                              style={textStyling}
                              onClick={()=>{
                                setOpen(true)
                                setModalOption(modalOptions?.find(x=> x.field === "Customer"))}
                              }
                            >
                            + {t('newCustomer')}
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
                            label=""
                          /> */}
                         </Grid>
                         <Grid item md={2}>
                         <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                        {t('ticketNumber')}
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            disabled
                            sx={{ width: '100%', mb: 1 }}
                            name={`ticketNo`}
                            value={props.values.ticketNo}
                            style={textStyling}
                            onChange={props.handleChange}
                            size='small'
                          />
                          {
                             props.errors && props.touched.ticketNo && (
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
                       {t('passengerName')}
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '100%', mb: 1 }}
                            name={`passengerName`}
                            value={props.values.passengerName}
                            style={textStyling}
                            onChange={props.handleChange}
                            size='small'
                          />
                          {
                             props.errors && props.touched.passengerName && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.passengerName}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.PassengerName}</FormHelperText>
                              </>
                            )
                          }
                                  <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            {t('segmentCount')}
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            name={`segmentCount`}
                            value={props.values.segmentCount}
                            onChange={props.handleChange}
                            type="number"
                            size='small'
                          />
                          {
                             props.errors && props.touched.segmentCount && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.segmentCount}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.SegmentCount}</FormHelperText>
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
                          {t('purchasePrice')}
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
                             props.errors && props.touched.purchasePrice && (
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
                          {t('salePrice')}
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
                             props.errors && props.touched.sellingPrice && (
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
                              {t('discount')}
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            name={`discount`}
                            value={props.values.discount}
                            onChange={props.handleChange}
                            size='small'
                            type="number"
                          />
                          {
                             props.errors && props.touched.discount && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.discount}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.Discount}</FormHelperText>
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
                         {t('totalSalePrice')}
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            name={`commonPrice`}
                            value={props.values.commonPrice}
                            onChange={props.handleChange}
                            size='small'
                            type="number"
                          />
                          {
                             props.errors && props.touched.commonPrice && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.commonPrice}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.CommonPrice}</FormHelperText>
                              </>
                            )
                          }
                        
                        {props.values?.invoiceDirections?.map((elem, key) => (
  <Fragment key={key}>
    <InputLabel
      id="demo-simple-select-label"
      sx={{ mb: 1 }}
      style={textStyling}
    >
      {t('direction')}
    </InputLabel>
    <TextField
      id="outlined-basic"
      variant="outlined"
      sx={{ width: '100%', mb: 1 }}
      name={`ticket.invoiceDirections[${key}].direction`}
      value={elem.direction}
      style={textStyling}
      onChange={props.handleChange}
      size="small"
    />
    {props.errors?.invoiceDirections && props.touched?.invoiceDirections && (
      <>
        <FormHelperText sx={{ color: 'red' }}>
          {props.errors.invoiceDirections[key]?.direction}
        </FormHelperText>
      </>
    )}
    <InputLabel
      id="demo-simple-select-label"
      sx={{ mb: 1 }}
      style={textStyling}
    >
      {t('flightDate')}
    </InputLabel>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
      <DateTimePicker
 slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
  label=""
  value={dayjs(elem.flightDate)}
  onChange={(newValue) => {
    const event = {
      target: {
        name: `ticket.invoiceDirections[${key}].flightDate`,
        value: newValue,
      },
    };
    props.handleChange(event);
  }}
/>

      </DemoContainer>
    </LocalizationProvider>
    {props.errors.ticket && props.touched.ticket && (
      <>
        <FormHelperText sx={{ color: 'red' }}>
          {props.errors.invoiceDirections[key]?.flightDate}
        </FormHelperText>
      </>
    )}
    {key !== 0 && (
      <Button
        color="error"
        onClick={() => {
          props.values.invoiceDirections.splice(key, 1);
          props.setValues({ ...props.values });
        }}
      >
        - İstiqaməti sil
      </Button>
    )}
  </Fragment>
))}
<Button
  onClick={() => {
    // Adım 1: props.values.ticket'in undefined olup olmadığını kontrol edin
    const updatedInvoiceDirections = [...props.values.invoiceDirections];
    updatedInvoiceDirections.push(invoiceDirection);
    
    const updatedTicket = {
      ...props.values,
      invoiceDirections: updatedInvoiceDirections
    };

    props.setValues(updatedTicket);
  }}
>
+ {t('newDirection')}
</Button>



                

                          </>
                        </Grid>
                        <Grid item md={2}>
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                       {t('airlineName')}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name={`airWayId`}
                            value={props.values.airWayId}
                            onChange={props.handleChange}
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            size='small'
                          >
                            {airways?.map((aw: any, i: number) => (
                              <MenuItem
                                key={i}
                                value={aw.id}
                                style={textStyling}
                              >
                                {aw.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {
                             props.errors && props.touched.airWayId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.airWayId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.AirWayId}</FormHelperText>
                              </>
                            )
                          }
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                             {t('deadline')}
                          </InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer  components={['DateTimePicker']} >
                              <DateTimePicker 
                               slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
                                label="" 
                                value={dayjs(props.values.deadline)}
                                sx={{ width: '100%', mb: 1 }}
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
                            {t('explanation')}
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            placeholder="Yazin"
                            variant="outlined"
                            sx={{ width: '100%', mb: 3 }}
                            style={textStyling}
                            name={`explanation`}
                            value={props.values.explanation}
                            size='small'
                            onChange={props.handleChange}
                          />
                          {
                             props.errors && props.touched.explanation && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.explanation}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.Explanation}</FormHelperText>
                              </>
                            )
                          }
                              <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                        {t('date')}
                          </InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer  components={['DateTimePicker']} >
                              <DateTimePicker 
                               slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
                                label="" 
                                value={dayjs(props.values.date)}
                                sx={{ width: '100%', mb: 1 }}
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
                            disabled={true}
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
                            size='small'
                            style={textStyling}
                            value={props.values?.commonPrice! - props.values?.paidAmount!}
                          />
                          {/* <InputLabel
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
                            value={props.values.paymentId}
                            onChange={props.handleChange}
                            sx={{ width: '100%', mb: 1 }}
                            size='small'
                            style={textStyling}
                            placeholder="Seçin"
                       
                            disabled={true}
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
                          } */}
    
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
                 
                            disabled={true}
                          />
                          {
                             props.errors && props.touched.note && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.note}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.note}</FormHelperText>
                              </>
                            )
                          } */}
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
 }else{
  return(

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
 }
}
