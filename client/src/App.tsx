import { useTranslation } from 'react-i18next';
import { Suspense, useEffect } from 'react';
import i18n from './i18n';
import React from 'react';
import '@/index.css';


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
    <Suspense fallback={<div>Loading...</div>}> 
        <h1>{t('test')}</h1>
    </Suspense>
  );
};

export default App;