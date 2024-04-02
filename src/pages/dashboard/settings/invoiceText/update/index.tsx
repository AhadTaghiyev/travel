import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IInvoiceTextModel } from "../types";

import Loading from "@/components/custom/loading";
import InvoiceTextForm from "../form";

const UpdateInvoiceText = () => {
  const [income, setIncome] = useState<IInvoiceTextModel>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getData(id);
  }, []);

  async function getData(id: string) {
    const response = await apiService.get(`/InvoiceTexts/Get/${id}`);
    if (response.status === 200) {
      setIncome(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/InvoiceTexts");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    (values: IInvoiceTextModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const promise = apiService
        .put(`/InvoiceTexts/Update/${id}`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("InvoiceText güncəlləndi"));
            navigate("/panel/InvoiceTexts");
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
        {t("InvoiceText güncəlləməsi")}
      </h1>
      {loading && <Loading />}
      {!loading && income && (
        <InvoiceTextForm
          formType="Edit"
          initialValues={income}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default UpdateInvoiceText;
