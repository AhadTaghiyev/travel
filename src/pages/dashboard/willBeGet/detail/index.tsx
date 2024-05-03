import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiService } from "../../../../server/apiServer";
import { ISimpleTable } from "../../../../components/pages/simpleTable/types";
import SimpleTable from "../../../../components/pages/simpleTable";

const azerbaijaniTranslations: Record<string, string> = {
  customerName: "Müştəri",
  debt: "Borc",
  paidAmount: "Ödənilən məbləğ",
  referanceNo: "İnvoice nömrəsi",
};

export default function index() {
  const { id } = useParams();

  const [data, setData] = useState<ISimpleTable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(
          `/Report/WillBeGetDetail?page=${id}`
        );

        const res: ISimpleTable[] = [];

        response.data.data.forEach((elem: any) => {
          const newData: ISimpleTable = {
            header: "",
            properties: [],
            values: {},
          };

          for (const key in elem) {
            newData.properties.push({
              fieldName: azerbaijaniTranslations[key],
              propertyName: key,
            });

            newData.values[key] = elem[key];
          }
          newData.header = response.data.fieldName;
          res.push(newData);
        });

        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: "65vh", width: "100%" }}>
      {data.map((elem, index) => (
        <SimpleTable
          key={index}
          header={elem.header}
          properties={elem.properties}
          values={elem.values}
        />
      ))}
    </div>
  );
}
