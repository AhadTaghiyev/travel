import { apiService } from "@/server/apiServer";
import { Button, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiDownload } from "react-icons/fi";
import { useParams } from "react-router-dom";
export default function Index() {
  const [data, setData] = useState(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getData();
  }, []);

  const { t } = useTranslation();

  async function getData() {
    console.log(id);
    const res = await apiService.get(`/Agreements/get/${id}`);

    if (res.status !== 200) {
      setTimeout(() => {}, 1000);
      return;
    }
    const { data } = res;

    setData(data);
  }

  const handlePrint = () => {
    window.print();
  };
  return (
    <Container maxWidth="xl">
      <div data-html2canvas-ignore="true">
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "end" }}
          className="removeFromPrint"
        >
          <Button
            onClick={handlePrint}
            variant="text"
            color="inherit"
            sx={{ ml: 2, fontSize: "12px", lineHeight: "16px" }}
          >
            <FiDownload style={{ marginRight: "8px" }} /> {t("Print")}
          </Button>
        </Grid>
      </div>
      <div className="fix-image-size-container" dangerouslySetInnerHTML={{ __html: data?.text }} />
    </Container>
  );
}
