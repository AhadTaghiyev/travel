import Report from "@/components/pages/report";
import { useTranslation } from "react-i18next";

export default function index() {
  const { t } = useTranslation();
  return (
    <div className="report-table">
      <Report
        title="Other Service Invoice"
        headers={[
          { fieldName: t("Invoice"), propertyName: "invoiceNo" },
          { fieldName: t("Staff"), propertyName: "staff" },
          { fieldName: t("Service"), propertyName: "service" },
          { fieldName: t("Servis Adı"), propertyName: "serviceName" },
          { fieldName: t("Description"), propertyName: "description" },
          { fieldName: t("Satış qiyməti"), propertyName: "sellingPrice" },
        ]}
        api="/OtherServices/GetDetailAsync"
      />
    </div>
  );
}
