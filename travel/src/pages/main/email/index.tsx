import PageTitle from "../../../components/pages/pageTitle";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import {
    Container,
    Grid,
    InputLabel,
    Button,
    TextField,
    FormHelperText,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { apiService } from "../../../server/apiServer";
import { MuiFileInput } from 'mui-file-input';
import {IEmailModel} from './types'

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

const initialValues : IEmailModel = {
    body: '',
    attachments: [],
    subject: ''
}

export default function index() {

    const navigate = useNavigate();

  return (
    <>
        <Container maxWidth="xl">
                <PageTitle
                    title="Mail göndər"
                    breadcrumbs={[]}
                />
        </Container>
        <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setErrors }) => {
                    console.log(values)
                    try {
                        const res = await apiService.postForm(
                            `Email/SendMailToPersons`,
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
                                        Subject
                                    </InputLabel>
                                    <TextField
                                        multiline
                                        id="outlined-basic"
                                        variant="outlined"
                                        sx={{ width: "100%", mb: 1 }}
                                        name={"subject"}
                                        value={props.values.subject}
                                        style={textStyling}
                                        onChange={props.handleChange}
                                        size="small"
                                    />
                                    {props.errors && props.touched.subject && (
                                        <>
                                            <FormHelperText
                                                sx={{ color: "red" }}
                                            >
                                                {props.errors.subject}
                                            </FormHelperText>
                                            <FormHelperText
                                                sx={{ color: "red" }}
                                            >
                                                {props.errors.subject}
                                            </FormHelperText>
                                        </>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ mb: 1 }}
                                        style={textStyling}
                                    >
                                        Attachments
                                    </InputLabel>
                                    <MuiFileInput name='file' value={props.values.attachments![props.values.attachments!.length-1]} 
                                        onChange={(newValue) => {
                                          const event = {
                                            target: {
                                              name: `attachments`,
                                              value: [...props.values.attachments!, newValue],
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
                                        Body
                                    </InputLabel>
                                    <TextField
                                        multiline
                                        maxRows={5}
                                        minRows={5}
                                        id="outlined-basic"
                                        variant="outlined"
                                        sx={{ width: "100%", mb: 1 }}
                                        name={"body"}
                                        value={props.values.body}
                                        style={textStyling}
                                        onChange={props.handleChange}
                                        size="small"
                                    />
                                    {props.errors && props.touched.body && (
                                        <>
                                            <FormHelperText
                                                sx={{ color: "red" }}
                                            >
                                                {props.errors.body}
                                            </FormHelperText>
                                            <FormHelperText
                                                sx={{ color: "red" }}
                                            >
                                                {props.errors.body}
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
