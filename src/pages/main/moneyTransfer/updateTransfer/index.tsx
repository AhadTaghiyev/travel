import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { ITransferModel } from "../types";

import Loading from "@/components/custom/loading";
import TransferForm from "../form";

const UpdateMoneyTransfer = () => {
  const [income, setIncome] = useState<ITransferModel>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getData(id);
  }, []);

  async function getData(id: string) {
    const response = await apiService.get(`/PaymentTransfers/Get/${id}`);
    if (response.status === 200) {
      setIncome(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/managerFinancialTransactions");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    (
      values: ITransferModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const params = {
        fromPaymentId: +values.fromPaymentId,
        toPaymentId: +values.toPaymentId,
        amount: values.amount,
        date: values.date,
        note: values.note,
      };
      const promise = apiService
        .put(`/PaymentTransfers/Update/${id}`, params)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Payment transfer updated")); // Hola
            navigate("/panel/paymentTransfers");
          } else {
            toast.error(response.message);
          }
        })
        .finally(() => setSubmitting(false));
      toast.promise(promise, {
        loading: t("Loading..."),
      });
    },
    [id]
  );

  return (
    <div className="mx-1 p-4 bg-white shadow-md min-h-[500px]">
      <h1 className="text-black text-3xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
        {t("Vəsait transferi güncəlləməsi")} {/* Hola */}
      </h1>
      {loading && <Loading />}
      {!loading && income && (
        <TransferForm
          formType="Edit"
          initialValues={income}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default UpdateMoneyTransfer;
