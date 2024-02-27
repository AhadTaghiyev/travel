import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IPaymentModel } from "../types";

import Loading from "@/components/custom/loading";
import PaymentForm from "../form";

const UpdatePayment = () => {
  const [income, setIncome] = useState<IPaymentModel>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getData(id);
  }, []);

  async function getData(id: string) {
    const response = await apiService.get(`/Payments/Get/${id}`);
    if (response.status === 200) {
      setIncome(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/payments");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    (values: IPaymentModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const promise = apiService
        .put(`/Payments/Update/${id}`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Payment güncəlləndi"));
            navigate("/panel/payments");
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
        {t("Payment güncəlləməsi")}
      </h1>
      {loading && <Loading />}
      {!loading && income && (
        <PaymentForm
          formType="Edit"
          initialValues={income}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default UpdatePayment;
