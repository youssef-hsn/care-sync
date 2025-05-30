import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import i18n from '@/i18n';
import SignInPage from '@/pages/auth/signin';
import LoadingPage from '@/pages/state/loading';
import SignUpPage from '@/pages/auth/signup';
import { pages } from '@/lib/constants/pages/views';
import PageWithSidebar from '@/components/templates/page-with-sidebar';
import { ThemeWrapper } from '@/components/templates/theme-wrapper';
import { inspectionsPages } from './lib/constants/pages/inspections';
import { activitiesPages } from './lib/constants/pages/activities';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

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

  return (
    <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense fallback={<LoadingPage/>}>
              <Routes>
              <Route element={<ThemeWrapper/>}>
                <Route path='/' element={<Navigate to="signin" />} />
                <Route path='/signin' element={<SignInPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route element={<PageWithSidebar />}>
                  {pages.map(({url, page: Page}) => 
                    <Route key={url} path={url} element={<Page />}/>
                  )}
                  {inspectionsPages.map(({url, page: Page}) => 
                    <Route key={url} path={url} element={<Page />}/>
                  )}
                  {activitiesPages.map(({url, page: Page}) => 
                    <Route key={url} path={url} element={<Page />}/>
                  )}
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;