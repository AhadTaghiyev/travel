// @ts-nocheck
import { Button, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AiOutlineMail } from "react-icons/ai";
import { useModal } from "@/hooks/useModal";
import { useContext, useEffect, useState } from "react";

import { ICurrency } from "@/components/pages/report/types";

import { BsCurrencyExchange } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiService } from "@/server/apiServer";
import { toast } from "sonner";
import Loading from "@/components/custom/loading";
import { UserContext } from "@/store/UserContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { CompanyContext } from "@/store/CompanyContext";

const customerProperties = [
  {
    fieldName: "Invoice Tarixi",
    propertyName: "date",
  },
  {
    fieldName: "Ad",
    propertyName: "fullName",
  },
  {
    fieldName: "Telefon",
    propertyName: "phoneNumber",
  },
  {
    fieldName: "Email",
    propertyName: "email",
  },
];

export default function index() {
  const { user: currentUser } = useContext(UserContext);
  const { loading: companyLoading, company } = useContext(CompanyContext);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [data, setData] = useState();
  const { t } = useTranslation();
  const { onOpen } = useModal();
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<ICurrency>({
    name: "USD",
    value: 1,
  });

  useEffect(() => {
    getData();
  }, []);

  const onCurrencyChange = (values: ICurrency) => {
    setCurrency(values);
  };

  async function getData() {
    setLoading(true);
    const id = searchParams.get("tickets");
    const res = await apiService.get(`/Refunds/GetDetail/${id}`);

    if (res.status !== 200) {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel");
      }, 1000);
      return;
    }
    const { data } = res;

    setData(data);
    setLoading(false);
  }

  if (loading || companyLoading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "white", pb: 4 }}>
      <Grid container spacing={3} sx={{ mb: 2, width: "100%", pt: 2 }}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={3}>
            <img
              src={company.image}
              style={{
                width: 400,
                height: 200,
                objectFit: "contain",
                marginLeft: 30,
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "end" }}
              className="removeFromPrint"
            >
              <Button
                variant="text"
                color="inherit"
                sx={{ fontSize: "12px", lineHeight: "16px" }}
                onClick={() => onOpen("createCurrency", onCurrencyChange)}
              >
                <BsCurrencyExchange style={{ marginRight: "8px" }} />
                {t("Məzənnə dəyişdir")}
              </Button>
              <Button
                variant="text"
                color="inherit"
                sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
              >
                <AiOutlineMail style={{ marginRight: "8px" }} />
                {t("Send mail")}
              </Button>
              <Button
                onClick={window.print}
                variant="text"
                color="inherit"
                sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
              >
                <FiDownload style={{ marginRight: "8px" }} /> {t("Print")}
              </Button>
            </Grid>
            <Typography variant="h4" gutterBottom align="right">
              {currentUser?.companyName}
              ABC
            </Typography>
            <Typography gutterBottom align="right">
              Email: {currentUser?.companyEmail} | Tel:{" "}
              {currentUser?.companyPhone}
            </Typography>
          </Grid>
        </Grid>
        <Container maxWidth="xl" sx={{ mb: 2, mt: 2 }}>
          <div className="flex justify-between ">
            <div>
              <h3 className="text-xl font-bold mb-2">
                {t("Müştəri məlumatları")}
              </h3>
              {customerProperties.map((item, index) => (
                <div className="text-sm flex w-fit mb-1" key={index}>
                  <p className="w-28 font-bold">{t(item.fieldName)}:</p>
                  <p>{data?.customer?.[item.propertyName]}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
        <Container maxWidth="xl" style={{ paddingRight: 0 }}>
          <Grid
            sx={{
              width: "100%",
            }}
            container
          >
            {data && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("Məhsul nömrəsi")}</TableHead>
                    <TableHead>{t("Ödəniş növü")}</TableHead>
                    <TableHead>{t("Ödənilən məbləğ")}</TableHead>
                    <TableHead>{t("Qaytarılan məbləğ")}</TableHead>
                    <TableHead>{t("Cərimə")}</TableHead>
                    <TableHead>{t("date")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium py-1.5">
                      {data.invoiceNo || data.advancePaymentNo}
                    </TableCell>
                    <TableCell className="py-1.5">{data.payment}</TableCell>
                    <TableCell className="py-1.5">
                      {(data.amount * currency.value).toFixed(2)}{" "}
                      {currency.name}
                    </TableCell>
                    <TableCell className="py-1.5">
                      {(data.paidToCustomer * currency.value).toFixed(2)}{" "}
                      {currency.name}
                    </TableCell>
                    <TableCell className="py-1.5">
                      {(data.forfeit * currency.value).toFixed(2)}{" "}
                      {currency.name}
                    </TableCell>
                    <TableCell className="py-1.5 max-w-[150px] truncate">
                      {formatDate(data.date)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </Grid>
        </Container>
      </Grid>
    </Container>
  );
}
