// @ts-nocheck
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { AiOutlineDown } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import { userService } from "../../../../../server/systemUserServer";
import { BiLogOut } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { cn } from "@/lib/utils";

const pages = ["FAQ", "Haqqımızda", "Bizimlə əlaqə"];

interface NavbarProp {
  isAdmin?: boolean | null;
}

export default function Navbar({ isAdmin }: NavbarProp) {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("username");

  // ========================
  // Get User values
  // ========================
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    userService.logout();
    navigate("/auth/login");
  };
  return (
    <AppBar
      color="default"
      sx={{ right: "0px", position: "fixed", width: "80%", bgcolor: "black" }}
    >
      <Container maxWidth="xl" style={{ color: "white" }}>
        <Toolbar disableGutters>
          {!isAdmin ? (
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <div className="flex gap-x-2 mr-10">
                <button
                  className={cn(
                    "px-1",
                    language === "en" && "bg-black/30 text-white"
                  )}
                  onClick={() => changeLanguage("en")}
                >
                  EN
                </button>
                <button
                  className={cn(
                    "px-1",
                    language === "az" && "bg-black/30 text-white"
                  )}
                  onClick={() => changeLanguage("az")}
                >
                  AZ
                </button>
                <button
                  className={cn(
                    "px-1",
                    language === "ru" && "bg-black/30 text-white"
                  )}
                  onClick={() => changeLanguage("ru")}
                >
                  RU
                </button>
              </div>
              <div className="flex items-center gap-x-4">
                {pages.map((page) => (
                  <Link
                    to="/panel"
                    key={page}
                    style={{
                      color: "white",
                      display: "block",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "16px",
                      textDecoration: "none",
                    }}
                  >
                    {t(page)}
                  </Link>
                ))}
              </div>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }}></Box>
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ marginRight: "12px" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* <IconButton sx={{ fontSize: "12px" }} onClick={handleClick}>
                    <AiOutlineDown />
                  </IconButton> */}
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleLogout}>
                      <BiLogOut />
                      <Typography sx={{ mx: 4 }}>{t("Logout")}</Typography>
                    </MenuItem>
                  </Menu>
                  <h6
                    style={{
                      fontSize: "12px",
                      lineHeight: "16px",
                      fontWeight: "400",
                    }}
                  >
                    {userName}
                  </h6>
                </Box>
                <p
                  style={{
                    color: "#BABABA",
                    textAlign: "right",
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "16px",
                  }}
                >
                  {role}
                </p>
              </Box>
              <IconButton onClick={handleClick} sx={{ p: 0 }}>
                <Avatar
                  variant="square"
                  alt={userName}
                  // src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
