//@ts-nocheck
import { useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { IWillbePaidModel } from '../types';
import { AiOutlineRight } from 'react-icons/ai';
import Divider from '@mui/material/Divider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Formik, Form } from 'formik';
import {
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
  FormHelperText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { apiService } from '../../../../server/apiServer';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import {WillbePaidSchema} from '../schema';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const breadcrumbs = [
  <Link key="1" to="/panel" className="pageLink link">
    Ana səhifə
  </Link>,
  <Link key="1" to="/panel/willbepaid" className="pageLink link">
    Ödəniş
  </Link>,
  <Link key="1" to="/panel/update/new" className="currentPageLink link">
    Ödənişi yenile
  </Link>,
];

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

const types = [
  {
    name: 'Təchizatçı',
    key: 'Supplier',
    prop: 'supplierId',
  },
  {
    name: 'Geriyə qaytarılanlar',
    key: 'Refund',
    prop: 'refundId',
  },
  {
    name: 'Xərc',
    key: 'Fee',
    prop: 'feeId',
  },
  {
    name: 'Maaş',
    key: 'PaySalary',
    prop: 'paySalaryId'
    
  }
  ];

const initialValues: IWillbePaidModel = {
  date: new Date(),
  amount: 0,
  fullname: '',
  note: '',
  paymentId: '',
  supplierId: '',
  paySalaryId: '',
  refundId: '',
  feeId: '',
  isPaid: false
};

export default function Index() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [willBePaid, setWillBePaid] = useState(initialValues);
  const [payments, setPayments] = useState([]);
  const [type, setType] = useState({ name: '', key: '', prop: '' });
  const [paymentTypes, setPaymentTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const personalFromApi = await apiService.get('Payment/GetAll/1');
      setPayments(personalFromApi.data.items);

      const res = await apiService.get(`WillBePaid/GetById/${id}`);
      setWillBePaid({...res.data.data});

      types.forEach(element => {
        if(res.data.data[element.prop] !== null){
          setType(element);
        }
      });


    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.get(`/${type.key}/GetAll/1`);
        res.status === 200 ? setPaymentTypes(res.data.items) : console.error;
      } catch {
        console.error;
      }
    };

    type.name !== '' && fetchData();
  }, [type]);

  return (
    <>
      <Container maxWidth="xl">
        <h3 className="page-title">Ödəniş</h3>
        <Breadcrumbs
          separator={<AiOutlineRight fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 1 }}
        >
          {breadcrumbs}
        </Breadcrumbs>
        <Divider sx={{ mb: 3 }} />
      </Container>
      <Formik
        initialValues={willBePaid}
        enableReinitialize={true}
        // validationSchema={WillbePaidSchema}
        onSubmit={async (values, { setErrors }) => {
          try {
            const res = await apiService.put(
              `/WillBePaid/UpdateWillBePaid/${id}`,
              values
            );
            if (res?.status == 200) {
              toast.success('Uğurla yaradıldı!');
              navigate('/panel/willbepaid');
            } else {
              console.log(res);
              setErrors(res.data.errors);
            }
          } catch (err) {
            toast.error('Xəta baş verdi');
          } 
        }}
        render={(props) => (
          <Form>
            <Container maxWidth="xl">
              <Grid container spacing={4} style={{ marginBottom: '70px' }}>
                <Grid item md={3}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Ödəniş
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="paymentId"
                    onChange={props.handleChange}
                    value={props.values.paymentId}
                    sx={{ width: '100%', mb: 1 }}
                    style={textStyling}
                    size="small"
                  >
                    {payments?.map((payment: any, index: number) => (
                      <MenuItem
                        key={index}
                        value={payment.id}
                        style={textStyling}
                      >
                        {payment.type}
                      </MenuItem>
                    ))}
                  </Select>
                  {props.errors && props.touched.paymentId && (
                    <>
                      <FormHelperText sx={{ color: 'red' }}>
                        {props.errors.paymentId}
                      </FormHelperText>
                      <FormHelperText sx={{ color: 'red' }}>
                        {props.errors.PaymentId}
                      </FormHelperText>
                    </>
                  )}
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
                    onChange={(e: any) => {
                        props.values.feeId = '';
                        props.values.supplierId = '';
                        props.values.refundId = '';
                        props.values.paySalaryId = '';
  
                        setType(e.target.value);
                      }}
                    value={type}
                    sx={{ width: '100%', mb: 1 }}
                    style={textStyling}
                    size="small"
                  >
                    {types?.map((item: any, index: number) => (
                      <MenuItem
                        key={index}
                        value={item}
                        style={textStyling}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <InputLabel
                          id="demo-simple-select-label"
                          sx={{ mb: 1 }}
                          style={textStyling}
                        >
                          Id
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name={type.prop}
                          onChange={props.handleChange}
                          value={paymentTypes.length > 0 && props.values[type.prop]}
                          sx={{ width: '100%', mb: 1 }}
                          style={textStyling}
                          size="small"
                        >
                          {paymentTypes?.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.id} style={textStyling}>
                              {
                                (type.key === 'Supplier' || type.key === 'Fee') ? (item.name) 
                                  : (type.key === 'PaySalary') ? (item.employee?.fullName) : 
                                  (type.key === 'Refund') ? (item.company?.name) : (item.referenceNo)
                              }
                            </MenuItem>
                          ))}
                        </Select>
                  {/* {props.errors && props.touched.refundId && (
                    <>
                      <FormHelperText sx={{ color: 'red' }}>
                        {props.errors.refundId}
                      </FormHelperText>
                      <FormHelperText sx={{ color: 'red' }}>
                        {props.errors.RefundId}
                      </FormHelperText>
                    </>
                  )} */}
                </Grid>
                <Grid item xs={4}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Tarix
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer  components={['DateTimePicker']} >
                              <DateTimePicker 
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
                  {props.errors && props.touched.date && (
                    <>
                      <FormHelperText sx={{ color: 'red' }}>
                        {props.errors.date}
                      </FormHelperText>
                      <FormHelperText sx={{ color: 'red' }}>
                        {props.errors.Date}
                      </FormHelperText>
                    </>
                  )}
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Məbləğ
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: '100%', mb: 1 }}
                    name={'amount'}
                    value={props.values.amount}
                    style={textStyling}
                    type="number"
                    onChange={props.handleChange}
                    size="small"
                  />
                  {props.errors && props.touched.amount && (
                    <>
                      <FormHelperText sx={{ color: 'red' }}>
                        {props.errors.amount}
                      </FormHelperText>
                      <FormHelperText sx={{ color: 'red' }}>
                        {props.errors.Amount}
                      </FormHelperText>
                    </>
                  )}
                  <FormControlLabel
                              control={
                                <Checkbox
                                  color="primary"
                                  checked={
                                    props.values.isPaid
                                  }
                                  value={
                                    props.values.isPaid
                                  }
                                  name={`isPaid`}
                                  onChange={props.handleChange}
                                />
                              }
                              label="Ödənildi"
                            />
                </Grid>
                <Grid item xs={4}>
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
                    sx={{ width: '100%', mb: 1 }}
                    name={'note'}
                    value={props.values.note}
                    style={textStyling}
                    onChange={props.handleChange}
                    size="small"
                  />
                  {props.errors && props.touched.note && (
                    <>
                      <FormHelperText sx={{ color: 'red' }}>
                        {props.errors.note}
                      </FormHelperText>
                      <FormHelperText sx={{ color: 'red' }}>
                        {props.errors.Note}
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
