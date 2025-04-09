import { createHashRouter } from "react-router-dom";

import SearchPage from './pages/app/SearchPage';
import ResultsPage from './pages/app/ResultsPage';
import { AppLayout } from './pages/layout/app';
import { NotFound } from './pages/app/404';


export const Router = createHashRouter([
  {
    path: '/buscadoe',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/buscadoe', element: <SearchPage /> },
      { path: '/results', element: <ResultsPage /> },
      
      
    ]
  },
  
  
]);
