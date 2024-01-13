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
import { Form, Link, useNavigate } from "react-router-dom";
import { apiService } from "../../../../../server/apiServer";
import { CircularProgress } from "@mui/material";
import { AiOutlineRight } from "react-icons/ai";
import { GetCreditSchema } from "../schema";
import _ from "lodash";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

const reducerActions = {
    payments: "SET_payments",
};

const initialState = {
    payments: [],
};
const reducer = (state, action: { type: string; payload: any }) => {
    switch (action.type) {
        case reducerActions.suppliers:
            return { ...state, suppliers: action.payload };

        case reducerActions.payments:
            return { ...state, payments: action.payload };

        default:
            return state;
    }
};

const breadcrumbs = [
    <Link key="1" to="/panel" className="pageLink link">
        Ana səhifə
    </Link>,
    <Link key="1" to="/panel/getCredits" className="pageLink link">
         Kreditlər Borclar
    </Link>,
    <Link key="1" to="/panel/getCredits" className="currentPageLink link">
        Yeni Kredit yarat
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
    // width: '100%',
    padding: "12px 60px",
};

const initialValues = {
    date: new Date(),
    paymentId: "",
    amount: 0,
    note: "",
    source: "",
};

export default function CreatePopup() {
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    // Get data from api

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
             
            } catch (error) {
                console.log("🚀 ~ file: index.tsx:123 ~ error:", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [dispatch]);

    const navigate = useNavigate();

    if (isLoading) {
        return (
            <CircularProgress
                sx={{ position: "absolute", top: "50%", left: "50%" }}
            />
        );
    }

    return (
        <>
            {/* <Container maxWidth="xl">
                <h3 className="page-title">Kreditlər</h3>
                <Breadcrumbs
                    separator={<AiOutlineRight fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ mb: 1 }}
                >
                    {breadcrumbs}
                </Breadcrumbs>
                <Divider sx={{ mb: 1 }} />
            </Container> */}

            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={GetCreditSchema}
                onSubmit={async (values, { setErrors }) => {
                    try {
                        const res = await apiService.post(
                            `/GetCredit/CreateGetCredit`,
                            values
                        );
                        if (res?.status == 200) {
                            toast.success("Kredit uğurla yaradıldı!");
                            navigate("/panel/GetCredits");
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
                                            sx={{ width: "100%", mb: 1 }}
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
                                                <FormHelperText
                                                    sx={{ color: "red" }}
                                                >
                                                    {props.errors?.paymentId}
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
                                                    sx={{ mb: 1 }}
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
                                        {props.errors && props.errors.date && (
                                            <FormHelperText
                                                sx={{ color: "red" }}
                                            >
                                                {" "}
                                                {props.errors.date}{" "}
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
                                            sx={{ width: "100%", mb: 1 }}
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
       {/* Source */}
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
                                            sx={{ width: "100%", mb: 1 }}
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
                                                !!props.source &&
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
                                            sx={{ width: "100%", mb: 1 }}
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
