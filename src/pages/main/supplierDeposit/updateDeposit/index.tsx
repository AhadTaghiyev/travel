// @ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IDepositModel } from "../types";

import Loading from "@/components/custom/loading";
import IncomeForm from "../form";

const UpdateDeposit = () => {
  const [income, setIncome] = useState<IDepositModel>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getIncomeInfo(id);
  }, []);

  async function getIncomeInfo(id: string) {
    const response = await apiService.get(`/Bonuces/Get/${id}`);
    if (response.status === 200) {
      setIncome(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/supplierDeposits");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    (values: IDepositModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      // const params = {
      //   id,
      //   paymentId: values.paymentId,
      //   paidAmount: values.paidAmount,
      //   invoiceIds: values.invoiceIds,
      // };
      // const promise = apiService
      //   .put(`/MassIncomes/Update/${id}`, params)
      //   .then((response) => {
      //     if (response.status === 200) {
      //       toast.success(t("Income updated")); // Hola
      //       navigate("/panel/income");
      //     } else {
      //       toast.error(response.message);
      //     }
      //   })
      //   .finally(() => setSubmitting(false));
      // toast.promise(promise, {
      //   loading: t("Loading..."),
      // });
    },
    [id]
  );

  return (
    <div className="mx-1 p-4 bg-white shadow-md min-h-[500px]">
      <h1 className="text-black text-3xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
        {t("Depozit güncəlləməsi")} {/* Hola */}
      </h1>
      {loading && <Loading />}
      {!loading && income && (
        <IncomeForm
          formType="Edit"
          initialValues={income}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default UpdateDeposit;
