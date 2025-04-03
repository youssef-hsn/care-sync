import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const App: React.FC = () => {
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      document.documentElement.lang = lng;
      document.documentElement.dir = i18n.dir(lng);
    };
    handleLanguageChange(i18n.language);
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const { t } = useTranslation("common");

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Define your routes here */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;