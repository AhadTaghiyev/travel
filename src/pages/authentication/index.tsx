import Navbar from "../../components/layout/authentication/navbar";
import Footer from "../../components/layout/authentication/footer";
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import authImg from "../../assets/authPic.png";

export default function Index() {
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <Navbar />
      <div className="w-full h-16" />
      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 128px)",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="items-center"
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
        <img
          src={authImg}
          className="hidden md:block"
          style={{
            minHeight: "calc(100vh - 128px)",
            width: "50%",
            zIndex: "-1",
          }}
        />
      </div>
      <div className="w-full h-16" />
      <Footer />
    </div>
  );
}
