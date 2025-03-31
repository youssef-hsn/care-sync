import React from 'react';
import ReactDOM from 'react-dom/client';
import { Suspense, useEffect } from 'react';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';

function App() {
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
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />

    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}

export default App;