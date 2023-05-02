import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import appFr from "../locales/fr/app.json";
import registerFr from "../locales/fr/register.json";
import settingsFr from "../locales/fr/settings.json";

import appEn from "../locales/en/app.json";
import registerEn from "../locales/en/register.json";
import settingsEn from "../locales/en/settings.json";

const resources = {
    en: {
        app: appEn,
        register: registerEn,
        settings: settingsEn,
    },
    fr: {
        app: appFr,
        register: registerFr,
        settings: settingsFr,
    },
};

i18next.use(initReactI18next).init({
    resources,
    lng: "en",
    debug: false,
    fallbackLng: "en",
    saveMissing: true,
    interpolation: {
        escapeValue: false,
    },
});

export default i18next;
