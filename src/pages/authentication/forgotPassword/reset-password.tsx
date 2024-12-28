import { IconButton, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";

import { apiService } from "@/server/apiServer";

const LoginSchema = Yup.object().shape({
    newPassword: Yup.string().required("Mütləqdir!"),
});

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const username = searchParams.get("username");
    const token = searchParams.get("token");

    const formik = useFormik({
        initialValues: {
            newPassword: "",
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            onForgotPassword(values.newPassword);
        },
    });

    const [isLoading, seIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const onForgotPassword = async (newPassword: string) => {
        seIsLoading(true);
        const res = await apiService.post("/Identities/ResetPassword", { username, token, newPassword });
        if (res?.status === 200) {
            seIsLoading(false)
            toast.success("Şifrə uğurla yeniləndi.")
            navigate("/auth/login")
        } else if (res?.status === 400) {
            seIsLoading(false);
            toast.error(res.data.msg);
        } else {
            seIsLoading(false);
            toast.error("Şifrə yeniləyərkən xəta baş verdi");
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
                        Reset your password
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Please enter new password and reset your password
                    </Typography>
                    <Box>
                        <Typography variant="body2" sx={{ mb: 1, pl: 3 }}>
                            New password
                        </Typography>
                        <OutlinedInput
                            id="outlined-basic"
                            fullWidth
                            sx={{ mb: 3 }}
                            name="newPassword"
                            type={showPassword ? "text" : "password"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.newPassword}
                            error={
                                formik.touched.newPassword && formik.errors.newPassword ? true : false
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        fullWidth
                    >
                        {isLoading ? "Loading..." : "Reset Password"}
                    </Button>
                </form>
                <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
            </Container>
        </>
    );
}
