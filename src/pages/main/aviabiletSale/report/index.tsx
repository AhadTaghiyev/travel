import Report from "@/components/pages/report";

export default function index() {
  return (
    <div className="report-table">
      <Report
        headers={[
          { fieldName: "Invoice", propertyName: "invoiceNo" },
          { fieldName: "Hava yolu", propertyName: "airway" },
          { fieldName: "Sərnişin adı", propertyName: "passanger" },
          { fieldName: "Bilet nömrəsi", propertyName: "ticketNo" },
          {
            fieldName: "Uçuş istiqaməti və tarix",
            propertyName: "invoiceDirection",
          },
          { fieldName: "Satış qiyməti", propertyName: "sellingPrice" },
          // {fieldName: "Ümumi qiymət", propertyName: "commonPrice"},
        ]}
        api="/PlaneTickets/GetDetailAsync"
      />
    </div>
  );
}
