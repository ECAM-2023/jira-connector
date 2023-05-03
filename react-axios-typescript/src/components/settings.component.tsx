import { Component } from "react";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Settings() {
    const { t, i18n } = useTranslation(["settings"]);
    return (
        <div>
            <h1>{t("Settings")}</h1>
            <div className="d-flex">
                <h3 className="">{t("Language")}</h3>
                <button className="btn btn-outline-primary" value="en" onClick={() => i18n.changeLanguage("en")}>
                    EN
                </button>
                <button className="btn btn-outline-primary" value="fr" onClick={() => i18n.changeLanguage("fr")}>
                    FR
                </button>
            </div>
            <div>
                <h3>{t("Theme")}</h3>
            </div>
        </div>
    );
}

export default Settings;
