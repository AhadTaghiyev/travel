import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useMemo, useEffect } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import { userService } from "../../../../../server/systemUserServer";
import { BiLogOut } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { cn } from "@/lib/utils";
import { UserContext } from "@/store/UserContext";
import { CompanyContext } from "@/store/CompanyContext";
import { useModal } from "@/hooks/useModal";
import {
  CustomSelectValue,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  // SelectValue,
} from "@/components/ui/select";
import { YearContext } from "@/store/YearContext";
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
  const { onOpen } = useModal();
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
  const currentYear = new Date().getFullYear();
  // const [selectedYear, setSelectedYear] = useState(String(currentYear));
  const { selectedYear, setSelectedYear } = useContext(YearContext);
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

  const years = useMemo(() => {
    const years = [];
    for (let i = currentYear; i >= new Date(2023, 0, 1, 0).getFullYear(); i--) {
      years.push(i);
    }
    return years;
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("selectedYear")) {
      localStorage.setItem("selectedYear", String(currentYear));
    }
  }, [])

  useEffect(() => {
    // İlk yüklemede localStorage'daki değeri kontrol et
    const storedYear = localStorage.getItem("selectedYear");
    if (storedYear) {
      setSelectedYear(storedYear === "All" ? storedYear : Number(storedYear));
    } else {
      setSelectedYear(years[years.length - 1]); // Varsayılan olarak ilk yılı seç
    }
  }, [years]);

  const handleYearChange = (value) => {
    setSelectedYear(value);
    localStorage.setItem("selectedYear", value);
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
              <div className="w-40 ml-5">
                <Select
                  value={selectedYear.toString()} // Seçili yılı belirt
                  onValueChange={handleYearChange}
                >
                  <SelectTrigger className="text-black">
                    <CustomSelectValue>
                      {t("Period")} - {selectedYear}
                    </CustomSelectValue>
                  </SelectTrigger>
                  <SelectContent style={{ position: "fixed", zIndex: "99999" }}>
                    {years.map((year) => (
                      <SelectItem key={year} value={`${year}`}>
                        {year}
                      </SelectItem>
                    ))}
                    <SelectItem value={`All`}>
                      All
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
