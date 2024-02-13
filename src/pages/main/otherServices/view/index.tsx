import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import Button from "@mui/material/Button";
import { toast } from "sonner";

import { apiService } from "@/server/apiServer";
import { IInvoiceModel } from "../types";

import Loading from "@/components/custom/loading";
import OtherServicesForm from "../form";

const ViewTicket = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<IInvoiceModel>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getTicketInfo(id);
  }, []);

  async function getTicketInfo(id: string) {
    const response = await apiService.get(`/OtherServices/Get/${id}`);
    if (response.status === 200) {
      setTicket(response.data);
      setLoading(false);
    } else {
      toast.error(t("Something went wrong"));
      setTimeout(() => {
        navigate("/panel/otherServices");
      }, 1000);
    }
  }

  return (
    <div className="mx-1 p-4 bg-white shadow-md min-h-[500px] print-view-form">
      <div className="flex justify-between items-center pb-4 border-b border-solid border-[#1c29400f]">
        <h1 className="text-black text-3xl font-bold">
          {t("Digər Xidmətlər")}
        </h1>
        <Button
          onClick={window.print}
          variant="text"
          color="inherit"
          className="removeFromPrint"
          sx={{ ml: 4, fontSize: "12px", lineHeight: "16px" }}
        >
          <FiDownload style={{ marginRight: "8px" }} /> {t("Print")}
        </Button>
      </div>
      {loading && <Loading />}
      {!loading && ticket && (
        <OtherServicesForm
          formType="View"
          initialValues={ticket}
          onSubmit={() => 0}
        />
      )}
    </div>
  );
};

export default ViewTicket;
