import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IInvoiceModel } from "../types";

import Loading from "@/components/custom/loading";
import TourPackageForm from "../form";

const UpdateTicket = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<IInvoiceModel>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getTourPackageInfo(id);
  }, []);

  async function getTourPackageInfo(id: string) {
    const response = await apiService.get(`/IndividualTourPackages/Get/${id}`);
    if (response.status === 200) {
      setTicket(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/individualTourPackage");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    (values: IInvoiceModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      values.isCustomerPaid = undefined;
      values.isSupplierPaid = undefined;
      values.receiptImage = undefined;
      const promise = apiService
        .put(`/IndividualTourPackages/Update/${id}`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Ticket updated"));
            navigate("/panel/individualTourPackage");
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
        {t("Individual TourPackage güncəlləməsi")}
      </h1>
      {loading && <Loading />}
      {!loading && ticket && (
        <TourPackageForm
          formType="Edit"
          initialValues={ticket}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default UpdateTicket;
