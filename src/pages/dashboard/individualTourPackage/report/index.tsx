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
          { fieldName: t("Meal"), propertyName: "meal" },
          { fieldName: t("Otel adı"), propertyName: "hotelName" },
          { fieldName: t("Otaq adı"), propertyName: "roomName" },
          { fieldName: t("Uşaqların sayı"), propertyName: "childrenCount" },
          { fieldName: t("Böyüklərin sayı"), propertyName: "adultsCount" },
          { fieldName: t("Gediş tarixi"), propertyName: "dateOfDeparture" },
          { fieldName: t("Dönüş tarixi"), propertyName: "returnDate" },
          { fieldName: t("Satış qiyməti"), propertyName: "sellingPrice" },
        ]}
        api="/IndividualTourPackages/GetDetailAsync"
      />
    </div>
  );
}
