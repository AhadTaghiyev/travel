import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IPartnerModel } from "../types";

import Loading from "@/components/custom/loading";
import Partner from "../form";

const UpdatePartner = () => {
  const [income, setIncome] = useState<IPartnerModel>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getData(id);
  }, []);

  async function getData(id: string) {
    const response = await apiService.get(`/Partner/get/${id}`);
    if (response.status === 200) {
      setIncome(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/Partners");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    
    (values: IPartnerModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      const formData = new FormData();

      // formData.append("imageFile", values.image);
      if (values.image && values.image instanceof File) {
 
        formData.append("imageFile", values.image);
      }
      const promise = apiService
        .putForm(`/Partner/update/${id}`, formData)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Success");
            navigate("/admin/Partners");
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
        <Partner
          formType="Edit"
          initialValues={income}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default UpdatePartner;
