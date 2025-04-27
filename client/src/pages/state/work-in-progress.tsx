import React from "react";
import CenterDisplay from "@/components/templates/center-display";
import { useTranslation } from "react-i18next";

const WorkInProgress: React.FC = () => {
    const {t} = useTranslation("common");

    return (
        <CenterDisplay>
            <h1>{t("wip")}</h1>
        </CenterDisplay>
    );
};

export default WorkInProgress;