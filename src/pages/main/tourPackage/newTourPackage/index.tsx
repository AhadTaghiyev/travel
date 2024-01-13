// @ts-nocheck
import { useState, useReducer, useEffect} from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IStore, ITourPackage} from '../types'
import { apiService } from '../../../../server/apiServer';
import { CircularProgress, FormHelperText } from '@mui/material';
import _ from 'lodash';
import { TourPackageSchema } from '../schema';
import dayjs from 'dayjs';
import PageTitle from '../../../../components/pages/pageTitle';
import { TourPackageBreadCrumb,  homeBreadCrumb, newTourPackageBreadCrumb } from '../../../../routes/breadcrumbs';
import { useGetters } from '../../../../hooks/useGetters';
import { useDynamicModal } from '../../../../hooks/useDynamicModal';
import { CustomModal } from '../../../../components/layout/main/components/modal';
import { DatePicker } from '@mui/x-date-pickers';
import Autocomplete from '@mui/material/Autocomplete';


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

const initialValues : ITourPackage = {
  customerId: null,
  tourId: null,
  transferId: null,
  diningId: null,
  supplierId: null,
  personalId: null,
  paymentId: null,
  youngerCount: 0,
  childrenCount: 0,
  departureDateTime: new Date(),
  arrivalDateTime: new Date(),
  hotelName: "",
  roomName: "",
  reservationNumber: "",
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
  isSupplierPaid: false,
  date: new Date()
};

export default function Index() {
  const [isSupplierPaid, setIsSupplierPaid] = useState(false)

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setDisabled] = useState(false)

  //========================
  // Data getting functions
  //========================
  const {state, dispatch, getCustomers, getSuppliers, getDinings, getPayments, getPersonals, getTours, getTransfers} = useGetters();
  //=================
   // handle Modals
   //=================
   const {open, setOpen, modalOption, setModalOption, modalOptions} = useDynamicModal(getCustomers,null,getDinings,null,getPersonals,getTours,null)


  // ========================
  // Get data from api
  // ========================
  useEffect(()=>{

    (async()=>{
      setIsLoading(true)

      try {
        getCustomers();
        getSuppliers();
        getPayments();
        getPersonals();
        getTransfers();
        getDinings();
        getTours();
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
      <PageTitle title='Tur Paket' breadcrumbs={[homeBreadCrumb, TourPackageBreadCrumb,newTourPackageBreadCrumb]}/>
        
      </Container>
      <Formik
        initialValues={{ t: [initialValues]}}
      //  validationSchema={TourPackageSchema}
        onSubmit={async (values, {setErrors}) => {
          values.t.map(item=> item.isSupplierPaid =  isSupplierPaid,
            )
            values.t.forEach(item => {
              item.isSupplierPaid = isSupplierPaid;
              item.commonPrice = item.sellingPrice - item.discount; // commonPrice değerini her defasında hesaplayın
          });
           try {
             const res = await apiService.post(`/TourPackage/CreateTourPackageTickets`, values.t);
             if (res?.status == 200) {
               toast.success('Tur paketi uğurla yaradıldı!');
               const guids = res?.data.data.join(',');
               navigate({
                 pathname: `/panel/tourPackages/report`,
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

               setErrors({t: errors})
             }
           } catch (err) {
             console.error(err);
           } 

        }}
        render={(props) => (
          <Form>
            <FieldArray
              name="t"
              render={(arrayHelpers) => (
              
                <div>
                <Container  maxWidth="xl">
                    <Button
                     variant="contained"
                     sx={{ mb: 3, mr:3 }}
                     style={textStyling}
                     onClick={()=> {
                        setDisabled(true)
                      arrayHelpers.push(initialValues)
                     }}
                  >
                     + Yeni Tur paket 
                  </Button>
                </Container>
                
                  {props.values.t.map((ticket, index) => (
                    <Container maxWidth="xl" key={index} >
                
                  <Button
                  
                     variant="contained"
                     color='error'
                     sx={{ mb: 3, display: index === 0 ?  "none" :"initial"}}
                     style={textStyling}
                     onClick={()=> arrayHelpers.remove([index])}
                  >
                     - Tur paket sil
                  </Button>
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: '70px' }}
                      >
                           <Grid item md={2}>
                   {/* Otel adı */}
                   <InputLabel
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Otel adı
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '100%', mb: 1 }}
                            name={`t[${index}].hotelName`}
                            value={props.values.t[index].hotelName}
                            style={textStyling}
                            onChange={props.handleChange}
                            error={!!props.errors?.t && !!props.errors?.t[`t[${index}].hotelName`]}
                            helperText={!!props.errors?.t && props.errors.t[`t[${index}].hotelName`]?.join(', ')}
                            size='small'
                          />
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].hotelName && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.hotelName}</FormHelperText>
                              </>
                            )
                          }

                           {/* Otaq adı */}
                           <InputLabel
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Otaq adı
                          </InputLabel>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '100%', mb: 1 }}
                            name={`t[${index}].roomName`}
                            value={props.values.t[index].roomName}
                            style={textStyling}
                            onChange={props.handleChange}
                            error={!!props.errors?.t && !!props.errors?.t[`t[${index}].roomName`]}
                            helperText={!!props.errors?.t && props.errors.t[`t[${index}].roomName`]?.join(', ')}
                            size='small'
                          />
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].roomName && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.roomName}</FormHelperText>
                             
                              </>
                            )
                          }
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
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            name={`t[${index}].youngerCount`}
                            value={props.values.t[index].youngerCount}
                            onChange={props.handleChange}
                            error={!!props.errors?.t && !!props.errors.t[`t[${index}].youngerCount`]}
                            helperText = { props.errors?.t &&  props.errors.t[`t[${index}].youngerCount`]?.join(", ")}
                            type="number"
                            size='small'
                          />
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].youngerCount && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.youngerCount}</FormHelperText>
                              </>
                            )
                          }

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
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            name={`t[${index}].childrenCount`}
                            value={props.values.t[index].childrenCount}
                            error={!!props.errors?.t && !!props.errors.t[`t[${index}].childrenCount`]}
                            onChange={props.handleChange}
                            helperText={props.errors?.t &&  props.errors.t[`t[${index}].childrenCount`]?.join(", ")}
                            type="number"
                            size='small'
                          />
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].childrenCount && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.childrenCount}</FormHelperText>
                              </>
                            )
                          }
                       <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                defaultChecked={
                                  props.values.t[index].isCustomerPaid
                                }
                                value={props.values.t[index].isCustomerPaid}
                                name={`t[${index}].isCustomerPaid`}
                                onChange={props.handleChange}
                                error={!!props.errors?.t && !!props.errors?.t[`t[${index}].isCustomerPaid`]}
                                helperText={!!props.errors?.t && props.errors.t[`t[${index}].isCustomerPaid`]?.join(', ')}
    
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
                            Deadline
                          </InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer  components={['DateTimePicker']} >
                            <DatePicker
                               slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
                                sx={{ width: '100%', mb: 1 }}
                                label=""
                                disabled={index === 0 ? false : true }
                                value={dayjs(props.values.t[0].deadline)} 
                                onChange={(newValue) => {
                                  const event = {
                                    target: {
                                      name: `t[${index}].deadline`,
                                      value: index === 0 ? newValue : props.values.t[0].deadline,
                                    },
                                  };
                                  props.handleChange(event);
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].deadline && (
                              <>
                              <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.deadline}</FormHelperText>
                              <FormHelperText sx={{color: 'red'}}>{props.errors.t[`t[${index}].deadline`]?.join(", ")}</FormHelperText>
                            </>
                            )
                          }
   {/* Gediş tarixi */}
                   
   <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 ,mt:1}}
                            style={textStyling}
                          >
                            Gediş tarixi
                          </InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer  components={['DateTimePicker']} >

                              <DateTimePicker 
                               slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
                                label="" 
                                defaultValue={dayjs(props.values.t[index]?.departureDateTime)}
                                onChange={(newValue)=> {
                                const event = {
                                  target: {
                                    name:`t[${index}].departureDateTime`,
                                    value: newValue.$d.toISOString(),
                                  }};
                                  props.handleChange(event);
                              }} />
                          </DemoContainer>
                          </LocalizationProvider>
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].departureDateTime && (
                              <>
                              <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.departureDateTime}</FormHelperText>
                              <FormHelperText sx={{color: 'red'}}>{props.errors.t[`t[${index}].departureDateTime`]?.join(", ")}</FormHelperText>
                            </>
                            )
                          }
                       
                        
                         {/* Dönüş tarixi */}
                      
                            <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1, mt:1}}
                            style={textStyling}
                          >
                           Dönüş tarixi
                          </InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer  components={['DateTimePicker']} >
                              <DateTimePicker 
                              fullwidth
                               slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
                                label="" 
                                sx={{ mb: 1 }}
                                defaultValue={dayjs(props.values.t[index]?.arrivalDateTime)}
                                onChange={(newValue)=> {
                                const event = {
                                  target: {
                                    name:`t[${index}].arrivalDateTime`,
                                    value: newValue.$d.toISOString(),
                                  }};
                                  props.handleChange(event);
                              }} />
                            </DemoContainer>
                          </LocalizationProvider>
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].arrivalDateTime && (
                              <>
                              <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.arrivalDateTime}</FormHelperText>
                              <FormHelperText sx={{color: 'red'}}>{props.errors.t[`t[${index}].arrivalDateTime`]?.join(", ")}</FormHelperText>
                            </>
                            )
                          }
                             {/* Tour  */}
                             <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={ticket && textStyling}
                          >
                            Turun adı
                          </InputLabel>
                          <Autocomplete
                            id={`autocomplete-tour-${index}`}
                            options={state.tours || []}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => {
                              props.handleChange({
                                target: {
                                  name: `t[${index}].tourId`,
                                  value: newValue ? newValue.id : ''
                                }
                              });
                            }}
                            value={state.tours.find(tour => tour.id === props.values.t[index].tourId)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=""
                                variant="outlined"
                                sx={{ width: '100%', mb: 1 }}
                                error={!!props.errors?.t && !!props.errors.t[`t[${index}].tourId`]}
                                style={textStyling}
                                size='small'
                              />
                            )}
                          />


                          {
                             props.errors.t && props.touched.t && props.touched.t[index].tourId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.tourId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[`t[${index}].tourId`]?.join(", ")}</FormHelperText>
                              </>
                            )
                          }
                            <Button
                              variant="text"
                              sx={{ mb: 3 }}
                              style={textStyling} 
                              onClick={()=>{
                                setOpen(true)
                                setModalOption(modalOptions.find(x=> x.field === "Tour"))}
                              }
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
  id={`autocomplete-supplier-${index}`}
  options={state.suppliers || []}
  getOptionLabel={(option) => option.name}
  onChange={(event, newValue) => {
    props.handleChange({
      target: {
        name: `t[${index}].supplierId`,
        value: newValue ? newValue.id : ''
      }
    });
  }}
  value={state.suppliers.find(sup => sup.id === props.values.t[index].supplierId)}
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
                          {/* <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={props.handleChange}
                            name={`t[${index}].supplierId`}
                            value={props.values.t[index].supplierId}
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            size='small'
                          >
                            {state.suppliers?.map((sup: any, i: number) => (
                              <MenuItem
                                key={i}
                                value={sup.id}
                                style={textStyling}
                              >
                                {sup.name}
                              </MenuItem>
                            ))}
                          </Select> */}
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].supplierId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.supplierId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[`t[${index}].supplierId`]?.join(", ")}</FormHelperText>
                              </>
                            )
                          }
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
                            sx={{ width: '100%', mb: 1 }}
                            size='small'
                            style={textStyling}
                            onChange={props.handleChange}
                            name={`t[${index}].reservationNumber`}
                            value={props.values.t[index].reservationNumber}
                            error={!!props.errors?.t && !!props.errors?.t[`t[${index}].reservationNumber`]}
                            helperText={!!props.errors?.t && props.errors.t[`t[${index}].reservationNumber`]?.join(', ')}
                          />
                              {/* Is insured */}

                              <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={ticket && textStyling}
                          >
                            Sığorta
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name={`t[${index}].isInsured`}
                            value={props.values.t[index].isInsured}
                            onChange={props.handleChange}
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            size='small'
                          >
                         
                              <MenuItem  value={true} style={textStyling}>Var </MenuItem>
                              <MenuItem  value={false} style={textStyling}>Yoxdur </MenuItem>
                                
                             
                         
                          </Select>
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].isInsured && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.isInsured}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[`t[${index}].isInsured`]?.join(", ")}</FormHelperText>
                              </>
                            )
                          }
                             {/* Personal  */}
                             <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={ticket && textStyling}
                          >
                            Personal
                          </InputLabel>
                          <Autocomplete
  id={`autocomplete-personal-${index}`}
  options={state.personals || []}
  getOptionLabel={(option) => option.fullName}
  onChange={(event, newValue) => {
    props.handleChange({
      target: {
        name: `t[${index}].personalId`,
        value: newValue ? newValue.id : ''
      }
    });
  }}
  value={state.personals.find(personal => personal.id === props.values.t[index].personalId)}
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
                          {/* <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name={`t[${index}].personalId`}
                            value={props.values.t[index].personalId}
                            onChange={props.handleChange}
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            size='small'
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
                          </Select> */}
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].personalId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.personalId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[`t[${index}].personalId`]?.join(", ")}</FormHelperText>
                              </>
                            )
                          }
                   
                            <Button
                              variant="text"
                              sx={{ mb: 1 }}
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
                            name={`t[${index}].purchasePrice`}
                            value={props.values.t[index].purchasePrice}
                            onChange={props.handleChange}
                            type="number"
                            size='small'
                            error={!!props.errors?.t && !!props.errors?.t[`t[${index}].purchasePrice`]}
                            helperText={!!props.errors?.t && props.errors.t[`t[${index}].purchasePrice`]?.join(', ')}

                          />
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].purchasePrice && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.purchasePrice}</FormHelperText>
                            
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
                            name={`t[${index}].sellingPrice`}
                            value={props.values.t[index].sellingPrice}
                            onChange={props.handleChange}
                            type="number"
                            size='small'
                            error={!!props.errors?.t && !!props.errors?.t[`t[${index}].sellingPrice`]}
                            helperText={!!props.errors?.t && props.errors.t[`t[${index}].sellingPrice`]?.join(', ')}

                          />
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].sellingPrice && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.sellingPrice}</FormHelperText>
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
                            name={`t[${index}].discount`}
                            value={props.values.t[index].discount}
                            onChange={props.handleChange}
                            error={!!props.errors?.t && !!props.errors?.t[`t[${index}].discount`]}
                            helperText={!!props.errors?.t && props.errors.t[`t[${index}].discount`]?.join(', ')}

                            size='small'
                            type="number"
                          />

                         

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
                            sx={{ width: '100%', mb: 1 }}
                            style={textStyling}
                            name={`t[${index}].commonPrice`}
                              value={
                                props.values.t[index]?.sellingPrice! -
                                props.values.t[index]?.discount!
                              }
                             disabled
                                placeholder="Avtomatik"
                            onChange={props.handleChange}
                            size='small'
                            type="number"
                            error={!!props.errors?.t && !!props.errors?.t[`t[${index}].commonPrice`]}
                            helperText={!!props.errors?.t && props.errors.t[`t[${index}].commonPrice`]?.join(', ')}

                          />
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].commonPrice && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.commonPrice}</FormHelperText>
                              </>
                            )
                          }
                            <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1, mt:1}}
                            style={textStyling}
                          >
                            Invoiice tarix
                          </InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer  components={['DateTimePicker']} >
                              <DatePicker
                               slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
                                sx={{ width: '100%', mb: 1 }}
                                label=""
                                value={dayjs(props.values.t[0].date)}
                                disabled={index === 0 ? false : true }
                                onChange={(newValue) => {
                                  const event = {
                                    target: {
                                      name: `t[${index}].date`,
                                      value: index === 0 ? newValue : props.values.t[0].date,
                                    },
                                  };
                                  props.handleChange(event);
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>

                        
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
                            sx={{ width: '100%', mb: 1 }}
                            size='small'
                            style={textStyling}
                            onChange={props.handleChange}
                            name={`t[${index}].explanation`}
                            value={props.values.t[index].explanation}
                            error={!!props.errors?.t && !!props.errors?.t[`t[${index}].explanation`]}
                            helperText={!!props.errors?.t && props.errors.t[`t[${index}].explanation`]?.join(', ')}

                          />
                           {/* Transfer vasitəsi */}
                           <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={ticket && textStyling}
                          >
                            Transfer
                          </InputLabel>
                          <Autocomplete
                            id={`autocomplete-transfer-${index}`}
                            options={state.transfers || []}
                            getOptionLabel={(option) => option.type}
                            onChange={(event, newValue) => {
                              props.handleChange({
                                target: {
                                  name: `t[${index}].transferId`,
                                  value: newValue ? newValue.id : ''
                                }
                              });
                            }}
                            value={state.transfers?.find(transfer => transfer.id === props.values.t[index].transferId)}
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
                             props.errors.t && props.touched.t && props.touched.t[index].transferId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.transferId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[`t[${index}].transferId`]?.join(", ")}</FormHelperText>
                              </>
                            )
                          }
                  
                            <Button
                              variant="text"
                              sx={{ mb: 0 }}
                              style={textStyling}
                              onClick={()=>{
                                setOpen(true)
                                setModalOption(modalOptions.find(x=> x.field === "Transfer"))}
                              }
                            >
                              + Yeni Transfer
                            </Button>
                        

                      

                          {/* Qidalanma */}
                       
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={ticket && textStyling}
                          >
                            Qidalanma
                          </InputLabel>
                          <Autocomplete
                            id={`autocomplete-dining-${index}`}
                            options={state.dinings || []}
                            getOptionLabel={(option) => option.type}
                            onChange={(event, newValue) => {
                              props.handleChange({
                                target: {
                                  name: `t[${index}].diningId`,
                                  value: newValue ? newValue.id : ''
                                }
                              });
                            }}
                            value={state.dinings?.find(dining => dining.id === props.values.t[index].diningId)}
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
                             props.errors.t && props.touched.t && props.touched.t[index].diningId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.diningId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[`t[${index}].diningId`]?.join(', ')}</FormHelperText>
                              </>
                            )
                          }
                  
                            <Button
                              variant="text"
                              sx={{ mb: 0 }}
                              style={textStyling}
                              onClick={()=>{
                                setOpen(true)
                                setModalOption(modalOptions.find(x=> x.field === "Dining"))}
                              }
                            >
                              + Yeni Qidalanma
                            </Button>
                               {/* Customer  */}
                               <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={ticket && textStyling}
                          >
                            Müştəri
                          </InputLabel>
                          <Autocomplete
                            id={`autocomplete-customer-${index}`}
                            options={state.customers || []}
                            getOptionLabel={(option) => option.fullName}
                            onChange={(event, newValue) => {
                              console.log(props)
                              props.handleChange({
                                target: {
                                  name: `t[${index}].customerId`,
                                  value: newValue ? newValue.id : ''
                                }
                              });
                            }}
                            value={state.customers?.find(customer => customer.id === props.values.t[index].customerId)}
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
                             props.errors.t && props.touched.t && props.touched.t[index].customerId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.customerId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[`t[${index}].customerId`]?.join(", ")}</FormHelperText>
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

                      
                        
                      
                       
                        </Grid>
                        <Grid item md={2}>
                            {/*  Ödənilən məbləğ */}

                          {props.values.t[index].isCustomerPaid && (<>
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
                            name={`t[${index}].paidAmount`}
                            value={props.values.t[index].paidAmount}
                            error={!!props.errors?.t && !!props.errors?.t[`t[${index}].paidAmount`]}
                            helperText={!!props.errors?.t && props.errors.t[`t[${index}].paidAmount`]?.join(', ')}

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
                            value={ props.values.t[index].commonPrice - props.values.t[index].paidAmount }
                            disabled
                          />
                          {/* odenis novu */}
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ mb: 1 }}
                            style={textStyling}
                          >
                            Ödəniş növü
                          </InputLabel>
                          <Autocomplete
                            id={`autocomplete-payment-${index}`}
                            options={state.payments || []}
                            getOptionLabel={(option) => option.type}
                            onChange={(event, newValue) => {
                              props.handleChange({
                                target: {
                                  name: `t[${index}].paymentId`,
                                  value: newValue ? newValue.id : ''
                                }
                              });
                            }}
                            value={state.payments.find(payment => payment.id === props.values.t[index].paymentId)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=""
                                variant="outlined"
                                sx={{ width: '100%', mb: 1 }}
                                error={!!props.errors?.t && !!props.errors.t[`t[${index}].paymentId`]}
                                style={textStyling}
                                size='small'
                              />
                            )}
                          />


                       
                          {
                             props.errors.t && props.touched.t && props.touched.t[index].paymentId && (
                              <>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[index]?.paymentId}</FormHelperText>
                                <FormHelperText sx={{color: 'red'}}>{props.errors.t[`t[${index}].paymentId`]?.join(", ")}</FormHelperText>
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
                            name={`t[${index}].note`}
                            value={props.values.t[index].note}
                            error={!!props.errors?.t && !!props.errors?.t[`t[${index}].note`]}
                            helperText={!!props.errors?.t && props.errors.t[`t[${index}].note`]?.join(', ')}

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
