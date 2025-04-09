import { createHashRouter } from "react-router-dom";

import SearchPage from './pages/app/SearchPage';
import ResultsPage from './pages/app/ResultsPage';
import { AppLayout } from './pages/layout/app';
import { NotFound } from './pages/app/404';


export const Router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <SearchPage /> },
      { path: '/results', element: <ResultsPage /> },
      
      
    ]
  },
  
  
]);
