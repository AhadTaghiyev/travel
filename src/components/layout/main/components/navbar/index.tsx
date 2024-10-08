import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import { userService } from "../../../../../server/systemUserServer";
import { BiLogOut } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { cn } from "@/lib/utils";
import { UserContext } from "@/store/UserContext";
import { CompanyContext } from "@/store/CompanyContext";
import { useModal } from "@/hooks/useModal";
interface NavbarProp {
  isAdmin?: boolean | null;
}

export default function Navbar({ isAdmin }: NavbarProp) {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { user: currentUser, removeUser } = useContext(UserContext);
  const { company } = useContext(CompanyContext)
  const { onOpen} = useModal();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    window.location.reload()
  };
  const companyName = currentUser.companyName;
  const userName = currentUser.userName;

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
    removeUser();
    navigate("/auth/login");
  };
  return (
    <AppBar
      color="default"
      sx={{ right: "0px", position: "fixed", width: "80%", bgcolor: "black" }}
    >
      <Container maxWidth="xl" style={{ color: "white" }}>
        <Toolbar disableGutters>
          {!isAdmin && (
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <div className="flex gap-x-2 mr-6">
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
              <div
                className={cn(
                  "p-3 rounded text-xs font-bold",
                  currentUser.expireDate < 0
                    ? "text-[#AF2323] bg-[#F4BBBB]"
                    : "text-[#292929] bg-[#88c0e9]"
                )}
              >
                {currentUser.expireDate < 0
                  ? "Expired"
                  : `Expiry date: ${currentUser.expireDate.toFixed("0")} days`}
              </div>
              <div
                className={cn(
                  "p-3 rounded text-xs ml-5 bg-yellow-700 font-bold"
                )}
              >
                Balance: {company?.bonuces} USD
              </div>
              <button
                type="button"
                className="ml-5 font-semibold text-white border-none cursor-pointer rounded-sm hover:bg-black/5 p-1 hover:opacity-90 transition disabled:opacity-70"
                onClick={() => {
                  onOpen("addBalance");
                }}
              >
                + {t("Add Balance")}
              </button>
            </Box>
            
          )}
          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
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
                  {companyName}
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
