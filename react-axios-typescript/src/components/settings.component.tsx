import { Component } from "react";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Settings() {
    const { t, i18n } = useTranslation(["settings"]);
    return (
        <div className="card">
            <h3>{t("Settings")}</h3>
            <div className="d-flex">
                <h4 className="">{t("Language")}</h4>
                <button className="btn btn-outline-primary" value="en" onClick={() => i18n.changeLanguage("en")}>
                    EN
                </button>
                <button className="btn btn-outline-primary" value="fr" onClick={() => i18n.changeLanguage("fr")}>
                    FR
                </button>
            </div>
        </div>
    );
}

export default Settings;
