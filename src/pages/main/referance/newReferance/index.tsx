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
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import { Form, Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { AiOutlineRight } from "react-icons/ai";
import { Schema } from "../schema";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { apiService } from "../../../../server/apiServer";

const breadcrumbs = [
    <Link key="1" to="/panel" className="pageLink link">
        Ana səhifə
    </Link>,

    <Link key="1" to="/panel/supplierDebts" className="currentPageLink link">
        Yeni Referans yarat
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
    company: "",
    phone: "",
    city: "",
    email: "",
};

export default function CreatePopup() {
    const [isLoading, setIsLoading] = useState(false);

    // ======================
    // Get data from api
    // ======================

    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            try {
                const companiesRes = await apiService.get("Company/GetAll");
                setCompanies(companiesRes.data.data);
            } catch (error) {
                console.log("🚀 ~ file: index.tsx:123 ~ error:", error);
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

    return (
        <>

            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={Schema}
                onSubmit={async (values, { setErrors }) => {
                    try {
                        const res = await apiService.post(
                            `/referance/Createreferance`,
                            values
                        );
                        if (res?.status == 200) {
                            toast.success("Referans uğurla yaradıldı!");
                            navigate("/panel");
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
                                spacing={4}
                                style={{ marginBottom: "70px",marginTop: "0px" }}
                            >
                                <Grid item md={3}>
                                    {/* company Id */}
                                    <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            Şirkət
                                        </InputLabel>
                                        <TextField
                                            id="outlined-basic"
                                            placeholder="Yazın"
                                            variant="outlined"
                                            sx={{ width: "100%", mb: 3 }}
                                            size="small"
                                            style={textStyling}
                                            onChange={props.handleChange}
                                            name={`company`}
                                            value={props.values.city}
                                            error={
                                                !!props.errors &&
                                                !!props.errors.city
                                            }
                                            helperText={
                                                !!props.errors &&
                                                props.errors.city
                                            }
                                        />
                                        {props.errors &&
                                            props.errors.toCompanyId && (
                                                <FormHelperText
                                                    sx={{ color: "red" }}
                                                >
                                                    {props.errors?.toCompanyId}
                                                </FormHelperText>
                                            )}
                                    </>

                                    {/* City */}
                                    <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            Şəhər
                                        </InputLabel>
                                        <TextField
                                            id="outlined-basic"
                                            placeholder="Yazın"
                                            variant="outlined"
                                            sx={{ width: "100%", mb: 3 }}
                                            size="small"
                                            style={textStyling}
                                            onChange={props.handleChange}
                                            name={`city`}
                                            value={props.values.city}
                                            error={
                                                !!props.errors &&
                                                !!props.errors.city
                                            }
                                            helperText={
                                                !!props.errors &&
                                                props.errors.city
                                            }
                                        />
                                    </>

                                 
                                </Grid>
                                <Grid item md={3}>
                                       {/* Phone */}
                                       <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            Telefon
                                        </InputLabel>
                                        <TextField
                                            id="outlined-basic"
                                            placeholder="Yazın"
                                            variant="outlined"
                                            sx={{ width: "100%", mb: 3 }}
                                            size="small"
                                            style={textStyling}
                                            onChange={props.handleChange}
                                            name={`phone`}
                                            value={props.values.phone}
                                            error={
                                                !!props.errors &&
                                                !!props.errors.phone
                                            }
                                            helperText={
                                                !!props.errors &&
                                                props.errors.phone
                                            }
                                        />
                                    </>

                                       {/* Email */}
                                       <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            Email
                                        </InputLabel>
                                        <TextField
                                            id="outlined-basic"
                                            placeholder="Yazın"
                                            variant="outlined"
                                            sx={{ width: "100%", mb: 3 }}
                                            size="small"
                                            style={textStyling}
                                            type="email"
                                            onChange={props.handleChange}
                                            name={`email`}
                                            value={props.values.email}
                                            error={
                                                !!props.errors &&
                                                !!props.errors.email
                                            }
                                            helperText={
                                                !!props.errors &&
                                                props.errors.email
                                            }
                                        />
                                    </>
                                </Grid>
                                <Grid item md={3}>
                                       {/* Phone */}
                                       <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            Əlaqədar şəxs
                                        </InputLabel>
                                        <TextField
                                            id="outlined-basic"
                                            placeholder="Yazın"
                                            variant="outlined"
                                            sx={{ width: "100%", mb: 3 }}
                                            size="small"
                                            style={textStyling}
                                            onChange={props.handleChange}
                                            name={`phone`}
                                            value={props.values.phone}
                                            error={
                                                !!props.errors &&
                                                !!props.errors.phone
                                            }
                                            helperText={
                                                !!props.errors &&
                                                props.errors.phone
                                            }
                                        />
                                    </>

                                       {/* Email */}
                                       <>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            sx={{ mb: 1 }}
                                            style={textStyling}
                                        >
                                            Note
                                        </InputLabel>
                                        <TextField
                                            id="outlined-basic"
                                            placeholder="Yazın"
                                            variant="outlined"
                                            sx={{ width: "100%", mb: 3 }}
                                            size="small"
                                            style={textStyling}
                                            type="email"
                                            onChange={props.handleChange}
                                            name={`email`}
                                            value={props.values.email}
                                            error={
                                                !!props.errors &&
                                                !!props.errors.email
                                            }
                                            helperText={
                                                !!props.errors &&
                                                props.errors.email
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
