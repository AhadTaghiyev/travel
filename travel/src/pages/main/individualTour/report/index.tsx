// @ts-nocheck
import Report from '../../../../components/pages/report';

export default function index() {
  return (
    <Report headers={[
      {fieldName: "Invoice", propertyName: "referanceNumber"}, 
      {fieldName: "Şirkət", propertyName: "company.name"}, 
      {fieldName: "Otel adı", propertyName: "hotelName"}, 
      {fieldName: "Rezerv nömrəsi", propertyName: "reservationNumber"}, 
      {fieldName: "Uçuş tarix", propertyName: "departureDateTime"}, 
      {fieldName: "Satıç qiyməti", propertyName: "sellingPrice"}, 
      // {fieldName: "Ümumi qiymət", propertyName: "commonPrice"}, 
      ]}
        api='/IndividualTour/GetById'/>
  )
}
