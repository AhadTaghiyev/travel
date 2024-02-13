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
    const response = await apiService.get(`/AdvancePayments/Get/${id}`);
    if (response.status === 200) {
      setIncome(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/income");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    (values: IDepositModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const params = {
        customerId: values.customerId,
        paymentId: values.paymentId,
        paidAmount: values.paidAmount,
        date: values.date,
        description: values.description,
      };
      const promise = apiService
        .put(`/AdvancePayments/Update/${id}`, params)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Deposit updated"));
            navigate("/panel/deposits");
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
        {t("Depozit güncəlləməsi")}
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
