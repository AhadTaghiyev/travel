import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { ISoftwareModel } from "../types";

import Loading from "@/components/custom/loading";
import Software from "../form";

const UpdateSoftware = () => {
  const [income, setIncome] = useState<ISoftwareModel>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getData(id);
  }, []);

  async function getData(id: string) {
    const response = await apiService.get(`/Software/get/${id}`);
    if (response.status === 200) {
      setIncome(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/Softwares");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    
    (values: ISoftwareModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
    
      const promise = apiService
        .put(`/Software/update/${id}`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Success");
            navigate("/admin/Softwares");
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
        <Software
          formType="Edit"
          initialValues={income}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default UpdateSoftware;
