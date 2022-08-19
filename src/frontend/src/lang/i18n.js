import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import vi from "./vi";
import en from "./en";

const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") === "vi" ? "vi" : "en",
  interpolation: {
    escapeValue: false,
  },
});


export default i18n;
