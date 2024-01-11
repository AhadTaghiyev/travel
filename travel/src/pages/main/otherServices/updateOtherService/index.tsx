// @ts-nocheck
import { useState, useReducer, useEffect} from 'react';
import { Link, json, useParams } from 'react-router-dom';
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
import { IOtherService, IStore} from '../types'
import { apiService } from '../../../../server/apiServer';
import { Autocomplete, CircularProgress, FormHelperText } from '@mui/material';
import _ from 'lodash';
import { OtherServiceSchema } from '../schema';
import PageTitle from "../../../../components/pages/pageTitle";
import {
  OtherServicesBreadCrumb,
    homeBreadCrumb,
    updateOtherServicesBreadCrumb,
} from "../../../../routes/breadcrumbs";
import { Form, Formik } from 'formik';
import { useGetters } from '../../../../hooks/useGetters';
import { useDynamicModal } from '../../../../hooks/useDynamicModal';
import { CustomModal } from '../../../../components/layout/main/components/modal';
import { DatePicker } from '@mui/x-date-pickers';


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

const initialValues : IOtherService = {
  customerId: null,
  serviceManagerId: null,
  supplierId: null,
  personalId: null,
  paymentId: null,
  serviceName: "",
  passengerCount: 0,
  purchasePrice: 0,
  sellingPrice: 0,
  discount: 0,
  paidAmount: 0,
  explanation: "",
  reservationNo: "",
  note: "",
  deadline: new Date(),
  flightDate:new Date(),
  isCustomerPaid: false,
  isSupplierPaid: false,
  date : null,
};


export default function Index() {



  const navigate = useNavigate();
  const { id } = useParams();

  const [otherService, setOtherService] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {

    setIsLoading(true)
    try {
      const fetchdata = async () => {
        const res = await apiService.get(`/OtherServiceTicket/GetById/${id!}`);
        for(const key in initialValues){
          initialValues[key] = res.data.data[key];
        }

        initialValues.supplierId = res.data.data.supplier?.id;
        initialValues.customerId = res.data.data.customer?.id;
        initialValues.personalId = res.data.data.personal?.id;
        initialValues.paymentId = res.data.data.payment?.id;
        initialValues.serviceManagerId = res.data.data.serviceManager?.id;
        initialValues.deadline = res.data.data.deadline;
        initialValues.flightDate = res.data.data.flightDate;
        initialValues.isCustomerPaid = res.data.data.isCustomerPaid;
        setOtherService({...initialValues});
        console.log("🚀 ~ file: index.tsx:159 ~ fetchdata ~ otherService:", initialValues)
      };
      fetchdata().catch(console.error);
    } catch {
      console.error;
    }
    finally{
    setIsLoading(false)
    }


  }, []);


  //========================
  // Data getting functions
  //========================
  const {state, dispatch, getCustomers, getSuppliers, getDinings, getPayments, getPersonals, getTours, getServiceManagers} = useGetters();
  //=================
   // handle Modals
   //=================
   const {open, setOpen, modalOption, setModalOption, modalOptions} = useDynamicModal(getCustomers,null,getDinings,null,getPersonals,getTours,null,getServiceManagers)

   useEffect(()=>{

    (async()=>{
      setIsLoading(true)

      try {
        getCustomers();
        getSuppliers();
        getPayments();
        getPersonals();
        getServiceManagers();
      } catch (err) {
        console.log("🚀 ~ file: index.tsx:156 ~ err:", err)
        
      }
      finally{
    setIsLoading(false)

      }
    })();
   }, [dispatch])



   if(isLoading){
    return (
      <CircularProgress sx={{position:"absolute" , top: "50%" , left:'50%'}}/>
      )
   }
  
 


  return (
    <>
         <Container maxWidth="xl">
                <PageTitle
                    title=" Digər xidmətlər"
                    breadcrumbs={[
                        homeBreadCrumb,
                        OtherServicesBreadCrumb,
                        updateOtherServicesBreadCrumb,
                    ]}
                />
            </Container>
     

        <Formik
        initialValues={otherService}
        enableReinitialize= {true}
       validationSchema={OtherServiceSchema}
        onSubmit={async (values, {setErrors}) => {
          try {
            const res = await apiService.put(
              `/OtherServiceTicket/UpdateOtherServiceTicket/${id}`,
              values
            );
            if (res?.status == 200) {
              toast.success('Aviabilet uğurla yaradıldı!');
              navigate('/panel/otherServices');
            } else {
                let errors = res.data.errors;
                // convert to camelCase
                errors =  _.mapKeys(errors, (value, key)=>{
                    return _.camelCase(key);
                })
                console.log("🚀 ~ file: index.tsx:237 ~ onSubmit={ ~ errors:", errors)
                
              setErrors(errors)
            }
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
             <Container maxWidth="xl"  >
                      <Grid
                        container
                        spacing={4}
                        style={{ marginBottom: '70px' }}
                      >
                          <Grid item md={3}>
                          {/* Customer  */}
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Müştəri
                          </InputLabel>
                          
                          <Autocomplete
                            disablePortal
                            value={state.customers.find(customer => customer.id === props.values.customerId) || null}
                            onChange={(event, newValue) => {
                              const newId = newValue ? newValue.id : null;
                              props.handleChange({
                                target: {
                                  name: `customerId`,
                                  value: newId
                                }
                              });
                            }}
                            getOptionLabel={(option) => option.fullName}  
                            options={state.customers}
                            style={textStyling}
                            sx={{ width: '100%', mb: 1}}
                            size="small"
                            renderInput={(params) => <TextField {...params} label=""/>}
                          />
                    
                 
                          {
                             props.errors && props.touched && props.touched.customerId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.customerId}</FormHelperText>
                              </>
                            )
                          }
                      
                            <Button
                              variant="text"
                              sx={{ mb: 3 }}
                              style={textStyling}
                              onClick={()=>{
                                setOpen(true)
                                setModalOption(modalOptions.find(x=> x.field === "Customer"))}
                              }
                            >
                              + Yeni müştəri
                            </Button>
                      


                         
                          {/* xidmət  */}
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Xidmət
                          </InputLabel>
                          <Autocomplete
                            disablePortal
                            value={state.serviceManagers.find(customer => customer.id === props.values.serviceManagerId) || null}
                            onChange={(event, newValue) => {
                              const newId = newValue ? newValue.id : null;
                              props.handleChange({
                                target: {
                                  name: `serviceManagerId`,
                                  value: newId
                                }
                              });
                            }}
                            getOptionLabel={(option) => option.type}  
                            options={state.serviceManagers}
                            style={textStyling}
                            sx={{ width: '100%', mb: 1}}
                            size="small"
                            renderInput={(params) => <TextField {...params} label=""/>}
                          />
                    
                  
                          {
                             props.errors && props.touched && props.touched.serviceManagerId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.serviceManagerId}</FormHelperText>
                              </>
                            )
                          }
                        
                            <Button
                              variant="text"
                              sx={{ mb: 3 }}
                              style={textStyling}
                              onClick={()=>{
                                setOpen(true)
                                setModalOption(modalOptions.find(x=> x.field === "ServiceManagers"))}
                              }
                            >
                              + Yeni Xidmət
                            </Button>
                    

                              {/* Xidmət */}
                              <InputLabel
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Xidmətin adı
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '100%', mb: 3 }}
                            name={`serviceName`}
                            value={props.values.serviceName}
                            style={textStyling}
                            onChange={props.handleChange}
                            error={!!props.errors && !!props.errors?.serviceName}
                            helperText={!!props.errors && props.errors?.serviceName}
                            size='small'
                          />
                          

                          {/* sernisin sayi  */}
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Sərnişin sayı
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '100%', mb: 3 }}
                            style={textStyling}
                            name={`passengerCount`}
                            value={props.values.passengerCount}
                            onChange={props.handleChange}
                            error={!!props.errors && !!props.errors?.passengerCount}
                            helperText = { props.errors &&  props.errors?.passengerCount}
                            type="number"
                            size='small'
                          />

                          
<InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Uçuş tarixi
                          </InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer  components={['DateTimePicker']} >
                              <DateTimePicker 
                               slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
                                label="" 
                                onChange={(newValue)=> {
                                const event = {
                                  target: {
                                    name:`flightDate`,
                                    value: newValue.$d.toISOString(),
                                  }};
                                  props.handleChange(event);
                              }} />
                            </DemoContainer>
                          </LocalizationProvider>
                          {
                             props.errors && props.touched && props.touched.flightDate && (
                              <>
                              <FormHelperText sx={{color: 'red'}}>{props.errors.flightDate}</FormHelperText>
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
                                              name: `date`,
                                              value: index === 0 ? newValue : props.values.date,
                                            },
                                          };
                                          props.handleChange(event);
                                        }}
                                      />
                                    </DemoContainer>
                                  </LocalizationProvider>
                         
                         <Grid/>
                      
                  
                         
                        </Grid>
                       
                        <Grid item md={3}>
                        <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Təchizatçı
                          </InputLabel>
                          <Autocomplete
                            disablePortal
                            value={state.suppliers.find(supplier => supplier.id === props.values.supplierId) || null}
                            onChange={(event, newValue) => {
                              const newId = newValue ? newValue.id : null;
                              props.handleChange({
                                target: {
                                  name: `supplierId`,
                                  value: newId
                                }
                              });
                            }}
                            getOptionLabel={(option) => option.name}  
                            options={state.suppliers}
                            style={textStyling}
                            sx={{ width: '100%', mb: 1}}
                            size="small"
                            renderInput={(params) => <TextField {...params} label=""/>}
                          />
                         
                          {
                             props.errors && props.touched && props.touched.supplierId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.supplierId}</FormHelperText>
                              </>
                            )
                          }
                        
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
                            sx={{ width: '100%', mb: 3 }}
                            size='small'
                            style={textStyling}
                            onChange={props.handleChange}
                            name={`explanation`}
                            value={props.values.explanation}
                            error={!!props.errors && !!props.errors.explanation}
                            helperText={!!props.errors && props.errors.explanation}

                          />
                        
                        
                          {/* Rezervasiya nomresi */}
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Rezervasiya nömrəsi
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            placeholder="Yazın"
                            type="text"
                            variant="outlined"
                            sx={{ width: '100%', mb: 3 }}
                            size='small'
                            style={textStyling}
                            onChange={props.handleChange}
                            name={`reservationNo`}
                            value={props.values.reservationNo}
                            error={!!props.errors && !!props.errors.reservationNo}
                            helperText={!!props.errors && props.errors.reservationNo}
                          />                          
                        
                        
                         
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
                            sx={{ width: '100%', mb: 3 }}
                            style={textStyling}
                            name={`purchasePrice`}
                            value={props.values.purchasePrice}
                            onChange={props.handleChange}
                            type="number"
                            size='small'
                            error={!!props.errors && !!props.errors.purchasePrice}
                            helperText={!!props.errors && props.errors.purchasePrice}

                          />
                          {
                             props.errors && props.touched && props.touched.purchasePrice && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.purchasePrice}</FormHelperText>
                            
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
                            sx={{ width: '100%', mb: 3 }}
                            style={textStyling}
                            name={`sellingPrice`}
                            value={props.values.sellingPrice}
                            onChange={props.handleChange}
                            type="number"
                            size='small'
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
                            sx={{ width: '100%', mb: 3 }}
                            style={textStyling}
                            name={`discount`}
                            value={props.values.discount}
                            onChange={props.handleChange}
                            error={!!props.errors && !!props.errors.discount}
                            helperText={!!props.errors && props.errors.discount}

                            size='small'
                            type="number"
                          />
                        
                        
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
                                onChange={(newValue)=> {
                                const event = {
                                  target: {
                                    name:`deadline`,
                                    value: newValue.$d.toISOString(),
                                  }};
                                  props.handleChange(event);
                              }} />
                            </DemoContainer>
                          </LocalizationProvider>
                          {
                             props.errors && props.touched && props.touched.deadline && (
                              <>
                              <FormHelperText sx={{color: 'red'}}>{props.errors?.deadline}</FormHelperText>
                            </>
                            )
                          }

                        </Grid>

                        <Grid item md={3}>
                        

                        
                         {/* Personal  */}
                         <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Personal
                          </InputLabel>
                          <Autocomplete
                            disablePortal
                            value={state.personals.find(personal => personal.id === props.values.personalId) || null}
                            onChange={(event, newValue) => {
                              const newId = newValue ? newValue.id : null;
                              props.handleChange({
                                target: {
                                  name: `personalId`,
                                  value: newId
                                }
                              });
                            }}
                            getOptionLabel={(option) => option.fullName}  
                            options={state.personals}
                            style={textStyling}
                            sx={{ width: '100%', mb: 1}}
                            size="small"
                            renderInput={(params) => <TextField {...params} label=""/>}
                          />
                 
                          {
                             props.errors && props.touched && props.touched.personalId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.personalId}</FormHelperText>
                              </>
                            )
                          }
                        
                            <Button
                              variant="text"
                              sx={{ mb: 3 }}
                              style={textStyling}
                              onClick={()=>{
                                setOpen(true)
                                setModalOption(modalOptions.find(x=> x.field === "Personal"))}
                              }
                            >
                              + Yeni Personal
                            </Button>
                    

                          <br />
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
                       
                            {/*  Ödənilən məbləğ */}

                            {props.values.isCustomerPaid && (<>
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
                            sx={{ width: '100%', mb: 3 }}
                            size='small'
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
                            sx={{ width: '100%', mb: 3 }}
                            size='small'
                            style={textStyling}
                            value={ props.values.sellingPrice - props.values.paidAmount }
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
                            value={state.payments.find(payment => payment.id === props.values.paymentId) || null}
                            onChange={(event, newValue) => {
                              const newId = newValue ? newValue.id : null;
                              props.handleChange({
                                target: {
                                  name: `paymentId`,
                                  value: newId
                                }
                              });
                            }}
                            getOptionLabel={(option) => option.type}  
                            options={state.payments}
                            style={textStyling}
                            sx={{ width: '100%', mb: 1}}
                            size="small"
                            renderInput={(params) => <TextField {...params} label=""/>}
                          />
                    
                   

                          {
                             props.errors && props.touched && props.touched.paymentId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.paymentId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.paymentId}</FormHelperText>
                              </>
                            )
                          }
                          </>)}
                        
    
                         
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
                            sx={{ width: '100%', mb: 3 }}
                            size='small'
                            style={textStyling}
                            onChange={props.handleChange}
                            name={`note`}
                            value={props.values.note}
                            error={!!props.errors && !!props.errors.note}
                            helperText={!!props.errors && props.errors.note}

                          />
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
                        props.values.isCustomerPaid
                      }
                      value={props.values.isCustomerPaid}
                      name={`isCustomerPaid`}
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
