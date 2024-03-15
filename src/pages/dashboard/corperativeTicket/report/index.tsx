import Report from "@/components/pages/report";
import { useTranslation } from "react-i18next";

export default function index() {
  const { t } = useTranslation();
  return (
    <div className="report-table">
      <Report
        headers={[
          { fieldName: t("Invoice"), propertyName: "invoiceNo" },
          { fieldName: t("Staff"), propertyName: "staff" },
          { fieldName: t("Hava yolu"), propertyName: "airway" },
          { fieldName: t("Bilet nömrəsi"), propertyName: "ticketNo" },
          {
            fieldName: t("Uçuş istiqaməti və tarix"),
            propertyName: "invoiceDirection",
          },
          { fieldName: t("Satış qiyməti"), propertyName: "sellingPrice" },
        ]}
        api="/CorporateTickets/GetDetailAsync"
      />
    </div>
  );
}
