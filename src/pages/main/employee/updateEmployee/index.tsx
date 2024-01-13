// @ts-nocheck

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
    Breadcrumbs,
    Container,
    Divider,
    TextField,
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
        İşçi üzərində dəyişiklik
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
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [employee, setEmployee] = useState(null)

    useEffect(()=>{
        (async()=>{
            setIsLoading(true)
            try {
                const res = await apiService.get(`Employee/GetById/${id}`);
                setEmployee(res.data.data)
                initialValues = {
                    ...initialValues, 
                    ...res.data.data,
                }
            } catch (err) {
                console.log("🚀 ~ file: index.tsx:78 ~ err:", err)
                
            }finally{
                setIsLoading(false)
            }
        })();
    },[])

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
                <h3 className="page-title">Dəyiş</h3>
                <Breadcrumbs
                    separator={<AiOutlineRight fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ mb: 1 }}
                >
                    {breadcrumbs}
                </Breadcrumbs>
                <Divider sx={{ mb: 3 }} />
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
                                spacing={4}
                                style={{ marginBottom: "70px" }}
                            >
                                <Grid item md={6}>
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
