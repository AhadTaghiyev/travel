import { RouterProvider } from "react-router-dom";
import { initReactI18next } from "react-i18next";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import i18n from "i18next";

import { ModalProvider } from "./components/providers/modalProvider";
import { UserProvider } from "./store/UserContext";
import router from "./routes/index";

import "./styles/globals.css";
import "./styles/custom.css";
import "./styles/index.css";

import translationAZ from "./localizations/locales/az/translation.json";
import translationEN from "./localizations/locales/en/translation.json";
import translationRU from "./localizations/locales/ru/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    az: { translation: translationAZ },
    en: { translation: translationEN },
    ru: { translation: translationRU },
  },
  lng: localStorage.getItem("language") || "en",
  fallbackLng: localStorage.getItem("language") || "en",
  interpolation: { escapeValue: false },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <RouterProvider router={router} />
    <ModalProvider />
    <Toaster richColors expand={true} />
  </UserProvider>
);
