// @ts-nocheck
import { useEffect, useState,CSSProperties } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import { IMassIncomeModel } from "../types";
import { AiOutlineRight } from "react-icons/ai";
import Divider from "@mui/material/Divider";
import { Formik, Form } from "formik";
import {
    Container,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Button,
    TextField,
    FormHelperText,
    CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { apiService } from "../../../../server/apiServer";
import { MassIncomeSchema } from "../schema";
import PageTitle from "../../../../components/pages/pageTitle";
import {  MassIncomeBreadCrumb, homeBreadCrumb, updateMassIncomeBreadCrumb } from "../../../../routes/breadcrumbs";
import ClipLoader from "react-spinners/ClipLoader";
import { log } from "console";

const override: CSSProperties = {
    display: "block",
    margin: "auto",
    borderColor: "gray",
  };

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
    padding: "12px 60px",
};

const initialValues: IMassIncomeModel = {
    planeTicketId: "",
    cooperativeTicketId: "",
    individualTourId: "",
    tourPackageId: "",
    otherServiceTicketId: "",
    debt: 0,
    paidAmount: 0,
    restOfAmount: 0,
    description: "",
    paymentId:0,
    customerName: ""
};

const ticketTypes = [
    {
        name: "Aviabilet Bilet",
        key: "PlaneTicket",
        prop: "planeTicketId",
    },
    {
        name: "Korparativ Bilet",
        key: "CooperativeTicket",
        prop: "cooperativeTicketId",
    },
    {
        name: "Individual Tur Bilet",
        key: "IndividualTour",
        prop: "individualTourId",
    },
    {
        name: "Tur Paket Bilet",
        key: "TourPackage",
        prop: "tourPackageId",
    },
    {
        name: "Digər Xidmətlər",
        key: "OtherServiceTicket",
        prop: "otherServiceTicketId",
    },
];

const color = "#ffffff";

export default function Index() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [ticketType, setTicketType] = useState({
        name: "",
        key: "",
        prop: "",
    });
    const [tickets, setTickets] = useState([]);
    const [payments, setPayments] = useState([]);
    const [massIncome, setMassIncome] = useState(initialValues);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiService.get(`/${ticketType.key}/GetAll/1`);
                if(res.status === 200){
                    setTickets(res.data.items);
                }else{
                    console.error;
                }
            } catch {
                console.error;
            }
        };

        ticketType.name !== "" && fetchData();
    }, [ticketType]);

    const fetchPayments = async () => {
          
       try {
        const res = await apiService.get(`Payment/GetAll/1`);
         if(res.data){
            setPayments(res.data.items)
            
            console.log(res.data.items);
            
         }
       } catch (error) {
        console.log(error)
       }
    };
    const fetchData = async () => {
          
        const res = await apiService.get(`/MassIncome/GetById/${id}`);
        ticketTypes.forEach((element) => {
            if (res.data.data[element.prop] !== null) {
                initialValues[element.prop] = res.data.data[element.prop]
                console.log("🚀 ~ file: index.tsx:115 ~ ticketTypes.forEach ~  initialValues[element.prop] :",  initialValues[element.prop] )
                setTicketType(element);
            }
        });
        setMassIncome(res.data.data);
    };
    useEffect(() => {
        Promise.all([fetchPayments(), fetchData()])
        .then(() => {
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Bir hata oluştu:", error);
        });
    }, []);
    

    if (isLoading) {
        return (
            <div className="sweet-loading">
            <ClipLoader
              color={color}
              loading={isLoading}
              cssOverride={override}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
           
            />
          </div>
        );
    }
    return (
        <>
            <Container maxWidth="xl">
                <PageTitle
                    title=" Mədaxil"
                    breadcrumbs={[
                        homeBreadCrumb,
                        MassIncomeBreadCrumb,
                        updateMassIncomeBreadCrumb,
                    ]}
                />
            </Container>
            <Formik
                initialValues={massIncome}
                enableReinitialize={true}
                validationSchema={MassIncomeSchema}
                onSubmit={async (values, { setErrors }) => {
                    try {
                        const res = await apiService.put(
                            `/MassIncome/UpdateMassIncome/${id}`,
                            values
                        );
                        if (res?.status == 200) {
                            toast.success("Uğurla yaradıldı!");
                            navigate("/panel/massIncome");
                        } else {
                            setErrors(res.data.errors);
                        }
                    } catch (err) {
                        toast.error("Xəta baş verdi");
                    }
                }}
                render={(props) => (
                    <Form>
                        <Container maxWidth="xl">
                            <Grid
                                container
                                spacing={4}
                                style={{ marginBottom: "70px",marginTop:"20px"}}
                            >
                                <Grid item md={2}>
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ mb: 1 }}
                                        style={textStyling}
                                    >
                                        Bilet növü
                                    </InputLabel>
                                    <Select
                                    disabled
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={(e: any) => {
                                            props.values.cooperativeTicketId =
                                                "";
                                            props.values.planeTicketId = "";
                                            props.values.otherServiceTicketId =
                                                "";
                                            props.values.individualTourId = "";
                                            props.values.tourPackageId = "";

                                            setTicketType(e.target.value);
                                        }}
                                        value={ticketType}
                                        sx={{ width: "100%", mb: 1 }}
                                        style={textStyling}
                                        size="small"
                                    >
                                        {ticketTypes?.map(
                                            (
                                                ticketType: any,
                                                index: number
                                            ) => (
                                                <MenuItem
                                                    key={index}
                                                    value={ticketType}
                                                    style={textStyling}
                                                >
                                                    {ticketType.name}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ mb: 1 }}
                                        style={textStyling}
                                    >
                                        Müştəri
                                    </InputLabel>
                                    <TextField
                                        disabled
                                        id="outlined-basic"
                                        variant="outlined"
                                        sx={{ width: "100%", mb: 1 }}
                                        name={"debt"}
                                        value={initialValues.customerName}
                                        style={textStyling}
                                        type="number"
                                        size="small"
                                    />
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ mb: 1 }}
                                        style={textStyling}
                                    >
                                        Biletlər
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name={ticketType.prop}
                                        disabled={true}
                                        onChange={(e)=>{
                                            props.handleChange(e);
                                            props.setFieldValue('debt', tickets?.find(x=> x.id == e.target.value)?.debt ?? 0)
                                        }}
                                        value={props.values[ticketType.prop]}
                                        sx={{ width: "100%", mb: 1 }}
                                        style={textStyling}
                                        size="small"
                                    >
                                        {tickets?.map(
                                            (ticket: any, index: number) => (
                                                <MenuItem
                                                    key={index}
                                                    value={ticket.id}
                                                    style={textStyling}
                                                >
                                                    {ticket.referanceNo}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>

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
                          }
                                </Grid>
                                <Grid item xs={2}>
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ mb: 1 }}
                                        style={textStyling}
                                    >
                                       Ümumi Borc
                                    </InputLabel>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        sx={{ width: "100%", mb: 1 }}
                                        disabled
                                        name={"debt"}
                                        value={props.values.debt}
                                        style={textStyling}
                                        type="number"
                                        onChange={props.handleChange}
                                        size="small"
                                    />
                                    {props.errors && props.touched.debt && (
                                        <>
                                            <FormHelperText
                                                sx={{ color: "red" }}
                                            >
                                                {props.errors.debt}
                                            </FormHelperText>
                                            <FormHelperText
                                                sx={{ color: "red" }}
                                            >
                                                {props.errors.Debt}
                                            </FormHelperText>
                                        </>
                                    )}
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ mb: 1 }}
                                        style={textStyling}
                                    >
                                        Ödənilən məbləğ
                                    </InputLabel>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        sx={{ width: "100%", mb: 1 }}
                                        name={"paidAmount"}
                                        value={props.values.paidAmount}
                                        style={textStyling}
                                        type="number"
                                        onChange={(e)=>{
                                            props.handleChange(e)
                                            props.setFieldValue('restOfAmount',props.values.debt - e.target.value)
                                        }}
                                        size="small"
                                    />
                                    {props.errors &&
                                        props.touched.paidAmount && (
                                            <>
                                                <FormHelperText
                                                    sx={{ color: "red" }}
                                                >
                                                    {props.errors.paidAmount}
                                                </FormHelperText>
                                                <FormHelperText
                                                    sx={{ color: "red" }}
                                                >
                                                    {props.errors.PaidAmount}
                                                </FormHelperText>
                                            </>
                                        )}
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ mb: 1 }}
                                        style={textStyling}
                                    >
                                        Qalıq məbləğ
                                    </InputLabel>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        sx={{ width: "100%", mb: 1 }}
                                        disabled
                                        name={"restOfAmount"}
                                        value={props.values.debt - props.values.paidAmount}
                                        style={textStyling}
                                        type="number"
                                        onChange={props.handleChange}
                                        size="small"
                                    />
                                    {props.errors &&
                                        props.touched.restOfAmount && (
                                            <>
                                                <FormHelperText
                                                    sx={{ color: "red" }}
                                                >
                                                    {props.errors.restOfAmount}
                                                </FormHelperText>
                                                <FormHelperText
                                                    sx={{ color: "red" }}
                                                >
                                                    {props.errors.RestOfAmount}
                                                </FormHelperText>
                                            </>
                                        )}
                                </Grid>
                                <Grid item xs={2}>
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
                                        sx={{ width: "100%", mb: 1 }}
                                        name={"description"}
                                        value={props.values.description}
                                        style={textStyling}
                                        onChange={props.handleChange}
                                        size="small"
                                    />
                                    {props.errors &&
                                        props.touched.description && (
                                            <>
                                                <FormHelperText
                                                    sx={{ color: "red" }}
                                                >
                                                    {props.errors.description}
                                                </FormHelperText>
                                                <FormHelperText
                                                    sx={{ color: "red" }}
                                                >
                                                    {props.errors.Description}
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
            <ToastContainer
                position="top-right"
                autoClose={3000}
            ></ToastContainer>
        </>
    );
}
