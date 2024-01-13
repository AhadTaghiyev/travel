// @ts-nocheck
import Grid from "@mui/material/Grid";
import {
    Container,
    MenuItem,
    TextField,
    Select,
    InputLabel,
    FormHelperText,
} from "@mui/material";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { apiService } from "../../../../server/apiServer";
import { CircularProgress } from "@mui/material";
import { MoneyTransferSchema } from "../schema";
import _, { values } from "lodash";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useGetters } from "../../../../hooks/useGetters";
import PageTitle from "../../../../components/pages/pageTitle";
import {
    MoneyTransfersBreadCrumb,
    homeBreadCrumb,
    updateMoneyTransfersBreadCrumb,
} from "../../../../routes/breadcrumbs";

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
        amount: 0,
        note: "",
        fromPaymentId: "",
        toPaymentId: "",
    };
export default function CreatePopup() {
 
    const [isLoading, setIsLoading] = useState(false);
    //========================
    // Data getting functions
    //========================
    const { state, dispatch, getPayments } = useGetters();

    //==========================
    // Get data from api
    // Get current transfer
    //==========================
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                getPayments();

                const res = await apiService.get(
                    `/moneyTransfer/GetById/${id}`
                );

                for (const key in initialValues) {
                    initialValues[key] = res.data.data[key]; 
                }
            } catch (error) {
                console.log("🚀 ~ file: index.tsx:123 ~ error:", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [dispatch]);



    const navigate = useNavigate();

    if (isLoading ) {
        return (
            <CircularProgress
                sx={{ position: "absolute", top: "50%", left: "50%" }}
            />
        );
    }

    return (
        <>
            <Container maxWidth="xl">
                <PageTitle
                    title=" Vəsait Transferi"
                    breadcrumbs={[
                        homeBreadCrumb,
                        MoneyTransfersBreadCrumb,
                        updateMoneyTransfersBreadCrumb,
                    ]}
                />
            </Container>

            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={MoneyTransferSchema}
                onSubmit={async (values, { setErrors }) => {
                    try {
                        const res = await apiService.put(
                            `/MoneyTransfer/updateMoneyTransfer/${id}`,
                            values
                        );
                        if (res?.status == 200) {
                            toast.success("Vəsait transferi uğurla yeniləndi!");
                            navigate("/panel/MoneyTransfers");
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
                                spacing={4}
                                style={{ marginBottom: "70px" }}
                            >
                                <Grid item md={6}>
                                    {/* fromPaymentİd */}
                                    <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            From Payment
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={`fromPaymentId`}
                                            onChange={props.handleChange}
                                            sx={{ width: "100%", mb: 3 }}
                                            size="small"
                                            style={textStyling}
                                            placeholder="Seçin"
                                            value={props.values.fromPaymentId}
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
                                            props.errors.fromPaymentId && (
                                                <FormHelperText
                                                    sx={{ color: "red" }}
                                                >
                                                    {
                                                        props.errors
                                                            ?.fromPaymentId
                                                    }
                                                </FormHelperText>
                                            )}
                                    </>
                                    {/* toPaymentİd */}
                                    <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            To Payment
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={`toPaymentId`}
                                            onChange={props.handleChange}
                                            sx={{ width: "100%", mb: 3 }}
                                            size="small"
                                            style={textStyling}
                                            placeholder="Seçin"
                                            value={props.values.toPaymentId}
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
                                            props.errors.toPaymentId && (
                                                <FormHelperText
                                                    sx={{ color: "red" }}
                                                >
                                                    {props.errors?.toPaymentId}
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
                                                    sx={{ mb: 3 }}
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
                                            sx={{ width: "100%", mb: 3 }}
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
