import Report from "@/components/pages/report";
import { useTranslation } from "react-i18next";

export default function index() {
  const { t } = useTranslation();
  return (
    <div className="report-table">
      <Report
        headers={[
          { fieldName: t("Invoice"), propertyName: "invoiceNo" },
          { fieldName: t("date"), propertyName: "date" },
          { fieldName: t("Servis"), propertyName: "service" }, // Hola
          { fieldName: t("Servis Adı"), propertyName: "serviceName" },
          { fieldName: t("Description"), propertyName: "description" },
          {
            fieldName: t("Uçuş istiqaməti və tarix"),
            propertyName: "invoiceDirection",
          },
          { fieldName: t("Satış qiyməti"), propertyName: "sellingPrice" },
          // {fieldName: "Ümumi qiymət", propertyName: "commonPrice"},
        ]}
        api="/OtherServices/GetDetailAsync"
      />
    </div>
  );
}
