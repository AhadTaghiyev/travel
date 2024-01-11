// @ts-nocheck
import Report from '../../../../components/pages/report';

export default function Index() {
  return (
    <Report headers={[
        {fieldName: "Ödəniş nömrəsi", propertyName: "referanceNo"}, 
        {fieldName: "Borc", propertyName: "debt"}, 
        {fieldName: "Müştəri", propertyName: "customerName"}, 
        {fieldName: "Note", propertyName: "description"}, 
        {fieldName: "Note", propertyName: "id"}, 
        // {fieldName: "Ümumi qiymət", propertyName: "commonPrice"}, 
        ]}
        api='/MassIncome/GetById'/>
  )
}
