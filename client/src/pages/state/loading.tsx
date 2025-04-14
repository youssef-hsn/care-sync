import React from 'react';
import { useTranslation } from "react-i18next";
const LoadingPage: React.FC = () => {
    const { t } = useTranslation("common");

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
            <div
                className="w-20 h-20 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin"
            />
            <h2 className="text-slate-700 mt-5 font-sans font-medium animate-fadeIn">
                {t("loading")}
            </h2>
        </div>
    );
};

export default LoadingPage;
