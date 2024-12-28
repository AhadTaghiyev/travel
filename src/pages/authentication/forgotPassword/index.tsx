import { OutlinedInput, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { apiService } from "@/server/apiServer";

const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Mütləqdir!"),
});

export default function Index() {
    const formik = useFormik({
        initialValues: {
            username: "",
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            console.log("submit");

            onForgotPassword(values.username);
        },
    });

    const [isLoading, seIsLoading] = useState(false);

    const onForgotPassword = async (username: string) => {
        console.log("ok");

        seIsLoading(true);
        const currentDomain = window.location.origin;
        const res = await apiService.post("/Identities/ForgotPassword", { username, callbackUrl: `${currentDomain}/auth/resetPassword` });
        if (res?.status === 200) {
            seIsLoading(false)
            toast.success("Şifrəni yeniləmək üçün link email adresinizə göndərildi.")
        } else {
            seIsLoading(false);
            toast.error("Yanlış istifadəçi adı!");
        }
    };

    return (
        <>
            <Container
                maxWidth="sm"
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Forgot your password?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Please enter username and reset your password
                    </Typography>
                    <Box>
                        <Typography variant="body2" sx={{ mb: 1, pl: 3 }}>
                            Username
                        </Typography>
                        <OutlinedInput
                            id="outlined-basic"
                            fullWidth
                            sx={{ mb: 3 }}
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            error={
                                formik.touched.username && formik.errors.username ? true : false
                            }
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        fullWidth
                    >
                        {isLoading ? "Loading..." : "Send Password Reset Link"}
                    </Button>
                </form>
                <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
            </Container>
        </>
    );
}
