// @ts-nocheck
import Grid from "@mui/material/Grid";
import {
    Breadcrumbs,
    Container,
    Divider,
    TextField,
    InputLabel,
    FormHelperText
} from "@mui/material";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import { Form, Link, useNavigate } from "react-router-dom";
import { apiService } from "../../../../server/apiServer";
import { AiOutlineRight } from "react-icons/ai";
import _ from "lodash";
import { Fragment } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";



const breadcrumbs = [
    <Link key="1" to="/panel" className="pageLink link">
        Ana səhifə
    </Link>,
    <Link key="1" to="/panel/salaryToBePaid" className="pageLink link">
        Ödəniləcək maaş
    </Link>,
    <Link key="1" to="/panel/salaryToBePaid/new" className="currentPageLink link">
        Yeni Ödəniləcək maaş
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
    employeeId: {},
    paymentId: {},
    date: "",
    salary: 0,
    extraSalary: 0,
    bonus: 0,
    note: ""
};

const inputFields = [
    { name: "salary", label: "Maaş", type: "number" },
    { name: "extraSalary", label: "Əlavə maaş", type: "number" },
    { name: "bonus", label: "Bonus", type: "number" },
    { name: "note", label: "Qeyd", type: "text" },
];

export default function CreatePopup() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [payments, setPayments] = useState([]);

    async function getEmployees(){
        try{
            const res = await apiService.get('Employee/GetAll/1');
            if(res.status === 200){
                setEmployees(res.data.items);
            }
        }catch(err){
            console.error(err)
        } 
    }

    async function getPayments(){
        try{
            const res = await apiService.get('Payment/GetAll/1');
            res.status === 200 && setPayments(res.data.items);
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <Container maxWidth="xl">
                <h3 className="page-title">Ödəniləcək maaş Yarat</h3>
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
                onSubmit={async (values, { setErrors }) => {
                    try {
                        console.log(values)
                        const res = await apiService.post(
                            `/PaySalary/CreatePaySalary`,
                            {...values, employeeId : values.employeeId?.id, paymentId: values.paymentId.id}
                        );
                        if (res?.status == 200) {
                            toast.success("PaySalary yaradıldı!");
                            navigate("/panel/salaryToBePaid");
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
                                spacing={3}
                                style={{ marginBottom: "70px" }}
                            >
                                <Grid item md={3}>
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ mb: 1 }}
                                        style={textStyling}
                                    >
                                    İşçi
                                    </InputLabel>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        value={props.values.employeeId}
                                        onChange={(event, value)=> props.handleChange({target: {name: `employeeId`, value: value}})}
                                        onOpen={() => getEmployees()}
                                        getOptionLabel={(option)=> option.fullName ?? ''}
                                        options={employees}
                                        style={textStyling}
                                        sx={{ width: '100%', mb: 1}}
                                        size="small"
                                        renderInput={(params) => <TextField {...params} label=""/>}
                                    />
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ mb: 1 }}
                                        style={textStyling}
                                    >
                                        Ödəniş
                                    </InputLabel>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        value={props.values.paymentId}
                                        onChange={(event, value)=> props.handleChange({target: {name: `paymentId`, value: value}})}
                                        onOpen={() => getPayments()}
                                        getOptionLabel={(option)=> option.type ?? ''}
                                        options={payments}
                                        style={textStyling}
                                        sx={{ width: '100%', mb: 1}}
                                        size="small"
                                        renderInput={(params) => <TextField {...params} label=""/>}
                                    />
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ mb: 1 }}
                                        style={textStyling}
                                    >
                                        Tarix
                                    </InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']} >
                                        <DateTimePicker
                                           slotProps={{ textField: { size: 'small', InputProps: {sx: {fontSize: '12px'}}}}}
                                            label=""
                                            onChange={(newValue) => {
                                            const event = {
                                                target: {
                                                name: 'date',
                                                value: newValue,
                                                },
                                            };
                                            props.handleChange(event);
                                            }}
                                        />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item md={3}>
                                    {inputFields.map((field, index) => (
                                        <Fragment key={index}>
                                           
                                            <InputLabel
                                                id="demo-simple-select-label"
                                                sx={{ mb: 1 }}
                                                style={textStyling}
                                            >
                                                {field.label}
                                            </InputLabel>
                                            <TextField
                                                id="outlined-basic"
                                                placeholder="Yazın"
                                                variant="outlined"
                                                sx={{ width: "100%", mb: 3 }}
                                                size="small"
                                                type={field.type || "text"}
                                                style={textStyling}
                                                onChange={props.handleChange}
                                                name={field.name}
                                                value={props.values[field.name]}
                                                error={
                                                    !!props.touched[
                                                        field.name
                                                    ] &&
                                                    !!props.errors[field.name]
                                                }
                                                helperText={
                                                    props.touched[field.name] &&
                                                    props.errors[field.name]
                                                }
                                            />
                                        </Fragment>
                                    ))}
                                    {/* Note */}
                                    <></>
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
