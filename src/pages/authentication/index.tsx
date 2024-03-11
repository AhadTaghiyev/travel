import Navbar from "../../components/layout/authentication/navbar";
import Footer from "../../components/layout/authentication/footer";
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import authImg from "../../assets/authPic.png";

export default function Index() {
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
        <img
          src={authImg}
          style={{ height: "100vh", width: "50%", zIndex: "-1" }}
        />
      </div>
      <Footer />
    </div>
  );
}
