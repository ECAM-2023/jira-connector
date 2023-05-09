import { Component } from "react";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { JiraIcon } from "@atlaskit/logo";

function Home() {
    const { t, i18n } = useTranslation(["settings"]);
    return (
        <div className="card">
            <h3>
                <JiraIcon appearance="brand" />
                Jira Connector
            </h3>
            <div className="">
                <h5>
                    Welcome ! Please <a href="/login">login</a> ...
                </h5>
                <p>Question : store, dispatch, arbre dom, comment le composant se met à jour de manière dynamique</p>
            </div>
        </div>
    );
}

export default Home;
