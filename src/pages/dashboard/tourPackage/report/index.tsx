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
          { fieldName: t("Gediş tarixi"), propertyName: "dateOfDeparture" },
          { fieldName: t("Dönüş tarixi"), propertyName: "returnDate" },
          { fieldName: t("Satış qiyməti"), propertyName: "sellingPrice" },
        ]}
        api="/TourPackages/GetDetailAsync"
      />
    </div>
  );
}
