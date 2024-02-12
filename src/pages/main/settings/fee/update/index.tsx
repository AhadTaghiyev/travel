import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IFeeModel } from "../types";

import Loading from "@/components/custom/loading";
import FeeForm from "../form";

const UpdateFee = () => {
  const [income, setIncome] = useState<IFeeModel>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getData(id);
  }, []);

  async function getData(id: string) {
    const response = await apiService.get(`/Fees/Get/${id}`);
    if (response.status === 200) {
      setIncome(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/fees");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    (values: IFeeModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const promise = apiService
        .put(`/Fees/Update/${id}`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Xərc güncəlləndi")); // Hola
            navigate("/panel/fees");
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
        {t("Xərc güncəlləməsi")} {/* Hola */}
      </h1>
      {loading && <Loading />}
      {!loading && income && (
        <FeeForm formType="Edit" initialValues={income} onSubmit={onSubmit} />
      )}
    </div>
  );
};

export default UpdateFee;
