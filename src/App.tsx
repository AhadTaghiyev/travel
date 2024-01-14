import { Link } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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

function App() {
  return (
    <>
      <h1>Landing page</h1>

      <Link to="/admin">Admin</Link>
      <br />
      <Link to="/panel">Panel</Link>
      <br />
      <Link to="/auth">Login</Link>
    </>
  );
}

export default App;
