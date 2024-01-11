import Report from '../../../../components/pages/report';

export default function index() {
  return (
    <Report headers={[
      {fieldName: "Invoice", propertyName: "referanceNo"}, 
      {fieldName: "Hava yolu", propertyName: "airWay.name"}, 
      {fieldName: "Bilet nömrəsi", propertyName: "ticketNo"}, 
      {fieldName: "Uçuş istiqaməti və tarix", propertyName: "invoiceDirections"}, 
      {fieldName: "Satış qiyməti", propertyName: "sellingPrice"},
       
      ]}
        api='/CooperativeTicket/GetById' service='coorperative' />
  )
}
