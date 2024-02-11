import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { ITransactionModel } from "../types";

import Loading from "@/components/custom/loading";
import TransactionForm from "../form";

const UpdateTransaction = () => {
  const [income, setIncome] = useState<ITransactionModel>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getData(id);
  }, []);

  async function getData(id: string) {
    const response = await apiService.get(
      `/ManagerFinancialTransactions/Get/${id}`
    );
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
      values: ITransactionModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const params = {
        paymentId: +values.paymentId,
        amount: values.amount,
        date: values.date,
        note: values.note,
        status: +values.status,
      };
      const promise = apiService
        .put(`/ManagerFinancialTransactions/Update/${id}`, params)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Transaction updated")); // Hola
            navigate("/panel/managerFinancialTransactions");
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
        {t("Transaction güncəlləməsi")} {/* Hola */}
      </h1>
      {loading && <Loading />}
      {!loading && income && (
        <TransactionForm
          formType="Edit"
          initialValues={income}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default UpdateTransaction;
