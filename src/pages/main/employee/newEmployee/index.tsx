// @ts-nocheck

import Box from "@mui/material/Box";
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
import { apiService } from "../../../../server/apiServer";
import { CircularProgress } from "@mui/material";
import { AiOutlineRight } from "react-icons/ai";
import { Schema } from "../schema";
import _ from "lodash";

const breadcrumbs = [
    <Link key="1" to="/panel" className="pageLink link">
        Ana səhifə
    </Link>,
    <Link key="1" to="/panel/employees" className="pageLink link">
        Insan Resursları
    </Link>,
    <Link key="1" to="/panel/employees" className="currentPageLink link">
        Yeni işçi yarat
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
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    salary: 0,
};

const inputFields = [
    { name: "fullName", label: "Ad Soyad" },
    { name: "position", label: "Vəzifə", type: "text" },
    { name: "phoneNumber", label: "Telefon" },
    { name: "email", label: "Email", type: "email" },
    { name: "salary", label: "Əmək Haqqı", type: "text" },
];

export default function CreatePopup() {
    const navigate = useNavigate();
    return (
        <>
            {/* <Container maxWidth="xl">
                <h3 className="page-title">İşçi Yarat</h3>
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
                validationSchema={Schema}
                onSubmit={async (values, { setErrors }) => {
                    try {
                        const res = await apiService.post(
                            `/Employee/CreateEmployee`,
                            values
                        );
                        if (res?.status == 200) {
                            toast.success("Işçi uğurla yaradıldı!");
                            navigate("/panel/employees");
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
                                    {inputFields.map((field) => (
                                        <>
                                           
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
                                                sx={{ width: "100%",  mb: 1 }}
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
                                        </>
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
