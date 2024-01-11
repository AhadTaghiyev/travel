import PageTitle from "../../../../components/pages/pageTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { apiService } from "../../../../server/apiServer";
import { IDocumentModel } from "../types";
import { MuiFileInput } from 'mui-file-input'

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

const initialValues : IDocumentModel = {
    text: '',
    file: null,
    recivedCompanyId: ''
}


export default function index() {

    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const res = await apiService.get(`/Company/GetCompanies/1`);
                res.status === 200 ? setCompanies(res.data.items) : console.error;
            } catch {
                console.error;
            }
        };

        fetchData();
    }, [])


  return (
    <>
        <Container maxWidth="xl">
                <PageTitle
                    title="Sənəd göndər"
                    breadcrumbs={[]}
                />
        </Container>
        <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setErrors }) => {
                    try {
                        const res = await apiService.postForm(
                            `/Document/Send`,
                            values
                        );
                        if (res?.status == 200) {
                            toast.success("Uğurla yaradıldı!");
                            navigate("/panel/documents");
                        } else {
                            console.log(res);
                            setErrors(res.data.errors);
                        }
                    } catch (err) {
                        toast.error("Xəta baş verdi");
                    } finally {
                    }
                }}
                render={(props) => (
                    <Form>
                        <Container maxWidth="xl">
                            <Grid
                                container
                                spacing={4}
                                style={{ marginBottom: "70px" }}
                            >
                                <Grid item md={3}>
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ mb: 1 }}
                                        style={textStyling}
                                    >
                                        Şirkət
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name={'recivedCompanyId'}
                                        onChange={props.handleChange}
                                        value={props.values.recivedCompanyId}
                                        sx={{ width: "100%", mb: 1 }}
                                        style={textStyling}
                                        size="small"
                                    >
                                        {companies?.map(
                                            (company: any, index: number) => (
                                                <MenuItem
                                                    key={index}
                                                    value={company.id}
                                                    style={textStyling}
                                                >
                                                    {company.name}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ mb: 1 }}
                                        style={textStyling}
                                    >
                                        Fayl
                                    </InputLabel>
                                    <MuiFileInput name='file' value={props.values.file} 
                                        onChange={(newValue) => {
                                          const event = {
                                            target: {
                                              name: `file`,
                                              value: newValue,
                                            },
                                          };
                                          props.handleChange(event);
                                        }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ mb: 1 }}
                                        style={textStyling}
                                    >
                                        Mətn
                                    </InputLabel>
                                    <TextField
                                        multiline
                                        maxRows={5}
                                        minRows={5}
                                        id="outlined-basic"
                                        variant="outlined"
                                        sx={{ width: "100%", mb: 1 }}
                                        name={"text"}
                                        value={props.values.text}
                                        style={textStyling}
                                        onChange={props.handleChange}
                                        size="small"
                                    />
                                    {props.errors && props.touched.text && (
                                        <>
                                            <FormHelperText
                                                sx={{ color: "red" }}
                                            >
                                                {props.errors.text}
                                            </FormHelperText>
                                            <FormHelperText
                                                sx={{ color: "red" }}
                                            >
                                                {props.errors.text}
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
  )
}
