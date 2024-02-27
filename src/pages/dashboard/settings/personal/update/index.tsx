import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IPersonalModel } from "../types";

import Loading from "@/components/custom/loading";
import PersonalForm from "../form";

const UpdatePersonal = () => {
  const [income, setIncome] = useState<IPersonalModel>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getData(id);
  }, []);

  async function getData(id: string) {
    const response = await apiService.get(`/Personals/Get/${id}`);
    if (response.status === 200) {
      setIncome(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/personals");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    (
      values: IPersonalModel,
      { setSubmitting }: FormikHelpers<FormikValues>
    ) => {
      const promise = apiService
        .put(`/Personals/Update/${id}`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Personal güncəlləndi"));
            navigate("/panel/personals");
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
        {t("Personal güncəlləməsi")}
      </h1>
      {loading && <Loading />}
      {!loading && income && (
        <PersonalForm
          formType="Edit"
          initialValues={income}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default UpdatePersonal;
