import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IAirwayModel } from "../types";

import Loading from "@/components/custom/loading";
import AirwayForm from "../form";

const UpdateAirway = () => {
  const [income, setIncome] = useState<IAirwayModel>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getData(id);
  }, []);

  async function getData(id: string) {
    const response = await apiService.get(`/Airways/Get/${id}`);
    if (response.status === 200) {
      setIncome(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/airways");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    (values: IAirwayModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const promise = apiService
        .put(`/Airways/Update/${id}`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Havayolu güncəlləndi"));
            navigate("/panel/airways");
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
        {t("Havayolu güncəlləməsi")}
      </h1>
      {loading && <Loading />}
      {!loading && income && (
        <AirwayForm
          formType="Edit"
          initialValues={income}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default UpdateAirway;
