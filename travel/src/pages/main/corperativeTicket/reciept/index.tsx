//@ts-nocheck
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import {AiOutlineRight} from 'react-icons/ai';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {BsWhatsapp} from 'react-icons/bs';
import {FiDownload} from 'react-icons/fi';
import {AiOutlineMail} from 'react-icons/ai';
import Qr from '../../../../components/pages/qrCode';
import qrImage from '../../../../assets/qr.png';
import SimpleTable from '../../../../components/pages/simpleTable';
import RecieptTable from '../../../../components/pages/reciept/recieptTable';
import styles from './reciepts.module.css';
import { useNavigate } from 'react-router-dom';
import { ICorperativeTicket } from '../types';
import { apiService } from '../../../../server/apiServer';


const breadcrumbs = [
  <Link key="1" to="/panel" className='pageLink link'>
      Ana səhifə
  </Link>,
  <Link key="1" to="/panel/aviabiletSale" className='pageLink link'>
      Aviabilet satışı
  </Link>,
  <Link key="1" to="/panel/aviabiletSale/new" className='pageLink link'>
    Yeni aviabilet yarat
  </Link>,
  <Link key="1" to="/panel/aviabiletSale/new/reciept" className='currentPageLink link'>
    Reciept
  </Link>,
]
const initialValues : ICorperativeTicket = {
  ticketNo: "",
  direction: "",
  purchasePrice: 0,
  sellingPrice: 0,
  commission: 0,
  statutoryPrice: 0,
  fee: 0,
  flightDate: new Date(),
  paidAmount: 0,
  note: "",
  deadline: new Date(),
  isSupplierPaid: false,
  isCustomerPaid: true,
  airWayId: "",
  customerId: "",
  supplierId: "",
  paymentId: "",
  invoiceNo:0,
};


export default function Index() {
  const handlePrint = () => {
    window.print();
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState(initialValues);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.get(`/CooperativeTicket/GetById/${id}`);
       
       
        setTicket({...res.data.data,supplierName:res.data.data.supplier?.name,
          customerPhone:res.data.data.customer?.phoneNumber,
          customerEmail:res.data.data.customer?.email,
          customerName:res.data.data.customer?.fullName});

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(ticket)

  useEffect(() => {
    console.log("ticket.deadline:", ticket.deadline);
    console.log("Type of ticket.deadline:", typeof ticket.deadline);
    
  }, [ticket]);
  

  return (
    <Container maxWidth='xl' sx={{mb: 5}}>
          <h3 className='page-title'>Aviabilet satışı</h3>
          <Breadcrumbs
          separator={<AiOutlineRight fontSize="small" />}
          aria-label="breadcrumb"
          sx={{mb: 1}}
          >
          {breadcrumbs}
        </Breadcrumbs>
        <Divider sx={{mb: 5}}/>
        <Grid container spacing={3} sx={{justifyContent: 'end', mb: 2}}>
          <div>
            <Button variant="text" color='inherit' sx={{ml: 4, fontSize: '12px', lineHeight: '16px'}}><BsWhatsapp style={{marginRight: '8px'}}/> Whatsapp-a göndər</Button>
            <Button variant="text" color='inherit' sx={{ml: 4, fontSize: '12px', lineHeight: '16px'}}> <AiOutlineMail style={{marginRight: '8px'}}/>  Email-a göndər</Button>
            <Button onClick={handlePrint} variant="text" color='inherit' sx={{ml: 4, fontSize: '12px', lineHeight: '16px'}}><FiDownload style={{marginRight: '8px'}}/> Export</Button>
          </div>
        </Grid>
        <Grid container spacing={3} sx={{mb: 3}}>
          <Grid item md={3}>
            <Qr qrImage={qrImage}/>
          </Grid>
          <Grid item md={5}>
            <SimpleTable header='Details' properties={[
              {fieldName: 'Tarix', propertyName: 'date'},
              {fieldName: 'Invoice No', propertyName: 'invoice'},
              {fieldName: 'Service name', propertyName: 'serviceName'},
              {fieldName: 'Suplier name', propertyName: 'supplierName'}]}
              values={{
                date: ticket.deadline?.toString(),
                invoice: ticket.referanceNo,
                serviceName: 'Aviabilet satışı',
                supplierName: ticket.supplierName
              }}
              />
          </Grid>
          <Grid item md={5}>
            <SimpleTable header='Customer details' properties={[
              {fieldName: 'TARIX', propertyName: 'date'},
              {fieldName: 'Name', propertyName: 'name'},
              {fieldName: 'Mobile', propertyName: 'mobile'},
              {fieldName: 'Email', propertyName: 'email'}]}
              values={{
                date: ticket.deadline?.toString(),
                name: ticket.customerName,
                mobile: ticket.customerPhone,
                email: ticket.customerEmail
              }}
              />
          </Grid>
        </Grid>
        <RecieptTable client='Ad Soyad' date='12.12.2022' passengerCount={1} amount={'200.00'} ticketNumber={1} airway={'azal'} />
        <RecieptTable client='Ad Soyad' date='12.12.2022' passengerCount={1} amount={'200.00'} ticketNumber={1} airway={'azal'} />
        <div className={styles.totalsStyle}>
              <div className={styles.totalWrapper}>
                <div className={styles.totalElement}>
                  <span className={styles.totalProp}>Ümumi məbləğ</span>
                  <span className={styles.totalVal}>1,000 AZN</span>
                </div>
              </div>
              <div className={styles.totalWrapper}>
                <div className={styles.totalElement}>
                  <span className={styles.totalProp}>Ödənilən məbləğ</span>
                  <span className={styles.totalVal}>1,000 AZN</span>
                </div>
              </div>
              <div className={styles.totalWrapper}>
                <div className={styles.totalElement}>
                  <span className={styles.totalProp}>Qalıq məbləğ</span>
                  <span className={styles.totalVal}>1,000 AZN</span>
                </div>
              </div>
        </div>
        <Button variant="contained" color='inherit' sx={{mr: 2}} onClick={()=> navigate(-1)}>Geri qayıt</Button>
        <Button variant="contained" type='submit' >Ödəniş et</Button>
    </Container>
  )
}
