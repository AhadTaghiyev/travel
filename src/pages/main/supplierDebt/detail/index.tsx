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
import { apiService } from "../../../../server/apiServer";
import { CircularProgress } from "@mui/material";
import { AiOutlineRight } from "react-icons/ai";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

const reducerActions = {
    payments: "SET_payments",
    suppliers: "SET_suppliers",
};

const initialState = {
    suppliers: [],
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
    <Link key="1" to="/panel/supplierDebts" className="pageLink link">
        Təsisçidən təsisçiyə
    </Link>,
    <Link key="1" to="/panel/supplierDebts" className="currentPageLink link">
        Yeni borc yarat
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

let initialValues = {
    date: new Date(),
    paymentId: "",
    amount: 0,
    note: "",
    companyName: "",
    isFromSupplier: true,
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
                dispatch({
                    type: reducerActions.suppliers,
                    payload: SuppliersFromApi.data.items,
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
    const [supplierDebt, setSupplierDebt] = useState(null);
    console.log("🚀 ~ file: index.tsx:125 ~ CreatePopup ~ supplierDebt:", supplierDebt)

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const res = await apiService.get(`SupplierDebt/GetById/${id}`);
                setSupplierDebt(res.data.data);
                initialValues = {
                  ...res.data.data
                }
                console.log("🚀 ~ file: index.tsx:134 ~ initialValues:", initialValues)
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
            <Container maxWidth="xl">
                <h3 className="page-title">Borclar</h3>
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
                initialValues={initialValues}
                enableReinitialize={true}
                // validationSchema={SupplierDebtSchema}
                onSubmit={async (values, { setErrors }) => {
                    try {
                        const res = await apiService.put(
                            `/SupplierDebt/UpdateSupplierDebt/${id}`,
                            values
                        );
                        if (res?.status == 200) {
                            toast.success("Borc uğurla yaradıldı!");
                            navigate("/panel/supplierDebts");
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
                    <Form onSubmit={props.handleSubmit}>
                        <Container maxWidth="xl">
                            <Grid
                                container
                                spacing={2}
                                style={{ marginBottom: "70px" }}
                            >
                                <Grid item md={2}>
                                    {/* Supplier */}
                                    <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            Təchizatçı
                                        </InputLabel>
                                   
                                    </>
                                    <TextField
                                    disabled
                                            id="outlined-basic"
                                            placeholder="Yazın"
                                            variant="outlined"
                                            sx={{ width: "100%", mb: 2 }}
                                            size="small"
                                            style={textStyling}
                                            onChange={props.handleChange}
                                            name={`companyName`}
                                            value={props.values.companyName}
                                            error={
                                                !!props.errors &&
                                                !!props.errors.companyName
                                            }
                                            helperText={
                                                !!props.errors &&
                                                props.errors.companyName
                                            }
                                        />
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
                                        disabled
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
                                            {true && console.log(props.errors )}
                                    </>
                                  
                                </Grid>
                                <Grid item md={2}>
                                 
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
                                                disabled
                                                    slotProps={{
                                                        textField: {
                                                            size: "small",
                                                        },
                                                    }}
                                                    sx={{ mb: 2 }}
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
                                        {props.errors &&
                                            props.date && (
                                                <FormHelperText
                                                    sx={{ color: "red" }}
                                                >
                                                    {props.errors.date}
                                                </FormHelperText>
                                            )}
                                    </>
                                    {/* isFromSupplier */}
                                    <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            Status
                                        </InputLabel>
                                        <Select
                                            disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={props.handleChange}
                                            name={`isFromSupplier`}
                                            value={props.values.isFromSupplier}
                                            sx={{ width: "100%", mb: 3 }}
                                            style={textStyling}
                                            size="small"
                                        >
                                            <MenuItem value={true}>
                                                {" "}
                                                Borc Al{" "}
                                            </MenuItem>
                                            <MenuItem value={false}>
                                                {" "}
                                                Borc Ver{" "}
                                            </MenuItem>
                                        </Select>
                                    </>
                                </Grid>
                                <Grid item md={2}>
                                  
                                
                                    {/* Amount */}
                                    <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            style={textStyling}
                                            sx={{  mb: 1 }}
                                        >
                                            Miqdar
                                        </InputLabel>
                                        <TextField
                                            disabled
                                            id="outlined-basic"
                                            variant="outlined"
                                            sx={{ width: "100%", mb: 2 }}
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
                                            disabled
                                            id="outlined-basic"
                                            placeholder="Yazın"
                                            variant="outlined"
                                            sx={{ width: "100%", mb: 3 }}
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
