import { apiService } from "@/server/apiServer";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import Loading from "@/components/custom/loading";

interface responseData {
    message: string;
    paymentAmount: number;
}

export default function RegisterPaymentConfirmation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [response, setResponse] = useState<responseData>({ message: "", paymentAmount: 0 });
    const [isError, setIsError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // // URL parametrelerinden STATUS'u al
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('STATUS');
    const orderId = queryParams.get('ID');

    useEffect(() => {
        let ipAddress = localStorage.getItem("ipAddress");

        const referrer = document.referrer;
        const allowedReferrer = "https://e-commerce.kapitalbank.az/";

        if (!referrer || !referrer.startsWith(allowedReferrer)) {
            navigate("/auth/register");
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            const response = await apiService.post(`/Payments/BalanceAcceptPayment/${id}?orderId=${orderId}&STATUS=${status}&isNewAccount=true`, null, { 'X-Client-IP': ipAddress });
            if (response.status === 200) {
                setResponse(response.data);
                setLoading(false)
            } else if (response.status === 404) {
                navigate("/auth/register");
                setLoading(false);
            } else {
                setIsError(true);
                setLoading(false);
                console.error("Payment confirmation failed:", response.error);
            }
        };

        fetchData();
    }, [id, navigate]);

    if (loading)
        return (<Loading />);

    return (
        <Container maxWidth="xl">
            <h1 className="text-center text-3xl">
                {!isError ? status === 'FullyPaid' ? <span className="text-green-500">{response.message}! Payment Amount: ${response.paymentAmount}</span> : <span style={{ color: "red" }}>Payment Failed!</span> : <span style={{ color: "red" }}>Error occurred</span>}
            </h1>
            <div className="flex justify-center mt-5">
                <Link to={"/auth/login"} className="p-2 bg-gray-600 text-white rounded-md uppercase hover:bg-blue-500 tracking-widest transition shadow-lg disabled:opacity-70">Go to login</Link>
            </div>
        </Container>
    );
}
