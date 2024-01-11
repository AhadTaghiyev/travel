// @ts-nocheck
import Report from '../../../../components/pages/report';

export default function index() {
  return (
    <Report headers={[
      {fieldName: "Invoice", propertyName: "referanceNo"}, 
      {fieldName: "Hava yolu", propertyName: "airWay.name"}, 
      {fieldName: "Sərnişin adı", propertyName: "passengerName"}, 
      {fieldName: "Bilet nömrəsi", propertyName: "ticketNo"}, 
      {fieldName: "Uçuş istiqaməti və tarix", propertyName: "invoiceDirections"}, 
      {fieldName: "Satıç qiyməti", propertyName: "sellingPrice"}, 
      // {fieldName: "Ümumi qiymət", propertyName: "commonPrice"}, 
      ]}
        api='/OtherServiceTicket/GetById'/>
  )
}
