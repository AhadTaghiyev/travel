import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IInvoiceModel } from "../types";

import Loading from "@/components/custom/loading";
import CorperativeTicketForm from "../form";

const UpdateTicket = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<IInvoiceModel>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getTicketInfo(id);
  }, []);

  async function getTicketInfo(id: string) {
    const response = await apiService.get(`/CorporateTickets/Get/${id}`);
    if (response.status === 200) {
      setTicket(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/corperativeTicket");
      }, 1000);
    }
  }

  const onSubmit = useCallback(
    (values: IInvoiceModel, { setSubmitting }: FormikHelpers<FormikValues>) => {
      values.isCustomerPaid = undefined;
      values.isSupplierPaid = undefined;
      const promise = apiService
        .put(`/CorporateTickets/Update/${id}`, values)
        .then((response) => {
          if (response.status === 200) {
            toast.success(t("Ticket updated"));
            navigate("/panel/corperativeTicket");
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
      <h1 className="text-black text-4xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
        {t("Aviabilet güncəlləməsi")}
      </h1>
      {loading && <Loading />}
      {!loading && ticket && (
        <CorperativeTicketForm
          isEdit
          initialValues={ticket}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default UpdateTicket;
