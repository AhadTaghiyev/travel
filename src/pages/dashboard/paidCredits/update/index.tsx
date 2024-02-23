import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IPaidCreditModel } from "../types";

import Loading from "@/components/custom/loading";
import PaidCreditForm from "../form";

const UpdatePaidCredit = () => {
  const [income, setIncome] = useState<IPaidCreditModel>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getData(id);
  }, []);

  async function getData(id: string) {
    const response = await apiService.get(`/PaidCredits/Get/${id}`);
    if (response.status === 200) {
      setIncome(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/paidCredits");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    (
      values: IPaidCreditModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const promise = apiService
        .put(`/PaidCredits/Update/${id}`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Ödənilən kredit güncəlləndi"));
            navigate("/panel/paidCredits");
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
        {t("Ödənilən kredit güncəlləməsi")}
      </h1>
      {loading && <Loading />}
      {!loading && income && (
        <PaidCreditForm
          formType="Edit"
          initialValues={income}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default UpdatePaidCredit;
