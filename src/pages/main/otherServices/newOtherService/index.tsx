// @ts-nocheck
import { useState, useReducer, useEffect} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import Divider from '@mui/material/Divider';
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
import { IStore, IOtherService} from '../types'
import { apiService } from '../../../../server/apiServer';
import { Autocomplete, CircularProgress, FormHelperText } from '@mui/material';
import _, { values } from 'lodash';
import { OtherServiceListSchema, OtherServiceSchema } from '../schema';
import dayjs from 'dayjs';

import PageTitle from "../../../../components/pages/pageTitle";
import {
  OtherServicesBreadCrumb,
    homeBreadCrumb,
    newOtherServicesBreadCrumb,
} from "../../../../routes/breadcrumbs";
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
  flightDate: new Date(),
  isCustomerPaid: false,
  isSupplierPaid: false,
  date: null
};

export default function Index() {

  const [isSupplierPaid, setIsSupplierPaid] = useState(false)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
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
        
      }finally{
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
                        newOtherServicesBreadCrumb,
                    ]}
                />
            </Container>
      
    

      <Formik
        initialValues={{ ot: [initialValues]}}
        validationSchema={OtherServiceListSchema}
        enableReinitialize={true}
        onSubmit={async (values, {setErrors}) => {
          values.ot.map(item=> item.isSupplierPaid =  isSupplierPaid)


           try {
             const res = await apiService.post(`/OtherServiceTicket/CreateOtherServiceTicket`, values.ot);
             if (res?.status == 200) {
               toast.success('Xidmət uğurla yaradıldı!');
               const guids = res?.data.data.join(',');
                navigate({
                  pathname: `/panel/otherServices/report`,
                  search: `?tickets=${guids}`
                });
             }else{
              let errors = res.data.errors;
              // conver to camelCase
              errors =  _.mapKeys(errors, (value, key)=>{
                const result =  key.split(".");
                const cammelCase = _.camelCase(result[1]);
                return `${result[0]}.${cammelCase}`
              })
              console.log("🚀 ~ file: index.tsx:160 ~ onSubmit={ ~ errors:", errors)

               setErrors({ot: errors})
             }
           } catch (err) {
             console.error(err);
           } 

        }}
        render={(props) => (
          <Form>
            <FieldArray
              name="ot"
              render={(arrayHelpers) => (
              
                <div>
                <Container  maxWidth="xl">
                    <Button
                     variant="contained"
                     sx={{ mb: 3, mr:3 }}
                     style={textStyling}
                     onClick={()=>{
                    console.log("🚀 ~ file: index.tsx:173 ~ onSubmit={ ~ props:", props)
                      arrayHelpers.push(initialValues)
                     } }
                  >
                     + Yeni Xidmət
                  </Button>
                </Container>
                
                  {props.values.ot.map((ticket, index) => (
                    <Container maxWidth="xl" key={index} >
                
                {index !== 0 &&
                      <Button
                         variant="contained"
                         color='error'
                         sx={{ mb: 3}}
                         style={textStyling}
                         onClick={()=> arrayHelpers.remove([index])}
                      > 
                       
                        - Sil
                     </Button>}
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: '70px' }}
                      >
                        <Grid item md={2}>
                          {/* Customer  */}
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={ticket && textStyling}
                          >
                            Müştəri
                          </InputLabel>
                          <Autocomplete
                            id={`autocomplete-customerId-${index}`}
                            options={state.customers || []}
                            getOptionLabel={(option) => option.fullName}
                            onChange={(event, newValue) => {
                              props.handleChange({
                                target: {
                                  name: `ot[${index}].customerId`,
                                  value: newValue ? newValue.id : ''
                                }
                              });
                            }}
                            value={state.customers.find(payment => payment.id === props.values.ot[index].customerId)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=""
                                variant="outlined"
                                sx={{ width: '100%', mb: 1 }}
                                error={!!props.errors?.t && !!props.errors.t[`ot[${index}].customerId`]}
                                style={textStyling}
                                size='small'
                              />
                            )}
                          />
                       
                          {
                             props.errors?.ot && props.touched.ot && props.touched.ot[index]?.customerId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[index]?.customerId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[`ot[${index}].customerId`]?.join(", ")}</FormHelperText>
                              </>
                            )
                          }
                            {index === 0 && (
                            
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
                             
                            )}


                         
                          {/* xidmət  */}
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Xidmət
                          </InputLabel>
                          <Autocomplete
                            id={`autocomplete-serviceManagerId-${index}`}
                            options={state.serviceManagers || []}
                            getOptionLabel={(option) => option.type}
                            onChange={(event, newValue) => {
                              props.handleChange({
                                target: {
                                  name: `ot[${index}].serviceManagerId`,
                                  value: newValue ? newValue.id : ''
                                }
                              });
                            }}
                            value={state.serviceManagers.find(payment => payment.id === props.values.ot[index].serviceManagerId)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                
                                variant="outlined"
                                sx={{ width: '100%', mb: 1 }}
                                error={!!props.errors?.t && !!props.errors.t[`ot[${index}].serviceManagerId`]}
                                style={textStyling}
                                size='small'
                                
                              />
                            )}
                          />
                         
                          {
                             props.errors?.ot && props.touched.ot && props.touched.ot[index]?.serviceManagerId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[index]?.serviceManagerId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[`ot[${index}].serviceManagerId`]?.join(", ")}</FormHelperText>
                              </>
                            )
                          }
                      
                            <Button
                              variant="text"
                              sx={{ mb: 0 }}
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
                            sx={{ width: '100%', mb: 0 }}
                            name={`ot[${index}].serviceName`}
                            value={props.values.ot[index]?.serviceName}
                            style={textStyling}
                            onChange={props.handleChange}
                            error={!!props.errors?.ot && !!props.errors?.ot[index]?.serviceName}
                            helperText={!!props.errors?.ot && props.errors?.ot[index]?.serviceName}
                            size='small'
                          />
                         <Grid/>
                         <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                defaultChecked={
                                  props.values.ot[index]?.isCustomerPaid
                                }
                                value={props.values.ot[index]?.isCustomerPaid}
                                name={`ot[${index}].isCustomerPaid`}
                                onChange={props.handleChange}
                                error={!!props.errors?.ot && !!props.errors?.ot[`ot[${index}].isCustomerPaid`]}
                                helperText={!!props.errors?.ot && props.errors?.ot[`ot[${index}].isCustomerPaid`]?.join(', ')}
    
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
                            Təchizatçı
                          </InputLabel>
                          <Autocomplete
                            id={`autocomplete-supplierId-${index}`}
                            options={state.suppliers || []}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => {
                              props.handleChange({
                                target: {
                                  name: `ot[${index}].supplierId`,
                                  value: newValue ? newValue.id : ''
                                }
                              });
                            }}
                            value={state.suppliers.find(supplier => supplier.id === props.values.ot[index].supplierId)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                
                                variant="outlined"
                                sx={{ width: '100%', mb: 1 }}
                                error={!!props.errors?.t && !!props.errors.t[`ot[${index}].supplierId`]}
                                style={textStyling}
                                size='small'
                                
                              />
                            )}
                          />
                      
                          {
                             props.errors?.ot && props.touched.ot && props.touched.ot[index]?.supplierId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[index]?.supplierId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[`ot[${index}].supplierId`]?.join(", ")}</FormHelperText>
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
                            sx={{ width: '100%', mb: 1 }}
                            size='small'
                            style={textStyling}
                            onChange={props.handleChange}
                            name={`ot[${index}].explanation`}
                            value={props.values.ot[index]?.explanation}
                            error={!!props.errors?.ot && !!props.errors?.ot[`ot[${index}].explanation`]}
                            helperText={!!props.errors?.ot && props.errors?.ot[`ot[${index}].explanation`]?.join(', ')}

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
                            sx={{ width: '100%', mb: 1}}
                            size='small'
                            style={textStyling}
                            onChange={props.handleChange}
                            name={`ot[${index}].reservationNo`}
                            value={props.values.ot[index]?.reservationNo}
                            error={!!props.errors?.ot && !!props.errors?.ot[`ot[${index}].reservationNo`]}
                            helperText={!!props.errors?.ot && props.errors?.ot[`ot[${index}].reservationNo`]?.join(', ')}
                          />                          
                        
                                 {/* Personal  */}
                                 <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={ticket && textStyling}
                          >
                            Personal
                          </InputLabel>
                          <Autocomplete
                            id={`autocomplete-personalId-${index}`}
                            options={state.personals || []}
                            getOptionLabel={(option) => option.fullName}
                            onChange={(event, newValue) => {
                              props.handleChange({
                                target: {
                                  name: `ot[${index}].personalId`,
                                  value: newValue ? newValue.id : ''
                                }
                              });
                            }}
                            value={state.personals.find(personal => personal.id === props.values.ot[index].personalId)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                
                                variant="outlined"
                                sx={{ width: '100%', mb: 1 }}
                                error={!!props.errors?.t && !!props.errors.t[`ot[${index}].personalId`]}
                                style={textStyling}
                                size='small'
                                
                              />
                            )}
                          />
                  
                          {
                             props.errors?.ot && props.touched.ot && props.touched.ot[index]?.personalId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[index]?.personalId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[`ot[${index}].personalId`]?.join(", ")}</FormHelperText>
                              </>
                            )
                          }
                          
                            <Button
                              variant="text"
                              sx={{ mb: 0 }}
                              style={textStyling}
                              onClick={()=>{
                                setOpen(true)
                                setModalOption(modalOptions.find(x=> x.field === "Personal"))}
                              }
                            >
                              + Yeni Personal
                            </Button>
                          
                         
     
                    

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
                            name={`ot[${index}].purchasePrice`}
                            value={props.values.ot[index]?.purchasePrice}
                            onChange={props.handleChange}
                            type="number"
                            size='small'
                            error={!!props.errors?.ot && !!props.errors?.ot[`ot[${index}].purchasePrice`]}
                            helperText={!!props.errors?.ot && props.errors?.ot[`ot[${index}].purchasePrice`]?.join(', ')}

                          />
                          {
                             props.errors?.ot && props.touched.ot && props.touched.ot[index]?.purchasePrice && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[index]?.purchasePrice}</FormHelperText>
                            
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
                            sx={{ width: '100%', mb: 1}}
                            style={textStyling}
                            name={`ot[${index}].sellingPrice`}
                            value={props.values.ot[index]?.sellingPrice}
                            onChange={props.handleChange}
                            type="number"
                            size='small'
                            error={!!props.errors?.ot && !!props.errors?.ot[`ot[${index}].sellingPrice`]}
                            helperText={!!props.errors?.ot && props.errors?.ot[`ot[${index}].sellingPrice`]?.join(', ')}

                          />
                          {
                             props.errors?.ot && props.touched.ot && props.touched.ot[index]?.sellingPrice && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[index]?.sellingPrice}</FormHelperText>
                              </>
                            )
                          }
                        
                        
                        
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
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            name={`ot[${index}].discount`}
                            value={props.values.ot[index]?.discount}
                            onChange={props.handleChange}
                            error={!!props.errors?.ot && !!props.errors?.ot[`ot[${index}].discount`]}
                            helperText={!!props.errors?.ot && props.errors?.ot[`ot[${index}].discount`]?.join(', ')}

                            size='small'
                            type="number"
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
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            name={`ot[${index}].passengerCount`}
                            value={props.values.ot[index]?.passengerCount}
                            onChange={props.handleChange}
                            error={!!props.errors?.ot && !!props.errors?.ot[index]?.passengerCount}
                            helperText = { props.errors?.ot &&  props.errors?.ot[index]?.passengerCount}
                            type="number"
                            size='small'
                          />
                        </Grid>
                        <Grid item md={2}>
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
                                    name:`ot[${index}].flightDate`,
                                    value: newValue,
                                  }};
                                  props.handleChange(event);
                              }} />
                            </DemoContainer>
                          </LocalizationProvider>
                          {
                             props.errors?.ot && props.touched.ot && props.touched.ot[index]?.flightDate && (
                              <>
                              <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[index]?.flightDate}</FormHelperText>
                              <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[`ot[${index}].flightDate`]?.join(", ")}</FormHelperText>
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
                                disabled={(index !== 0)}
                                value={dayjs(props.values.ot[0].deadline)} 
                                onChange={(newValue)=> {
                                const event = {
                                  target: {
                                    name:`ot[${index}].deadline`,
                                    value: index === 0 ? newValue : props.values.ot[index].deadline,
                                  }};
                                  props.handleChange(event);
                              }} />
                            </DemoContainer>
                          </LocalizationProvider>
                          {
                             props.errors?.ot && props.touched.ot && props.touched.ot[index]?.deadline && (
                              <>
                              <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[index]?.deadline}</FormHelperText>
                              <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[`ot[${index}].deadline`]?.join(", ")}</FormHelperText>
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
                                        value={dayjs(props.values.ot[0].date)}
                                        label=""
                                        disabled={(index !== 0)}
                                        onChange={(newValue) => {
                                          const event = {
                                            target: {
                                              name: `ot[${index}].date`,
                                              value: index === 0 ? newValue : props.values.ot[index].date,
                                            },
                                          };
                                          props.handleChange(event);
                                        }}
                                      />
                                    </DemoContainer>
                                  </LocalizationProvider>
                        </Grid>

                        <Grid item md={2}>
                            {/*  Ödənilən məbləğ */}

                            {props.values.ot[index]?.isCustomerPaid && (<>
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
                            name={`ot[${index}].paidAmount`}
                            value={props.values.ot[index]?.paidAmount}
                            error={!!props.errors?.ot && !!props.errors?.ot[`ot[${index}].paidAmount`]}
                            helperText={!!props.errors?.ot && props.errors?.ot[`ot[${index}].paidAmount`]?.join(', ')}

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
                            sx={{ width: '100%', mb: 1 }}
                            size='small'
                            style={textStyling}
                            value={ props.values.ot[index].sellingPrice - props.values.ot[index].paidAmount }
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
                            id={`autocomplete-paymentId-${index}`}
                            options={state.payments || []}
                            getOptionLabel={(option) => option.type}
                            onChange={(event, newValue) => {
                              props.handleChange({
                                target: {
                                  name: `ot[${index}].paymentId`,
                                  value: newValue ? newValue.id : ''
                                }
                              });
                            }}
                            value={state.payments.find(personal => personal.id === props.values.ot[index].paymentId)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                
                                variant="outlined"
                                sx={{ width: '100%', mb: 1 }}
                                error={!!props.errors?.t && !!props.errors.t[`ot[${index}].paymentId`]}
                                style={textStyling}
                                size='small'
                                
                              />
                            )}
                          />
                      

                          {
                             props.errors?.ot && props.touched.ot && props.touched.ot[index]?.paymentId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[index]?.paymentId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors?.ot[`ot[${index}].paymentId`]?.join(", ")}</FormHelperText>
                              </>
                            )
                          }
                            
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
                            size='small'
                            style={textStyling}
                            onChange={props.handleChange}
                            name={`ot[${index}].note`}
                            value={props.values.ot[index]?.note}
                            error={!!props.errors?.ot && !!props.errors?.ot[`ot[${index}].note`]}
                            helperText={!!props.errors?.ot && props.errors?.ot[`ot[${index}].note`]?.join(', ')}

                          />
                          </>)}
                        
    
                       
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
                       defaultChecked={
                        isSupplierPaid
                       }
                       value={isSupplierPaid}
                      onChange={()=> setIsSupplierPaid(e.target.value)}
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
