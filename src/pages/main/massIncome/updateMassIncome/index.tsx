import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IMassIncomeModel } from "../types";

import Loading from "@/components/custom/loading";
import MassIncomeForm from "../form";

const UpdateTicket = () => {
  const [massIncome, setMassIncome] = useState<IMassIncomeModel>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getIncomeInfo(id);
  }, []);

  async function getIncomeInfo(id: string) {
    const response = await apiService.get(`/MassIncomes/Get/${id}`);
    if (response.status === 200) {
      setMassIncome(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/massIncome");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    (
      values: IMassIncomeModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const promise = apiService
        .put(`/PlaneTickets/Update/${id}`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Ticket updated"));
            navigate("/panel/aviabiletsale");
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
        {t("Mədaxil güncəlləməsi")} {/** Hola */}
      </h1>
      {loading && <Loading />}
      {!loading && massIncome && (
        <MassIncomeForm initialValues={massIncome} onSubmit={onSubmit} />
      )}
    </div>
  );
};

export default UpdateTicket;
