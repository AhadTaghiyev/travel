import Report from "@/components/pages/report";
import { useTranslation } from "react-i18next";

export default function index() {
  const { t } = useTranslation();
  return (
    <div className="report-table">
      <Report
        title="Tour Package Invoice"
        headers={[
          { fieldName: t("Invoice"), propertyName: "invoiceNo" },
          { fieldName: t("Staff"), propertyName: "staff" },
          { fieldName: t("Meal"), propertyName: "meal" },
          { fieldName: t("Otel adı"), propertyName: "hotelName" },
          { fieldName: t("Otaq adı"), propertyName: "roomName" },
          { fieldName: t("Children / Adult Count"), propertyName: "childrenadultcount" },
          // { fieldName: t("Uşaqların sayı"), propertyName: "childrenCount" },
          // { fieldName: t("Böyüklərin sayı"), propertyName: "adultsCount" },
          { fieldName: t("Gediş tarixi"), propertyName: "dateOfDeparture" },
          { fieldName: t("Dönüş tarixi"), propertyName: "returnDate" },
          { fieldName: t("Insurance"), propertyName: "insurance" },
          { fieldName: t("Transfer"), propertyName: "transfer" },
        ]}
        api="/TourPackages/GetDetailAsync"
        isTime={true}
      />
    </div>
  );
}
