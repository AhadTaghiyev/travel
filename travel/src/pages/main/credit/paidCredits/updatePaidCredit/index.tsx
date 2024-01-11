// @ts-nocheck

import Grid from "@mui/material/Grid";
import {
    Breadcrumbs,
    Container,
    Divider,
    MenuItem,
    TextField,
    Select,
    InputLabel,
    FormHelperText,
} from "@mui/material";
import { Formik } from "formik";
import { useState, useReducer, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { AiOutlineRight } from "react-icons/ai";
import _, { values } from "lodash";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { apiService } from "../../../../../server/apiServer";
import { PaidCreditSchema } from "../schema";

const reducerActions = {
    payments: "SET_payments",
};

const initialState = {
    payments: [],
    credits: []
};
const reducer = (state, action: { type: string; payload: any }) => {
    switch (action.type) {

        case reducerActions.payments:
            return { ...state, payments: action.payload };

            case reducerActions.credits:
                return { ...state, credits: action.payload };

        default:
            return state;
    }
};

const breadcrumbs = [
    <Link key="1" to="/panel" className="pageLink link">
        Ana səhifə
    </Link>,
    <Link key="1" to="/panel/paidCredits" className="pageLink link">
        Kredit Ödənişləri
    </Link>,
    <Link key="1" to="/panel/paidCredits" className="currentPageLink link">
        Kredit Ödənişini tənzimlə
    </Link>,
];
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

let initialValues = {
    date: new Date(),
    paymentId: "",
    getCreditId: "",
    amount: 0,
    note: "",
    source: "",
    percentAmount: 0,
};

export default function CreatePopup() {
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    //==========================
    // Get data from api
    //==========================
    useEffect(() => {
        (async () => {
            setIsLoading(true);

            try {
                const PaymentsFromApi = await apiService.get(
                    "Payment/GetAll/1"
                );
           

                dispatch({
                    type: reducerActions.payments,
                    payload: PaymentsFromApi.data.items,
                });

                const CreditsFromApi = await apiService.get(
                    "GetCredit/GetAll/1"
                );

                dispatch({
                    type: reducerActions.credits,
                    payload: CreditsFromApi.data.items,
                });
           
            } catch (error) {
                console.log("🚀 ~ file: index.tsx:123 ~ error:", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [dispatch]);
    //==========================
    // Get current supplier debt
    //==========================
    const { id } = useParams();
    const [credit, setCredit] = useState(null);
  

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const res = await apiService.get(`paidCredit/GetById/${id}`);
                setCredit(res.data.data);
                initialValues = {
                    ...res.data.data,
                    paymentId: res.data.data?.payment?.id,
                    getCreditId: res.data.data?.getCredit?.id
                };
            } catch (err) {
                console.log("🚀 ~ file: index.tsx:132 ~ err:", err);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const navigate = useNavigate();

    if (isLoading) {
        return (
            <CircularProgress
                sx={{ position: "absolute", top: "50%", left: "50%" }}
            />
        );
    }

    // if(!supplierDebt)
    // {
    //   return <>Oops</>
    // }

    return (
        <>
            {/* <Container maxWidth="xl">
                <h3 className="page-title">Kredit Ödənişləri</h3>
                <Breadcrumbs
                    separator={<AiOutlineRight fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ mb: 1 }}
                >
                    {breadcrumbs}
                </Breadcrumbs>
                <Divider sx={{  mb: 1 }} />
            </Container> */}

            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={PaidCreditSchema}
                onSubmit={async (values, { setErrors }) => {
                    try {
                        const res = await apiService.put(
                            `/paidCredit/UpdatepaidCredit/${id}`,
                            values
                        );
                        if (res?.status == 200) {
                            toast.success("Kedit uğurla yaradıldı!");
                            navigate("/panel/paidCredits");
                        } else {
                            let errors = res.data.errors;
                            // convert to camelCase
                            errors = _.mapKeys(errors, (value, key) => {
                                return _.camelCase(key);
                            });
                            setErrors(errors);
                        }
                    } catch (err) {
                        console.error(err);
                    }
                }}
            >
                {(props) => (
                    <Form style={{backgroundColor:"white"}} onSubmit={props.handleSubmit}>
                        <Container maxWidth="xl">
                            <Grid
                                container
                                spacing={2}
                                style={{ marginBottom: "70px" }}
                            >
                                <Grid item md={3}>
                                    {/* Payment Id */}
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
                                            name={`paymentId`}
                                            onChange={props.handleChange}
                                            sx={{ width: "100%",  mb: 1 }}
                                            size="small"
                                            style={textStyling}
                                            placeholder="Seçin"
                                            value={props.values.paymentId}
                                        >
                                            {state.payments?.map(
                                                (p: any, i: number) => (
                                                    <MenuItem
                                                        key={i}
                                                        value={p.id}
                                                        style={textStyling}
                                                    >
                                                        {p.type}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>

                                        {props.errors &&
                                            props.errors.paymentId && (
                                                <>
                                                    <FormHelperText
                                                        sx={{ color: "red" }}
                                                    >
                                                        {
                                                            props.errors
                                                                ?.paymentId
                                                        }
                                                    </FormHelperText>
                                                    <FormHelperText
                                                        sx={{ color: "red" }}
                                                    >
                                                        {props.errors.paymentId}
                                                    </FormHelperText>
                                                </>
                                            )}
                                        {true && console.log(props.errors)}
                                    </>
                                    <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            Kredit
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={`getCreditId`}
                                            onChange={(e)=> {
                                                props.handleChange(e);
                                                props.setFieldValue('amount', state.credits.find(x=> x.id === e.target.value )?.amount )
                                            }}
                                            sx={{ width: "100%",  mb: 1 }}
                                            size="small"
                                            style={textStyling}
                                            placeholder="Seçin"
                                            value={props.values.getCreditId}
                                        >
                                            {state.credits?.map(
                                                (p: any, i: number) => (
                                                    <MenuItem
                                                        key={i}
                                                        value={p.id}
                                                        style={textStyling}
                                                    >
                                                        {p.company?.name}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        {props.errors &&
                                            props.errors.getCreditId && (
                                                <FormHelperText
                                                    sx={{ color: "red" }}
                                                >
                                                    {props.errors?.getCreditId}
                                                </FormHelperText>
                                            )}
                                    </>
                                    {/* Date */}
                                    <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            Tarix
                                        </InputLabel>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <DemoContainer
                                                components={["DateTimePicker"]}
                                            >
                                                <DatePicker
                                                    slotProps={{
                                                        textField: {
                                                            size: "small",
                                                        },
                                                    }}
                                                    sx={{  mb: 1 }}
                                                    label=""
                                                    defaultValue={dayjs(
                                                        props.values.date
                                                    )}
                                                    onChange={(newValue) => {
                                                        const event = {
                                                            target: {
                                                                name: `date`,
                                                                value: newValue.$d.toISOString(),
                                                            },
                                                        };
                                                        props.handleChange(
                                                            event
                                                        );
                                                    }}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        {props.errors && props.date && (
                                            <FormHelperText
                                                sx={{ color: "red" }}
                                            >
                                                {props.errors.date}
                                            </FormHelperText>
                                        )}
                                    </>

                                    {/* Amount */}
                                    <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            style={textStyling}
                                        >
                                            Miqdar
                                        </InputLabel>
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            sx={{ width: "100%",  mb: 1 }}
                                            style={textStyling}
                                            name={`amount`}
                                            value={props.values?.amount}
                                            onChange={props.handleChange}
                                            error={
                                                !!props.errors &&
                                                !!props.errors?.amount
                                            }
                                            helperText={
                                                props.errors &&
                                                props.errors?.amount
                                            }
                                            type="number"
                                            size="small"
                                        />
                                    </>
                               
                                </Grid>
                                <Grid item md={3}>
                                          {/* Amount */}
                                          <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            style={textStyling}
                                        >
                                            Faiz
                                        </InputLabel>
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            sx={{ width: "100%",  mb: 1 }}
                                            style={textStyling}
                                            name={`percentAmount`}
                                            value={props.values?.percentAmount}
                                            onChange={props.handleChange}
                                            error={
                                                !!props.errors &&
                                                !!props.errors?.percentAmount
                                            }
                                            helperText={
                                                props.errors &&
                                                props.errors?.percentAmount
                                            }
                                            type="number"
                                            size="small"
                                        />
                                    </>
                                    {/* Note */}
                                    <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            Bank
                                        </InputLabel>
                                        <TextField
                                            id="outlined-basic"
                                            placeholder="Yazın"
                                            variant="outlined"
                                            sx={{ width: "100%",  mb: 1 }}
                                            size="small"
                                            style={textStyling}
                                            onChange={props.handleChange}
                                            name={`source`}
                                            value={props.values.source}
                                            error={
                                                !!props.errors &&
                                                !!props.errors.source
                                            }
                                            helperText={
                                                !!props.errors &&
                                                props.errors.source
                                            }
                                        />
                                    </>
                                    {/* Note */}
                                    <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            Qeyd
                                        </InputLabel>
                                        <TextField
                                            id="outlined-basic"
                                            placeholder="Yazın"
                                            variant="outlined"
                                            sx={{ width: "100%",  mb: 1 }}
                                            size="small"
                                            style={textStyling}
                                            onChange={props.handleChange}
                                            name={`note`}
                                            value={props.values.note}
                                            error={
                                                !!props.errors &&
                                                !!props.errors.note
                                            }
                                            helperText={
                                                !!props.errors &&
                                                props.errors.note
                                            }
                                        />
                                    </>
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
            </Formik>

            <ToastContainer
                position="top-right"
                autoClose={3000}
            ></ToastContainer>
        </>
    );
}
